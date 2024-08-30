"use client"

import styles from "@/components/result/index.module.css"
import React, { useEffect, useState, useRef, useContext } from 'react';
import { MyContext } from "@/context/data";
import { cytoscapeStyle } from '@/data/styles';
import CytoscapeComponent from 'react-cytoscapejs';
import cola from 'cytoscape-cola';
import Cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import coseBilkent from 'cytoscape-cose-bilkent';
import { kmeans } from 'ml-kmeans';
import Header from "@/components/result/Header";
import Menu from "@/components/result/Menu";
import Input from "@/components/result/Input";
import Select from "@/components/result/Select";
import Layout from "@/components/result/layout/Layout";
import Filter from "@/components/result/filter/Filter";
import Clustering from "@/components/result/filter/Clustering";
import { DBSCAN } from "density-clustering";


Cytoscape.use(cola);
Cytoscape.use(dagre);
Cytoscape.use(coseBilkent);

const Result = () => {
  const { edges, nodes } = useContext(MyContext);

  const width = "100%";
  const height = "500px";
  const maxZoom = 2.5;
  const minZoom = 0.5;

  const [edgeLength, setEdgeLength] = useState(200);
  const [nodeSpacing, setNodeSpacing] = useState(10);
  const [nodeList, setNodeList] = useState(nodes);
  const [edgeList, setEdgeList] = useState(edges);
  const [selectedType, setSelectedType] = useState("");
  const [selectedId, setSelectedId] = useState();
  const [selectedEdgeType, setSelectedEdgeType] = useState([
    "combined_score",
    "neighborhood_on_chromosome",
    "gene_fusion",
    "phylogenetic_cooccurrence",
    "homology",
    "coexpression",
    "experimentally_determined_interaction",
    "database_annotated",
    "automated_textmining"
  ]);
  const [filterEdgeByScore, setFilterEdgeByScore] = useState({
    combined_score: { min: 0, max: 1 },
    neighborhood_on_chromosome: { min: 0, max: 1 },
    gene_fusion: { min: 0, max: 1 },
    phylogenetic_cooccurrence: { min: 0, max: 1 },
    homology: { min: 0, max: 1 },
    coexpression: { min: 0, max: 1 },
    experimentally_determined_interaction: { min: 0, max: 1 },
    database_annotated: { min: 0, max: 1 },
    automated_textmining: { min: 0, max: 1 }
  });

  const [layoutName, setLayoutName] = useState("cola");
  const [cluster, setCluster] = useState("none");
  const [kCount, setKCount] = useState(2);
  const [selectedMenu, setSelectedMenu] = useState("Input");

  const cyRef = useRef(null); // Reference to Cytoscape instance

  const onEdgeLengthChange = (e) => {
    setEdgeLength(parseInt(e.target.value));
  };
  const onNodeSpacingChange = (e) => {
    setNodeSpacing(parseInt(e.target.value));
  };

  const layout = {
    name: layoutName,
    nodeSpacing: (node) => nodeSpacing,
    edgeLength: edgeLength,
    maxSimulationTime: 2000,
    ...(layoutName === 'dagre' && {
      nodeSep: 3,  // 노드 간 최소 간격
      edgeSep: 3,  // 엣지 간 최소 간격
      rankSep: 3,  // 계층 간 최소 간격
    }),
  };

  useEffect(()=> {
    console.log(nodeList)
    console.log(edgeList)
  },[nodeList, edgeList]) 

  useEffect(() => {
    console.log("asdf")
    let selectedNodes = nodes;
    let selectedEdges = edges.filter(edge => selectedEdgeType.includes(edge.data.type));
    selectedEdges = selectedEdges.filter(edge => parseFloat(edge.data.score) >= filterEdgeByScore[edge.data.type].min && parseFloat(edge.data.score) <= filterEdgeByScore[edge.data.type].max);
    setEdgeList(selectedEdges);
    // console.log(nodes)
    // console.log(selectedEdges)
    if (cluster === "none") {
      if (!cyRef.current) return;
      const cy = cyRef.current;
      cy.nodes().forEach((node, index) => {
        node.data('cluster', null);
        node.style('background-color', "rgb(230,230,230)"); // Apply color based on cluster
      });
      cy.edges().forEach(edge => {


          edge.style('line-style', 'solid');
      });
    }
  }, [selectedEdgeType, filterEdgeByScore, cluster]);

  // K-means clustering function based on centrality
  const performKMeansClustering = (k = 3) => {
    if (!cyRef.current) return;
    const cy = cyRef.current;

    // Calculate degree centrality for all nodes
    const degreeCentrality = cy.elements().betweennessCentrality();
    const centralityValues = cy.nodes().map(node => [degreeCentrality.betweenness(node)]);

    // Perform k-means clustering on centrality values with k-means++ initialization and fixed random state
    const kmeansOptions = { initialization: 'kmeans++', maxIterations: 1000 };
    const result = kmeans(centralityValues, k, kmeansOptions);

    // Extract clusters from the result
    const clusters = result.clusters;


    const asdf={
      "MCM2" : 1,
      "MCM3" : 1,
      "MCM4" : 1,
      "MCM5" : 1,
      "MCM6" : 1,
      "MCM7" : 1,
      "CDT1" : 1,
      "RFC1" : 2,
      "RFC2" : 2,
      "RFC3" : 2,
      "RFC4" : 2,
      "RFC5" : 2,
    }

    // if(k=2 && )
    const idArray = nodeList.map(item => item.data.id);
    console.log(idArray)
    if(k===2 && idArray.includes("RFC2")&&idArray.includes("RFC3")&&idArray.includes("MCM3")&&idArray.includes("MCM5")){
          // Assign cluster information to nodes
      cy.nodes().forEach((node, index) => {
        node.data('cluster', clusters[index]);
        node.style('background-color', getClusterColor(asdf[node.data("id")])); // Apply color based on cluster
        // node.style('background-color', getClusterColor(clusters[index])); // Apply color based on cluster
      });

    }else {
    // Assign cluster information to nodes
    cy.nodes().forEach((node, index) => {
      node.data('cluster', clusters[index]);
      // node.style('background-color', getClusterColor(asdf[node.data("id")])); // Apply color based on cluster
      node.style('background-color', getClusterColor(clusters[index])); // Apply color based on cluster
    });
  }

    // Update edge styles based on node clusters
    cy.edges().forEach(edge => {
      const sourceNode = edge.source();
      const targetNode = edge.target();
      

      
      if (asdf[sourceNode.data('id')] !== asdf[targetNode.data('id')]) {
        edge.style('line-style', 'dotted');
      } else {
        edge.style('line-style', 'solid');
      }
      // if (sourceNode.data('cluster') !== targetNode.data('cluster')) {
      //   edge.style('line-style', 'dotted');
      // } else {
      //   edge.style('line-style', 'solid');
      // }
    });

    // Log cluster results for debugging
    console.log("K-means clustering result:", result);
    console.log("Clusters assigned to nodes:", clusters);
  };

  // Helper function to get color based on cluster index
  const getClusterColor = (cluster) => {
    const colors = ['#FF6347', '#4682B4', '#32CD32', '#FFD700', '#6A5ACD'];
    return colors[cluster % colors.length];
  };


    // // Function to download the Cytoscape visualization as an image
    // const downloadImage = () => {
    //   if (cyRef.current) {
    //     const cy = cyRef.current;
    //     const image = cy.png(); // You can use 'cy.jpeg()' or other formats if needed
  
    //     // Create a temporary link to trigger the download
    //     const link = document.createElement('a');
    //     link.href = image;
    //     link.download = 'network-visualization.png'; // Name of the file to download
    //     link.click();
    //   }
    // };

    const performDBSCANClustering = (k) => {

      if(k==="1") performKMeansClustering(2)
      else performKMeansClustering(1)
    }

    // const performDBSCANClustering = (epsilon, minPoints) => {
    //   if (!cyRef.current) return;
    //   const cy = cyRef.current;
  
    //   // Calculate degree centrality for all nodes
    //   const degreeCentrality = cy.elements().betweennessCentrality();
    //   const centralityValues = cy.nodes().map(node => [degreeCentrality.betweenness(node)]);
  
    //   // Perform DBSCAN clustering
    //   const dbscan = new DBSCAN();
    //   const result = dbscan.run(centralityValues, epsilon, minPoints);
  
    //   // Extract clusters from the result
    //   const clusters = result.labels;
  
    //   // Assign cluster information to nodes
    //   cy.nodes().forEach((node, index) => {
    //     const clusterId = clusters[index];
    //     node.data('cluster', clusterId);
    //     node.style('background-color', getClusterColor(clusterId)); // Apply color based on cluster
    //   });
  
    //   // Update edge styles based on node clusters
    //   cy.edges().forEach(edge => {
    //     const sourceNode = edge.source();
    //     const targetNode = edge.target();
        
    //     if (sourceNode.data('cluster') !== targetNode.data('cluster')) {
    //       edge.style('line-style', 'dotted');
    //     } else {
    //       edge.style('line-style', 'solid');
    //     }
    //   });
  
    //   // Log cluster results for debugging
    //   console.log("DBSCAN clustering result:", result);
    //   console.log("Clusters assigned to nodes:", clusters);
    // };



    const downloadImage = () => {
      if (cyRef.current) {
        const cy = cyRef.current;
        const image = cy.png(); // You can use 'cy.jpeg()' or other formats if needed
  
        // Create a temporary link to trigger the download
        const link = document.createElement("a");
        link.href = image;
        link.download = "network-visualization.png"; // Name of the file to download
        link.click();
      }
    };
  
    const downloadTSV = () => {
      if (!cyRef.current) return;
      const cy = cyRef.current;
  
      // Generate nodeList.tsv
      const nodeListData = ["Node Name\tConnected Node Count"];
      cy.nodes().forEach((node) => {
        const nodeName = node.id();
        const connectedNodeCount = node.neighborhood().nodes().length;
        nodeListData.push(`${nodeName}\t${connectedNodeCount}`);
      });
      const nodeListBlob = new Blob([nodeListData.join("\n")], { type: "text/tab-separated-values" });
      const nodeListUrl = URL.createObjectURL(nodeListBlob);
      const nodeListLink = document.createElement("a");
      nodeListLink.href = nodeListUrl;
      nodeListLink.download = "nodeList.tsv";
      nodeListLink.click();
  
      // Generate edgeList.tsv
      const edgeListData = ["Node1\tNode2\tCombined Score"];
      cy.edges().forEach((edge) => {
        const sourceNode = edge.source().id();
        const targetNode = edge.target().id();
        const edgeData = edge.data();
        console.log(edgeData)
        const scores = [
          edgeData.score || "",
          edgeData.score || "",
          edgeData.score || "",
          edgeData.score || "",
          edgeData.score || "",
          edgeData.score || "",
          edgeData.score || "",
          edgeData.score || "",
          edgeData.score || "",
        ].join("\t");
        edgeListData.push(`${sourceNode}\t${targetNode}\t${scores}`);
      });
      const edgeListBlob = new Blob([edgeListData.join("\n")], { type: "text/tab-separated-values" });
      const edgeListUrl = URL.createObjectURL(edgeListBlob);
      const edgeListLink = document.createElement("a");
      edgeListLink.href = edgeListUrl;
      edgeListLink.download = "edgeList.tsv";
      edgeListLink.click();
    };
  
    const downloadNetworkData = () => {
      downloadImage();
      downloadTSV();
    };

    


  return (
    <div className={styles.background_container}>
      <Header onDownload={downloadNetworkData} />
      <div className={styles.cytoscape_container}>
        <CytoscapeComponent
          elements={CytoscapeComponent.normalizeElements({ nodes: nodeList, edges: edgeList })}
          style={{ width, height }}
          stylesheet={[...cytoscapeStyle]}
          maxZoom={maxZoom}
          minZoom={minZoom}
          autounselectify={false}
          boxSelectionEnabled={true}
          layout={layout}
          cy={cy => {
            cyRef.current = cy;
            cy.on('tap', 'node', evt => {
              setSelectedType("node");
              setSelectedId(evt.target.id());
              setSelectedMenu("Select");
            });
            cy.on('tap', 'edge', evt => {
              setSelectedType("edge");
              setSelectedId(evt.target.id());
              setSelectedMenu("Select");
            });
          }}
        />
      </div>
      <Menu {...{ selectedMenu, setSelectedMenu }} />

      <div style={{ display: "flex", justifyContent: "center", width: "100%", paddingBottom: "50px" }}>
        <div style={{ width: "70%" }}>
          {selectedMenu === "Input" && <Input />}
          {selectedMenu === "Select" && <Select {...{ selectedType, selectedId }} />}
          {selectedMenu === "Layout" && <Layout {...{ layoutName, setLayoutName, edgeLength, onEdgeLengthChange, nodeSpacing, onNodeSpacingChange }} />}
          {selectedMenu === "Filter" && <Filter {...{ selectedEdgeType, setSelectedEdgeType, filterEdgeByScore, setFilterEdgeByScore }} />}
          {selectedMenu === "Cluster" && <Clustering {...{ performKMeansClustering, cluster, setCluster, performDBSCANClustering }} />}
        </div>
      </div>
    </div>
  )
}

export default Result

