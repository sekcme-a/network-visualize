import { MyContext } from "@/context/data"
import { useContext } from "react"
import styles from "./Input.module.css"



const Input = () => {
  const {edges, nodes} = useContext(MyContext)

  console.log(nodes)
  return(
    <div className={styles.container}>
      <h4>Detected Nodes</h4>
      <p style={{fontSize:"12px", marginTop: "5px", marginBottom:"3px"}}>{nodes.length} nodes found</p>

      <div className={styles.nodes}>
        {nodes.map((item, index) => (
          <div className={styles.item} key={index}>
            <h5>{item.data["#node"]}</h5>

            <p>{item.data.domain_summary_url}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Input