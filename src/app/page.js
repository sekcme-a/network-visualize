"use client"

import React, { useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import { parseTsvData } from '@/utils/parsetTsv';
import { MyContext } from '@/context/data';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NetworkResult from '@/components/NetworkResult';
import { useRef } from 'react';

const Home = () => {
  const router = useRouter()
  const fileInputRef = useRef()
  const fileInputRef2 = useRef()
  const [elements, setElements] = useState([]);

  const [interactions, setInteractions] = useState([])
  const [annotations, setAnnotations] = useState([])

  const [fileName, setFileName]= useState("")
  const [fileName2, setFileName2] = useState("")

  const { nodes, setNodes, edges, setEdges } = useContext(MyContext)

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      if(type==="interactions")
        setFileName(file.name);  // Set the selected file's name in the state
      else
        setFileName2(file.name)
    }
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      const data = parseTsvData(content);

      if (type === "interactions")
        setInteractions(data)
      else setAnnotations(data)
    };

    reader.readAsText(file);
  };

  const calculateNodeSizes = (edgeList) => {
    const nodeEdgeCount = {};

    edgeList.forEach(edge => {
      const { source, target } = edge.data;
      nodeEdgeCount[source] = (nodeEdgeCount[source] || 0) + 1;
      nodeEdgeCount[target] = (nodeEdgeCount[target] || 0) + 1;
    });

    return nodeEdgeCount;
  }

  const onVisualizeClick = () => {
    const nodeList = interactions.map(item => ({
      data: {
        id: item["#node1"],
        label: item["#node1"]
      }
    }));

    // Remove duplicate nodes
    const uniqueNodes = [...new Map(nodeList.map(node => [node.data.id, node])).values()];

    const updatedNodeList = uniqueNodes.map(node => {
      const annotation = annotations.find(nodeInfo => nodeInfo["#node"] === node.data.id);
      return annotation ? { data: { ...node.data, ...annotation } } : node;
    });

    const seenPairs = new Set()

    const edgeList = interactions.flatMap(item => {
      const pair1 = `${item["#node1"]}_${item.node2}`;
      const pair2 = `${item.node2}_${item["#node1"]}`;
      if (!seenPairs.has(pair1) && !seenPairs.has(pair2)) {
        seenPairs.add(pair1)
        seenPairs.add(pair2)

        const edges = [
          {
            data: {
              id: `${item["#node1"]}_${item.node2}_combined`,
              source: item["#node1"],
              target: item.node2,
              score: item.combined_score,
              type: "combined_score"
            }
          },
          {
            data: {
              id: `${item["#node1"]}_${item.node2}_neighborhood`,
              source: item["#node1"],
              target: item.node2,
              score: item.neighborhood_on_chromosome,
              type: "neighborhood_on_chromosome"
            }
          },
          {
            data: {
              id: `${item["#node1"]}_${item.node2}_gene_fusion`,
              source: item["#node1"],
              target: item.node2,
              score: item.gene_fusion,
              type: "gene_fusion"
            }
          },
          {
            data: {
              id: `${item["#node1"]}_${item.node2}_phylogenetic_cooccurrence`,
              source: item["#node1"],
              target: item.node2,
              score: item.phylogenetic_cooccurrence,
              type: "phylogenetic_cooccurrence"
            }
          },
          {
            data: {
              id: `${item["#node1"]}_${item.node2}_homology`,
              source: item["#node1"],
              target: item.node2,
              score: item.homology,
              type: "homology"
            }
          },
          {
            data: {
              id: `${item["#node1"]}_${item.node2}_coexpression`,
              source: item["#node1"],
              target: item.node2,
              score: item.coexpression,
              type: "coexpression"
            }
          },
          {
            data: {
              id: `${item["#node1"]}_${item.node2}_experimentally_determined_interaction`,
              source: item["#node1"],
              target: item.node2,
              score: item.experimentally_determined_interaction,
              type: "experimentally_determined_interaction"
            }
          },
          {
            data: {
              id: `${item["#node1"]}_${item.node2}_database_annotated`,
              source: item["#node1"],
              target: item.node2,
              score: item.database_annotated,
              type: "database_annotated"
            }
          },
          {
            data: {
              id: `${item["#node1"]}_${item.node2}_automated_textmining`,
              source: item["#node1"],
              target: item.node2,
              score: item.automated_textmining,
              type: "automated_textmining"
            }
          },
        ];

        return edges.filter(edge => edge.data.score !== 0 && edge.data.score !== "0");
      }
      return [];
    });

    setEdges(edgeList)

    const nodeEdgeCount = calculateNodeSizes(edgeList);

    const updatedNodesWithSize = updatedNodeList.map(node => ({
      ...node,
      data: {
        ...node.data,
        size: nodeEdgeCount[node.data.id] ? nodeEdgeCount[node.data.id]/1.5 + 25 : 25
      }
    }));

    setNodes(updatedNodesWithSize);
    console.log(edgeList)
    console.log(updatedNodesWithSize)

    router.push("/visualizeresult")
  }

  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleClick2 = () => {
    fileInputRef2.current.click();
  };

  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100vw", height:"100vh", backgroundColor:"rgb(36, 36, 36)", }}>
      <div style={{width:"400px", height:"500px", backgroundColor:"white", borderRadius: 10, justifyContent:"center", alignItems:"center", display: "flex"}}>
        <div>
          <h3 style={{marginBottom:"20px", fontSize:"25px"}}>Network Visualization</h3>

          <div style={{width:"100%"}}>
            <h5 style={{marginBottom:"5px"}}>Input Interactions</h5>
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFileUpload(e, "interactions")}
              accept=".tsv"
              style={{ display: 'none' }}
            />
            {/* Custom button to trigger file input */}
            
            <div style={{display:"flex", flexWrap:"wrap"}}>
              <div style={{display:"flex", alignItems:"center", height: "30px", width:"170px", border: "1px solid rgb(200,200,200)", borderRadius: 5, padding: "5px"}}>
                {fileName && (
                  <p style={{ fontSize: "14px", color: "#333" }}>{fileName}</p>
                )}
              </div>
              <button
                onClick={handleClick}
                style={{
                  marginLeft:"10px", 
                  padding: "10px 20px",
                  borderRadius: "5px",
                  border: "2px solid #ccc",
                  backgroundColor: "#1700a9",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Upload File
              </button>
            </div>
          </div>




          <div style={{width:"100%", marginTop: "20px"}}>
            <h5 style={{marginBottom:"5px"}}>Input Annotations <strong style={{fontWeight:"normal", fontSize:"11px"}}>{`(* Not required)`}</strong></h5>
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef2}
              onChange={(e) => handleFileUpload(e, "annotations")}
              accept=".tsv"
              style={{ display: 'none' }}
            />
            {/* Custom button to trigger file input */}
            
            <div style={{display:"flex", flexWrap:"wrap"}}>
              <div style={{display:"flex", alignItems:"center", height: "30px", width:"170px", border: "1px solid rgb(200,200,200)", borderRadius: 5, padding: "5px"}}>
                {fileName && (
                  <p style={{ fontSize: "14px", color: "#333" }}>{fileName2}</p>
                )}
              </div>
              <button
                onClick={handleClick2}
                style={{
                  marginLeft:"10px", 
                  padding: "10px 20px",
                  borderRadius: "5px",
                  border: "2px solid #ccc",
                  backgroundColor: "#1700a9",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Upload File
              </button>
            </div>
          </div>


          <button
            onClick={onVisualizeClick}
            style={{
              marginTop:"30px", 
              padding: "10px 20px",
              borderRadius: "10px",
              width:"100%",
              border: "2px solid #ccc",
              backgroundColor: "#060056",
              color: "white",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Visualize
          </button>

        </div>
      </div>
    </div>
  );
};

export default Home;
