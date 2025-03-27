"use client";
import { memo, useContext, useState } from 'react';
import { Handle, Position, NodeToolbar } from '@xyflow/react';
import expandedNodesContext from '@/context/expandedNodesContext';

export const CustomNode = ({ data }: any) => {
    const { expandedNodes, setExpandedNodes } = useContext(expandedNodesContext);
    const handleClick = () => {
        let isTrue = expandedNodes?.[data.id];
        setExpandedNodes((prev) => {
            return {
                ...prev,
                [data.id]: isTrue ? undefined : true
            }
        });
    }
    return (
        <>
            <div className='border border-zinc-950 w-[200px] h-[100px] overflow-hidden bg-white flex flex-col items-center justify-center'>
                <div className='text-lg font-bold'>
                    {data.label}
                </div>
                {(data?.nodeData?.children?.length) && <div className='flex items-center justify-center p-2 h-[25px] w-[25px] cursor-pointer rounded-full bg-zinc-200 hover:bg-blue-500' onClick={handleClick}>
                    {!(expandedNodes?.[data?.id]) ? '-' : '+'}
                </div>}
            </div>

            {(data?.parentId) && <Handle type="target" position={Position.Top} />}
            {(data?.nodeData?.children?.length) && <Handle type="source" position={Position.Bottom} />}
        </>
    );
};

export default memo(CustomNode);