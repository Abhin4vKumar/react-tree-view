import React, { createContext } from "react";

interface contextInterface{
    expandedNodes: Record<string, boolean>;
    setExpandedNodes: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

const expandedNodesContext = createContext<contextInterface>({expandedNodes:{}, setExpandedNodes:()=>{}});

export default expandedNodesContext;
