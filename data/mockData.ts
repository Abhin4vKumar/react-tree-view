export const hierarchicalData = {
    name: "root",
    children: [
      {
        name: "Concerned industries",
        children: [
          {
            name: "Raw Materials",
            children: [
              { name: "Tiles and ceramics" , clusterId: '67da6b4a10ebc8172adaa58c',id: "tiles_and_ceramics" },
              { name: "Processing" , clusterId: '61da6b4a10ebc8172adaa58c',id: "processing" },
              { name: "Quality Control" , clusterId: '67da6b4a10ebc8172adaa58c',id: "quality_control" }
            ]
          },
          {
            name: "Manufacturing",
            children: [
              { name: "Production" , clusterId: '67da6b4a10ebc8172adaa58c',id: "production" },
              { name: "Assembly" , clusterId: '67da6b4a10ebc8172adaa58c',id: "assembly" },
              { name: "Testing" , clusterId: '67da6b4a10ebc8172adaa58c',id: "testing" }
            ]
          },
          {
            name: "Distribution",
            children: [
              { name: "Packaging" , clusterId: '67da6b4a10ebc8172adaa58c',id: "packaging" },
              { name: "Logistics" , clusterId: '67da6b4a10ebc8172adaa58c',id: "logistics" },
              { name: "Warehousing" , clusterId: '67da6b4a10ebc8172adaa58c',id: "warehousing" }
            ]
          }
        ]
      },
      {
        name: "Market Segments",
        children: [
          {
            name: "Residential",
            children: [
              { name: "Homes" , clusterId: '67da6b4a10ebc8172adaa58c',id: "homes" }, 
              { name: "Apartments" , clusterId: '67da6b4a10ebc8172adaa58c',id: "apartments" }
            ]
          },
          {
            name: "Commercial",
            children: [
              { name: "Offices" },
              { name: "Retail" }
            ]
          }
        ]
      },
      {
        name: "Support Services",
        children: [
          {
            name: "Technical",
            children: [
              { name: "Design" },
              { name: "Engineering" }
            ]
          },
          {
            name: "Business",
            children: [
              { name: "Sales" },
              { name: "Marketing" },
              { name: "Marketing" },
              { name: "Marketing" },
              { name: "Marketing" },
              { name: "Marketing" }
            ]
          }
        ]
      }
    ]
  };