"use client"

import NetworkResult from "@/components/NetworkResult"
import { MyContext } from "@/context/data"
import { useContext, useEffect } from "react"



const Result = () => {
  const {edges, nodes} = useContext(MyContext)


  return(

    <>
    <h1>Biological Network Visualization</h1>
      <NetworkResult {...{edges, nodes}} />
    
    
    </>
  )
}

export default Result