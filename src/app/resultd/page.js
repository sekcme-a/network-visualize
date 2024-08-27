"use client"

import Input from "@/components/Input"
import NetworkResult from "@/components/NetworkResult"
import { MyContext } from "@/context/data"
import { useContext, useEffect } from "react"



const Result = () => {
  const {edges, nodes} = useContext(MyContext)


  return(

    <>
    <h1>Biological Network Visualization</h1>
    <p style={{marginTop:"5px"}}>Result for 11 nodes</p>
    {/* <Input /> */}
    {/* {edges?.length>0 && nodes?.length>0 && */}
      <NetworkResult {...{edges, nodes}} />
{/* } */}
    
    </>
  )
}

export default Result