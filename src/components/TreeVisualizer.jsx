import React, { useMemo } from "react";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";

export default function TreeVisualizer({ jsonData, searchPath }) {
  const NODE_WIDTH = 120;
  const X_GAP = 180;
  const Y_GAP = 100;

  // Recursive layout generator
  const generateTree = (data, parentId = null, depth = 0, prefix = "node") => {
    if (typeof data !== "object" || data === null)
      return { nodes: [], edges: [], width: NODE_WIDTH };

    let nodes = [];
    let edges = [];
    let totalWidth = 0;

    const entries = Object.entries(data);
    const childPositions = [];

    entries.forEach(([key, value], i) => {
      const id = `${prefix}-${key}-${i}`;
      const isObject = typeof value === "object" && value !== null;
      const label = isObject ? key : `${key}: ${String(value)}`;

      const childTree = isObject
        ? generateTree(value, id, depth + 1, `${prefix}-${key}`)
        : { nodes: [], edges: [], width: NODE_WIDTH };

      const childXOffset = totalWidth + childTree.width / 3;
      totalWidth += childTree.width + X_GAP;

      childPositions.push({ id, label, isObject, childTree, childXOffset });
    });

    if (totalWidth === 0) totalWidth = NODE_WIDTH;
    const centerX = totalWidth / 2;

    // Label current node correctly
    const currentId = parentId ?? prefix;
    const currentLabel = parentId
      ? prefix.split("-").slice(-1)[0]
      : "root"; // (temporary root if multiple top keys)
    const currentNode = {
      id: currentId,
      data: { label: currentLabel },
      position: { x: centerX, y: depth * Y_GAP },
      style: {
        background: "#6366f1",
        color: "#fff",
        borderRadius: 8,
        padding: 10,
        textAlign: "center",
        minWidth: NODE_WIDTH,
      },
    };
    nodes.push(currentNode);

    childPositions.forEach(({ id, label, isObject, childTree, childXOffset }) => {
      const node = {
        id,
        data: { label },
        position: { x: childXOffset, y: (depth + 1) * Y_GAP },
        style: {
          background: isObject ? "#14b8a6" : "#f59e0b",
          color: "white",
          borderRadius: 8,
          padding: 10,
          minWidth: NODE_WIDTH,
          textAlign: "center",
        },
      };

      nodes.push(node);
      edges.push({ id: `${currentId}-${id}`, source: currentId, target: id });
      nodes = [...nodes, ...childTree.nodes];
      edges = [...edges, ...childTree.edges];
    });

    return { nodes, edges, width: totalWidth };
  };

  const buildTreeFromJson = (json) => {
    // ✅ If top-level JSON has only one key, make that the root
    if (
      typeof json === "object" &&
      json !== null &&
      Object.keys(json).length === 1
    ) {
      const rootKey = Object.keys(json)[0];
      const rootId = `node-${rootKey}`;
      const { nodes, edges } = generateTree(json[rootKey], rootId, 1, rootKey);

      const rootNode = {
        id: rootId,
        data: { label: rootKey },
        position: { x: 400, y: 0 },
        style: {
          background: "#4338ca",
          color: "#fff",
          borderRadius: 8,
          padding: 10,
          textAlign: "center",
          minWidth: NODE_WIDTH,
        },
      };

      return { nodes: [rootNode, ...nodes], edges };
    } else {
      // Multiple top-level keys: create virtual "root" (rare)
      return generateTree(json);
    }
  };

  const { nodes, edges } = useMemo(() => {
    if (!jsonData) return { nodes: [], edges: [] };
    return buildTreeFromJson(jsonData);
  }, [jsonData]);

  if (!jsonData)
    return <div className="text-gray-400 text-center">No JSON loaded</div>;

  return (
    <div className="h-[600px] border rounded-xl">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
