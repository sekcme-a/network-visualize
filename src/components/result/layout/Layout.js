

import { Grid } from "@mui/material"
import styles from "./Layout.module.css"
import Image from "next/image"
import SliderControl from "./SliderControl"

const Layout = ({layoutName, setLayoutName, edgeLength, onEdgeLengthChange, nodeSpacing, onNodeSpacingChange}) => {

  
  const list = [
    {id: "cola", label:"Cola", image: "/cola.png",
      description: "Cola layout is a type of force-directed layout that automatically arranges the nodes of a graph based on the distances and connections between them. It uses a simulation of physical forces to avoid collisions between nodes and creates a naturally spreading shape."},
    {id: "grid", label:"Grid", image: "/grid.png",
      description: "Grid layout arranges the nodes in a grid pattern. This method places nodes at regular intervals, allowing for a neatly organized visualization of the graph."},
    {id: "circle", label:"Circle", image: "/circle.png",
      description: "Circle layout visualizes the graph by arranging the nodes in a circular pattern. The nodes are placed evenly along the circumference of a circle, creating a symmetrical shape centered around a point."},
    {id: "dagre", label:"Dagre", image: "/dagre.png",
      description: "Dagre layout is used to arrange directed acyclic graphs (DAGs). This layout is useful for visually representing the hierarchical structure of a graph, aligning the nodes in a layered manner."},
    {id: "concentric", label:"Concentric", image: "/concentric.png",
      description: "Concentric layout arranges the nodes of a graph in concentric circles. Nodes are placed further out from the center as they move away from the central node, allowing for a visual distinction between relationships. This layout is useful for emphasizing hierarchical relationships or distinguishing between central and peripheral nodes."},
  ]


  return(
    <div className={styles.container}>
      <h4 style={{marginBottom:"10px"}}>Select Layout</h4>

      {layoutName==="cola" && 
        <SliderControl             edgeLength={edgeLength}
            onEdgeLengthChange={onEdgeLengthChange}
            nodeSpacing={nodeSpacing}
            onNodeSpacingChange={onNodeSpacingChange}
            />
}
      {
        list.map((item, index) => (
          <div className={`${styles.item} ${layoutName===item.id && styles.selected}`} 
            onClick={() => setLayoutName(item.id)} key={index}>
            <Image
              src={item.image}
              alt="adsf"
              width={50}
              height={50}
            />
            <h4>{item.label}</h4>
            <p>{item.description}</p>
          </div>
        ))
      }
     
    </div>
  )
}

export default Layout