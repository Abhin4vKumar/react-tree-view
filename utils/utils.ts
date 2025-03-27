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

const MIN_GAP = 150;
const NODE_WIDTH = 200;
const NODE_HEIGHT = 100;
const maximum = (a:number , b:number):number =>{
    if(a > b){
        return a;
    }
    return b;
}
const helper = (data:any , result:any , parentId:string|null , depth : number , parentIndex: number , depthWiseLeftSpacing:any , expandedNodes:Record<string,boolean> ):number => {
    if(!data) return 0;
    let first = -1;
    let last = -1;
    for(let i=0; i<data.length; i++){
        //CalculateID
        let id = "";
        if(parentId){
            id = `${parentId}-${i}`;
        }else{
            id = `${i}`;
        }
        let res = 0;
        if(!expandedNodes?.[id]){
            res = helper(data[i].children , result , id , depth + 1 , i , depthWiseLeftSpacing , expandedNodes  );
        }
        let offset = 0;
        let leftSpacing = 0;
        let xcor = 0;
        if(!data[i]?.children?.length || (expandedNodes[id])){
            leftSpacing = (depthWiseLeftSpacing[depth] ? depthWiseLeftSpacing[depth] : 0) + MIN_GAP;
            xcor = (MIN_GAP * parentIndex) + parentIndex * NODE_WIDTH;
        }else{
            xcor = res ;
        }
        if(depthWiseLeftSpacing[depth - 1]){
            if(!depthWiseLeftSpacing[depth] || (depthWiseLeftSpacing[depth] && (depthWiseLeftSpacing[depth] < depthWiseLeftSpacing[depth - 1]))){
                offset = depthWiseLeftSpacing[depth - 1] + MIN_GAP - (leftSpacing);
                console.log(id,offset)
            }
        }
        let xVal =  offset + (leftSpacing != 0 ? leftSpacing : xcor) ;
        if(i==0){
            first = xVal;
        }
        if(i == data.length - 1){
            last = xVal;
        }
        depthWiseLeftSpacing[depth] = xVal + NODE_WIDTH/2;
        result.nodes.push({
            id: id,
            type: "customNode",
            position: { x: xVal, y: depth*(NODE_HEIGHT + MIN_GAP) }, // Calculate Position
            // data: { label: `${xVal} , ${leftSpacing} , ${depthWiseLeftSpacing[depth]} , ${offset}` , nodeData: data[i] , id:id }
            data: { label: data[i].name , nodeData: data[i] , id:id , parentId: parentId , expanded: expandedNodes[id] }
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
    //cal avg
    let toReturn = last + first;
    toReturn = toReturn/2;
    return toReturn;
}

export const parseNodes = (data:any , expandedState:Record<string,boolean>)=>{
    const result = {
        nodes: [],
        edges: []
    }
    const depthWiseLeftSpacing = {}
    const parsedData = helper([data,] , result , null , 0 , 0 , depthWiseLeftSpacing , expandedState);
    return result;
}