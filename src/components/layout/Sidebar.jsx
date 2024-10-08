import React from "react";
import InputIcon from "../icons/InputIcon";
import LLMEngineIcon from "../icons/LLMEngineIcon";
import OutPutIcon from "../icons/OutPutIcon";
import MenuIcon from "../icons/MenuIcon";
import { useDnD } from "../../context/DnDContext";

const COMPONENTS = [
  { id: "input", label: "Input", Icon: InputIcon },
  { id: "llmEngine", label: "LLM Engine", Icon: LLMEngineIcon },
  { id: "output", label: "Output", Icon: OutPutIcon },
];

export default function Sidebar() {
  const [, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-[20%] text-base font-medium p-6">
      <div className="bg-gray-50 h-full w-full p-4 shadow-lg rounded-xl border">
        <div className="text-lg text-black border-b-[1px] mb-2 pb-2 border-gray-400">
          Components
        </div>
        <div className="mt-4 mb-3 text-sm text-gray-400">Drag and Drop</div>

        {COMPONENTS.map(({ id, label, Icon }) => (
          <div
            key={id}
            className="border-[1.5px] items-center rounded-md border-gray-400 py-1.5 px-2.5 flex justify-between my-5"
            onDragStart={(event) => onDragStart(event, id)}
            draggable
          >
            <div className="flex gap-2 justify-center items-center">
              <Icon />
              {label}
            </div>
            <MenuIcon />
          </div>
        ))}
      </div>
    </aside>
  );
}
