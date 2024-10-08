import React, { useRef, useCallback, useMemo } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import Input from "./components/openAIForm/Input";
import Output from "./components/openAIForm/Output";
import LlmEngine from "./components/openAIForm/LlmEngine";
import { DnDProvider, useDnD } from "./context/DnDContext";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import { AlertProvider } from "./context/AlertContext";
import { FormProvider } from "./context/FormContext";

let id = 0;
const getId = () => `dndnode_${id++}`;

const App = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const getNodeContent = useCallback((type) => {
    switch (type) {
      case "input":
        return <Input />;
      case "llmEngine":
        return <LlmEngine />;
      default:
        return <Output />;
    }
  }, []);

  const onConnect = useCallback(
    (params) => {
      const sourceNode = nodes.find((node) => node.id === params.source);
      const targetNode = nodes.find((node) => node.id === params.target);

      const validConnection =
        (sourceNode.type === "input" && targetNode.type === "llmEngine") || 
        (sourceNode.type === "llmEngine" && targetNode.type === "output"); 

      if (validConnection) {
        setEdges((eds) => addEdge(params, eds));
      }
    },
    [nodes, setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: getNodeContent(type) },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [screenToFlowPosition, type, getNodeContent, setNodes]
  );

  return (
    <div className="overflow-hidden">
      <Header />
      <div className="mt-20 dndflow">
        <Sidebar />
        <div style={{ width: "100vw", height: "90vh" }} ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
            <Background />
            <MiniMap />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <AlertProvider>
      <FormProvider>
        <DnDProvider>
          <App />
        </DnDProvider>
      </FormProvider>
    </AlertProvider>
  </ReactFlowProvider>
);
