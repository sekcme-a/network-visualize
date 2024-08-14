import React from 'react';
import styles from "./InteractionTable.module.css"


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

const InteractionTable = ({data, nodes}) => {
 // Extract all unique types
 const types = [...new Set(data.map(item => item.type))];

 // Group data by target and create rows
 const rows = data.reduce((acc, item) => {
   const { target, type, score } = item;
   if (!acc[target]) acc[target] = { target };
   acc[target][type] = score;
   return acc;
 }, {});


 const getAccession = (nodeId) => {
  const node = nodes.find(node => node.data.id === nodeId);
  return node ? `[${node?.data?.identifier?.slice(5)}]` : undefined;
};


 return (
   <div className="App">
     <table className={styles.table}>
       <thead>
         <tr>
           <th className={styles.th}>Interaction</th>
           {types.map(type => <th className={styles.th} key={type}>{columnName[type]}</th>)}
         </tr>
       </thead>
       <tbody>
         {Object.values(rows).map(row => {
            return(
              <tr key={row.target}>
                <td className={styles.td}>
                  <div className={styles.target}>
                    {row.target}
                    <p>{getAccession(row.target)}</p>
                  </div>
                </td>
                {types.map(type => <td className={styles.td} key={type}>{row[type] || 'N/A'}</td>)}
              </tr>
            )
          })}
       </tbody>
     </table>
   </div>
 );
};

export default InteractionTable;
