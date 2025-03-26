"use client";
import React, { useCallback, useEffect, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import CustomNode from '@/components/customNodes';
import { hierarchicalData } from '@/data/mockData';
import { parseNodes } from '@/utils/utils';

const initialNodes = [
  { id: '1', type: "customNode", position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', type: "customNode", position: { x: -150, y: 100 }, data: { label: '2' } },
  { id: '3', type: "customNode", position: { x: 150, y: 100 }, data: { label: '3' } },
  { id: '4', type: "customNode", position: { x: 0, y: 100 }, data: { label: '4' } },
  { id: '5', type: "customNode", position: { x: 300, y: 100 }, data: { label: '5' } },
  { id: '6', type: "customNode", position: { x: -300, y: 100 }, data: { label: '6' } },
];
const initialEdges = [
  { id: 'e1-2', type: 'smoothstep', source: '1', target: '2' },
  { id: 'e1-3', type: 'smoothstep', source: '1', target: '3' },
  { id: 'e1-4', type: 'smoothstep', source: '1', target: '4' },
  { id: 'e1-5', type: 'smoothstep', source: '1', target: '5' },
  { id: 'e1-6', type: 'smoothstep', source: '1', target: '6' },
];

const getData = () => {
  return hierarchicalData;
}

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  useEffect(() => {
    const data = getData();
    console.log(data);
    const parsedData = parseNodes(data);
    console.log(parsedData);
    setNodes(parsedData?.nodes || []);
    setEdges(parsedData?.edges || []);
  }, []);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}