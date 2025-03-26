"use client";
import { memo, useState } from 'react';
import { Handle, Position, NodeToolbar } from '@xyflow/react';

export const CustomNode = ({ data }: any) => {
    const [expanded, setExpanded] = useState(true);
    return (
        <>
            <NodeToolbar isVisible={data.toolbarVisible} position={data.toolbarPosition}>
                <button>delete</button>
                <button>copy</button>
                <button>expand</button>
            </NodeToolbar>

            <div className='border border-red-500 px-[20px] py-[10px] min-w-[100px] min-h-[50px] bg-white flex items-center justify-center'>
                {data.label}
            </div>

            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </>
    );
};

export default memo(CustomNode);