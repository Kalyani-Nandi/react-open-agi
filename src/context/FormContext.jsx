import React, { createContext, useContext, useState } from "react";
import { useAlert } from "./AlertContext";

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [llmEngineData, setLlmEngineData] = useState({
    modelName: "gpt-3.5-turbo",
    openAiKey: "",
    apiBase: "https://api.openai.com/v1/chat/completions",
    maxTokens: "100",
    temperature: "0.7",
  });

  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const { showAlert } = useAlert();

  const validations = [
    {
      type: "input",
      condition: !input,
      message: "Please enter the input text before running the flow",
    },
    {
      condition: !llmEngineData.modelName,
      message: "Please enter the model name before running the flow",
    },
    {
      condition: !llmEngineData.apiBase,
      message: "Please enter the OpenAI API base before running the flow",
    },
    {
      type: "openAiKey",
      condition: !llmEngineData.openAiKey,
      message: "Please enter the OpenAI key before running the flow",
    },
    {
      condition: !llmEngineData.maxTokens,
      message: "Please enter the max tokens before running the flow",
    },
    {
      condition: !llmEngineData.temperature,
      message: "Please enter the temperature before running the flow",
    },
  ];

  const checkValidation = () => {
    for (const { condition, message, type } of validations) {
      if (condition) {
        showAlert({
          alertType: "error",
          message,
          title: "Error while running the flow",
        });
        setError(type);
        return false;
      }
    }
    setError("");
    return true;
  };

  const handelRun = async () => {
    const promptInput = { role: "user", content: input };

    try {
      const response = await fetch(llmEngineData.apiBase, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${llmEngineData.openAiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: llmEngineData?.modelName,
          messages: [promptInput],
          max_tokens: parseInt(llmEngineData?.maxTokens, 10) || 100,
          temperature: parseFloat(llmEngineData?.temperature) || 0.7,
        }),
      });

      const data = await response.json();
      if (data?.error) {
        const errorMessage =
          data?.error.message || "Please Check the OpenAI Key And Try Again";
        const limitedMessage = errorMessage.split(" ").slice(0, 15).join(" ");
        showAlert({
          alertType: "error",
          message:
            errorMessage.split(" ").length > 15
              ? `${limitedMessage}...`
              : errorMessage,
        });
      } else {
        const resContent = data.choices[0]?.message?.content || "";
        setResponse(resContent);
        showAlert({
          alertType: "success",
          title: "Flow Ran Successfully.",
          message: "Your workflow is ready to be deployed",
        });
      }
      setInput("");
    } catch (error) {
      console.error("Error fetching from OpenAI:", error);
      showAlert({
        alertType: "error",
        message: "An error occurred while fetching the response.",
      });
    }
  };

  const handleNavButtonClick = async () => {
    if (checkValidation()) {
      await handelRun();
    }
  };

  return (
    <FormContext.Provider
      value={{
        llmEngineData,
        setLlmEngineData,
        input,
        setInput,
        response,
        handleNavButtonClick,
        error,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
