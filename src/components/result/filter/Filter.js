import { Grid, Switch } from "@mui/material"
import RangeSlider from "./RangeSlider"

import styles from "./Filter.module.css"

const columnName = [
  { "id": "combined_score", "text": "Combined Score", color:"rgb(128,0,128)" },
  { "id": "neighborhood_on_chromosome", "text": "Gene Neighborhood", color:"rgb(200,0,200)" },
  { "id": "gene_fusion", "text": "Gene Fusions", color:"rgb(0,160,200)" },
  { "id": "phylogenetic_cooccurrence", "text": "Gene Co-occurrence", color:"rgb(170,200,0)" },
  { "id": "homology", "text": "Homology", color:"rgb(255,165,0)" },
  { "id": "coexpression", "text": "Co-expression", color:"rgb(0,128,0)" },
  { "id": "experimentally_determined_interaction", "text": "Experimentally Determined", color:"rgb(255,69,0)" },
  { "id": "database_annotated", "text": "Association in Curated Databases", color:"rgb(0,0,255)" },
  { "id": "automated_textmining", "text": "Textmining", color:"rgb(35, 35, 35)" }
]



const Filter = ({selectedEdgeType, setSelectedEdgeType, filterEdgeByScore, setFilterEdgeByScore}) => {


  const onClick = (id) => {
    setSelectedEdgeType(prev => {
      if(prev.includes(id)) return prev.filter(item => item!==id)
      else return [...prev, id]
    })
  }

  return(
    <div>
      <h4 style={{marginBottom:"10px"}}>Interaction Filtering</h4>
      {/* {
        columnName.map((item, index) => (
          <div key={index} style={{marginBottom:"50px"}}>
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
              <div style={{display:"flex", alignItems:"center"}}>
                <Switch
                    size="small" 
                    type="radio" 
                    value={item.id}
                    checked={selectedEdgeType.includes(item.id)}
                    onClick={()=>onClick(item.id)}
                  />

                <div style={{width:"20px", height:"3px", backgroundColor: selectedEdgeType.includes(item.id) ? item.color : "#999"}}/>
                <p style={{marginLeft:"5px", fontSize:"12px", color: selectedEdgeType.includes(item.id) ? "black" : "#888"}}>{item.text}</p>
              </div>
              <RangeSlider id={item.id} {...{filterEdgeByScore, setFilterEdgeByScore}} disabled={!selectedEdgeType.includes(item.id)}/>
            </div>
          </div>
        ))
      } */}
      <Grid container columnSpacing={4} rowSpacing={1}>
        {
          columnName.map((item, index) => (
            <Grid item xs={6} key={index} >
              <div className={styles.item}>
                <div style={{display:"flex", alignItems:"center"}}>
                  <Switch
                    size="small" 
                    type="radio" 
                    value={item.id}
                    checked={selectedEdgeType.includes(item.id)}
                    onClick={()=>onClick(item.id)}
                  />
                  <div style={{marginLeft: "10px", width:"20px", height:"3px", backgroundColor: selectedEdgeType.includes(item.id) ? item.color : "#999"}}/>
                  <p style={{marginLeft:"5px", fontSize:"12px", color: selectedEdgeType.includes(item.id) ? "black" : "#888"}}>{item.text}</p>
                </div>
                <RangeSlider id={item.id} {...{filterEdgeByScore, setFilterEdgeByScore}} disabled={!selectedEdgeType.includes(item.id)}/>
              </div>
            </Grid>
          ))
        }
      </Grid>
    </div>
  )
}

export default Filter