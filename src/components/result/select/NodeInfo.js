"use client"

import { useEffect, useState } from "react"
import style from "./nodeInfo.module.css"
import InteractionTable from "./InteractionTable"



const NodeInfo = ({id, data}) => {

  const [selectedNode, setSelectedNode] = useState(null)

  const [interactions, setInteractions] = useState([])

  useEffect(()=> {
    data.nodes.map(node => {
      if(node.data.id===id){
        setSelectedNode(node.data)
      }
    })
    const list = data.edges.map(edge => {
      if(edge.data.source === id) return {target: edge.data.target, score: edge.data.score, type: edge.data.type}
      else if(edge.data.target === id) return {target: edge.data.source, score: edge.data.score, type: edge.data.type}
    }).filter(Boolean)
    setInteractions(list)
  },[id])


  const getAccession = (nodeId) => {
    const node = data.nodes.find(node => node.data.id === nodeId);
    return node ? `[${node.data.identifier.slice(5)}]` : undefined;
  };
  

  return(
    <div className={style.container}>
      <h4>Selected protein</h4>
      <div className={style.node}>
        <h4>{selectedNode?.label}</h4>
        <p style={{fontSize:"11px", fontStyle:"italic"}}>{`[${selectedNode?.identifier?.slice(5)}]`}</p>
      </div>
      <p style={{fontSize:"12px"}}>{selectedNode?.domain_summary_url}</p>
      
      <h4 style={{marginTop:"15px", marginBottom:"10px"}}>Interactions</h4>
      {/* {
        interactions.map((edge, index) => {
          if(edge.data.type==="combined_score"){
            return(
              <div key={index} style={{display:"flex", alignItems:"center"}}>
                <h5>{edge.data.source===id ? edge.data.target : edge.data.source}</h5>
                <p style={{fontSize:"12px", marginLeft:"4px", fontStyle:"italic"}}>
                  {getAccession(edge.data.source===id ? edge.data.target : edge.data.source)}</p>
              </div>
            )
          }
        })
      } */}
      <InteractionTable data={interactions} nodes={data.nodes}/>
    </div>
  )
}

export default NodeInfo