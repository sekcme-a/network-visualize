import { useEffect } from "react"
import NodeInfo from "./select/NodeInfo"
import { useContext } from "react"
import { MyContext } from "@/context/data"
import EdgeInfo from "./select/EdgeInfo"



const Select = ({selectedType, selectedId}) => {

  const {edges, nodes} = useContext(MyContext)

  useEffect(()=> {

  },[selectedType, selectedId])


  return(
    <>
    {selectedType==="node" && <NodeInfo id={selectedId} data={{nodes, edges}}/>}
    {selectedType==="edge" && <EdgeInfo id={selectedId} data={{nodes, edges}}/>}


    </>
  )
}

export default Select