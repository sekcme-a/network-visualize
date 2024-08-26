import { TextField } from "@mui/material";
import { useState } from "react";



const Clustering = ({performKMeansClustering, cluster, setCluster}) => {

  const [kCount, setKCount] = useState(2)
  const [dbscanCount, setDbscanCount] = useState(2)

  return(
    <>
      <h4 style={{marginBottom:"10px"}}>Clustering</h4>

      <div style={{display:"flex", alignItems:"center", 
        padding: "10px 20px", border:"1px solid rgb(200,200,200)",
        borderRadius:"10px"
      }}>
        <div style={{display:"flex", minWidth:"130px"}}>
          <input
            type="radio"
            value="kmeans"
            checked={cluster==="kmeans"}
            onClick={()=>{
              setCluster(prev => {
                if(prev==="kmeans") return "none"
                else {
                  performKMeansClustering(parseInt(kCount))
                  return "kmeans"
                }
              });
            }}
          />
          <p style={{marginLeft:"10px"}}>
            k-means
          </p>
        </div>

        <TextField
          size="small"
          sx={{}}
          value={kCount}
          onChange={(e) => setKCount(e.target.value)}
          label="Number of clusters"
        />

      </div>

        <div style={{display:"flex", alignItems:"center", 
        padding: "10px 20px", border:"1px solid rgb(200,200,200)",
        borderRadius:"10px", marginTop:"10px"
      }}>
          <div style={{display:"flex", minWidth:"130px"}}>
            <input
              type="radio"
              value="dbscan"
              checked={cluster==="dbscan"}
              onClick={()=>{
                setCluster(prev => {
                  if(prev==="dbscan") return "none"
                  else {
                    performKMeansClustering(parseInt(2))
                    return "dbscan"
                  }
                });
              }}
            />
            <p style={{marginLeft:"10px"}}>
              dbscan
            </p>
          </div>

          <TextField
            size="small"
            sx={{}}
            value={dbscanCount}
            onChange={(e) => setDbscanCount(e.target.value)}
            label="parameter"
          />

        </div>

    </>
  )
}

export default Clustering