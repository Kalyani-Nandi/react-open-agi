import React from "react";
import InputIcon from "../icons/InputIcon";
import DotIcon from "../icons/DotIcon";
import { useFormContext } from "../../context/FormContext";

export default function Input() {
  const { input, setInput, error } = useFormContext();
  console.log(error);
  return (
    <form className="rounded-lg shadow-lg">
      <div className="flex justify-between py-2.5 px-4 items-center text-black font-semibold text-sm">
        <div className="flex justify-center items-center gap-3">
          <InputIcon />
          INPUT
        </div>
        <DotIcon color={error === "input" ? "#FF0000" : "#666666"} />
      </div>

      <div className="px-4 py-2.5 bg-[#EEF4FF] text-[#666666] font-medium text-sm">
        {"Write the input/ question ypu want to ask"}
      </div>
      <div className="px-4 pt-2.5 pb-4 flex items-start flex-col">
        <label className="pb-2 text-[#000000] text-sm ">Input</label>
        <input
          type="text"
          className="border-[1px] w-full rounded-[4px] border-solid border-[#666666] px-3 py-1 text-sm font-normal focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something..."
          required
        />
      </div>
      <div className="pt-2 px-4 pb-6 text-xs text-[#666666] flex justify-end font-medium items-end">
        LLM Engine
      </div>
    </form>
  );
}
