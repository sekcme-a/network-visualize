"use client"

import { useEffect, useState } from "react"
import style from "./nodeInfo.module.css"
import InteractionTable from "./InteractionTable"

const columnName = {
  combined_score: "Combined Score",
  neighborhood_on_chromosome:"Gene Neighborhood ",
  gene_fusion:"Gene Fusions",
  phylogenetic_cooccurrence:"Gene Co-occurrence",
  homology:"Homology",
  coexpression:"Co-expression",
  experimentally_determined_interaction:"Experimentally Determined",
  database_annotated:"Association in Curated Databases",
  automated_textmining:"Textmining"
}



const EdgeInfo = ({id, data}) => {

  const [targetNode, setTargetNode] = useState()
  const [sourceNode, setSourceNode] = useState()

  const [interactions, setInteractions] = useState([])

  useEffect(()=> {
    let selectedEdge = {}
    data.edges.map(edge => {
      if(edge.data.id===id) selectedEdge=edge.data
    })
    
    let targetData = {id: selectedEdge.target}
    let sourceData = {id: selectedEdge.source}

    data.nodes.map(node => {
      console.log(node)
      if(targetData.id === node.data.id) targetData = node.data
      if(sourceData.id === node.data.id) sourceData = node.data
    })
    setTargetNode(targetData)
    setSourceNode(sourceData)
    console.log(sourceData)
    const list = data.edges.map(edge => {
      if((edge.data.source === sourceData.id && edge.data.target===targetData.id)
        || (edge.data.source === targetData.id && edge.data.target === sourceData.id)
      ) return edge
    }).filter(Boolean)
    console.log(list)
    setInteractions(list)
  },[id])


  const getAccession = (nodeId) => {
    const node = data.nodes.find(node => node.data.id === nodeId);
    return node ? `[${node.data.identifier.slice(5)}]` : undefined;
  };
  

  return(
    <div className={style.container}>
      <h4>Selected Interaction</h4>

      <div style={{display:"flex", alignItems:"center", margin: "10px 0 0 0" }}>
        <h4>{sourceNode?.label}</h4>
        <p style={{fontSize:"11px", fontStyle:"italic"}}>{`[${sourceNode?.identifier?.slice(5)}]`}</p>
      </div>
      <p style={{fontSize:"12px"}}>{sourceNode?.domain_summary_url}</p>
      <div style={{display:"flex", alignItems:"center", margin: "10px 0 0 0" }}>
        <h4>{targetNode?.label}</h4>
        <p style={{fontSize:"11px", fontStyle:"italic"}}>{`[${targetNode?.identifier?.slice(5)}]`}</p>
      </div>
      <p style={{fontSize:"12px"}}>{targetNode?.domain_summary_url}</p>

      <div style={{height:"10px"}} />

      {interactions?.map((interaction, index) => {
        if(index!==0)
        return(
          <div key={index}>
            <strong style={{fontSize:"14px"}}>{columnName[interaction.data.type]}</strong>: <strong style={{fontSize:"13px", fontWeight:"normal"}}>{interaction.data.score}</strong>
          </div>
        )
      })}
      <div>
        <strong style={{fontSize:"14px"}}>
          Combined Score
        </strong>
        : 
        <strong style={{fontSize:"13px"}}>
          {` ${interactions[0]?.data?.score}`}
        </strong>
      </div>
    </div>
  )
}

export default EdgeInfo