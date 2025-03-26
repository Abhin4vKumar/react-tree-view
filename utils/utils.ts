// const initialNodes = [
//     { id: '1', type: "customNode", position: { x: 0, y: 0 }, data: { label: '1' } },
//     { id: '2', type: "customNode", position: { x: -150, y: 100 }, data: { label: '2' } },
//     { id: '3', type: "customNode", position: { x: 150, y: 100 }, data: { label: '3' } },
//     { id: '4', type: "customNode", position: { x: 0, y: 100 }, data: { label: '4' } },
//     { id: '5', type: "customNode", position: { x: 300, y: 100 }, data: { label: '5' } },
//     { id: '6', type: "customNode", position: { x: -300, y: 100 }, data: { label: '6' } },
//   ];
//   const initialEdges = [
//     { id: 'e1-2', type: 'smoothstep', source: '1', target: '2' },
//     { id: 'e1-3', type: 'smoothstep', source: '1', target: '3' },
//     { id: 'e1-4', type: 'smoothstep', source: '1', target: '4' },
//     { id: 'e1-5', type: 'smoothstep', source: '1', target: '5' },
//     { id: 'e1-6', type: 'smoothstep', source: '1', target: '6' },
//   ];

const MIN_GAP = 100;
const NODE_WIDTH = 100;
const maximum = (a:number , b:number):number =>{
    if(a > b){
        return a;
    }
    return b;
}
const helper = (data:any , result:any , parentId:string|null , depth : number , parentIndex: number , depthWiseGapData:any , levelWiseContainerSize:any ):number => {
    if(!data) return 0;
    let totalSize = 0;
    let offset = -1;
    let gapUsed = -1;
    for(let i=0; i<data.length; i++){
        //CalculateID
        let id = "";
        if(parentId){
            id = `${parentId}-${i}`;
        }else{
            id = `${i}`;
        }
        const res = helper(data[i].children , result , id , depth + 1 , i , depthWiseGapData , levelWiseContainerSize  );
        //calculate position
        if(offset === -1){
            offset = levelWiseContainerSize[depth] || 0;
        }
        let leftSpacing = 0;
        if(!levelWiseContainerSize[depth]){
            leftSpacing = 0;
        }else{
            leftSpacing = levelWiseContainerSize[depth];
        }
        let gap = 0;
        if(!depthWiseGapData[depth + 1]){
            gap = MIN_GAP;
        }else{
            gap = (depthWiseGapData[depth + 1] * (data[i]?.children?.length ? data[i]?.children?.length - 1 : 0)) + (MIN_GAP) + (NODE_WIDTH * (data[i]?.children?.length || 0)) / 2;
        }
        gapUsed = maximum(gapUsed , gap);
        let xVal = leftSpacing + (NODE_WIDTH * (i + 1)) + (gap * i) + (NODE_WIDTH /2) + (res/2);
        levelWiseContainerSize[depth] = xVal;
        totalSize = xVal;
        result.nodes.push({
            id: id,
            type: "customNode",
            position: { x: xVal, y: depth*100 }, // Calculate Position
            data: { label: data[i].name , nodeData: data[i] }
        });
        if(parentId){
            result.edges.push({
                id: `e${id}`,
                type: 'smoothstep',
                source: parentId,
                target: id
            });
        }
    }
    let toReturn = totalSize - offset;
    depthWiseGapData[depth] = gapUsed;
    return toReturn;
}

export const parseNodes = (data:any)=>{
    const result = {
        nodes: [],
        edges: []
    }
    const depthWiseGapData = {}
    const levelWiseContainerSize = {}
    const parsedData = helper(data["children"] , result , null , 0 , 0 , depthWiseGapData , levelWiseContainerSize);
    return result;
}