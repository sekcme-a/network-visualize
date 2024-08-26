
import styles from "./Menu.module.css"
import InputOutlinedIcon from '@mui/icons-material/InputOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import BubbleChartOutlinedIcon from '@mui/icons-material/BubbleChartOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const Menu = ({selectedMenu, setSelectedMenu}) => {


  // const list = ["Input", "Select", "Layout", "Filter", "Cluster"]

  const list = [
    {icon: <InputOutlinedIcon style={{fontSize:"20px"}} />, text:"Input"},
    {icon: <InfoOutlinedIcon style={{fontSize:"20px"}} />, text:"Select"},
    {icon: <DragIndicatorOutlinedIcon style={{fontSize:"20px"}} />, text:"Layout"},
    {icon: <FilterAltOutlinedIcon style={{fontSize:"20px"}} />, text:"Filter"},
    {icon: <BubbleChartOutlinedIcon style={{fontSize:"20px"}} />, text:"Cluster"},
    {icon: <FileDownloadOutlinedIcon style={{fontSize:"20px"}} />, text:"Export"},
  ]
  return(
    <div style={{display:"flex",justifyContent:"center", marginBottom: "20px"}}>
      <div className={styles.container}>

        {list.map((item, index) => (
          <div 
            key={index} 
            onClick={()=>setSelectedMenu(item.text)}
            className={`${styles.item} ${selectedMenu===item.text && styles.selected}`}
          >
            {item.icon}
            <h4>{item.text}</h4>
          </div>
        ))}
    
      </div>
    </div>
  )
}

export default Menu