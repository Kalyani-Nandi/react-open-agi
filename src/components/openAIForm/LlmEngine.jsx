import React from "react";
import LLMEngineIcon from "../icons/LLMEngineIcon";
import DotIcon from "../icons/DotIcon";
import { useFormContext } from "../../context/FormContext";

function LlmEngine() {
  const { llmEngineData, setLlmEngineData, error } = useFormContext();

  const handleInputChange = (field, value) => {
    setLlmEngineData({ ...llmEngineData, [field]: value });
  };

  const fields = [
    {
      label: "Model Name",
      type: "select",
      value: llmEngineData.modelName,
      options: [
        { value: "", label: "Select model name" },
        { value: "gpt-3.5-turbo", label: "GPT-3.5-Turbo" },
      ],
      field: "modelName",
      readOnly: true,
    },
    {
      label: "OpenAI API Base",
      type: "text",
      value: llmEngineData?.apiBase,
      placeholder: "Type something...",
      field: "apiBase",
      readOnly: true,
    },
    {
      label: "OpenAI Key",
      type: "password",
      value: llmEngineData.openAiKey,
      placeholder: "Type something...",
      field: "openAiKey",
    },
    {
      label: "Max Tokens",
      type: "text",
      value: llmEngineData.maxTokens,
      placeholder: "Type something...",
      field: "maxTokens",
      readOnly: true,
    },
    {
      label: "Temperature",
      type: "number",
      value: llmEngineData.temperature,
      placeholder: "Type something...",
      field: "temperature",
      readOnly: true,
    },
  ];

  return (
    <form className="rounded-lg shadow-lg">
      <div className="flex justify-between py-2.5 px-4 items-center text-black font-semibold text-sm">
        <div className="flex justify-center items-center gap-3">
          <LLMEngineIcon />
          LLM ENGINE
        </div>
        <DotIcon color={error === "openAiKey" ? "#FF0000" : "#666666"} />
      </div>

      <div className="px-4 py-2.5 bg-[#EEF4FF] text-[#666666] font-medium text-sm">
        {"Lorem ipsum sic dolar amet"}
      </div>

      {fields.map(
        ({ label, type, value, placeholder, field, options, readOnly }) => (
          <div key={field} className="px-4 pt-2.5 flex items-start flex-col">
            <label className="pb-2 text-[#000000] text-sm">{label}</label>

            {type === "select" ? (
              <select
                value={value}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className="border-[1px] rounded-[4px] w-full border-solid border-[#666666] px-3 py-1 text-sm font-normal focus:outline-none"
                disabled={readOnly}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                className="border-[1px] rounded-[4px] border-solid border-[#666666] px-3 py-1 text-sm font-normal focus:outline-none"
                value={value}
                onChange={(e) => handleInputChange(field, e.target.value)}
                placeholder={placeholder}
                readOnly={readOnly}
                required
              />
            )}
          </div>
        )
      )}

      <div className="pt-4 px-4 pb-2 text-xs text-[#666666] flex justify-start font-medium items-start">
        Input
      </div>
      <div className="pt-2 px-4 pb-4 text-xs text-[#666666] flex justify-end font-medium items-end">
        Output
      </div>
    </form>
  );
}

export default LlmEngine;
