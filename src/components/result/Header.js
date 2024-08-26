import Link from "next/link"



const Header = () => {

  return(
    <div style={{
      display:"flex",
      justifyContent:'space-between',
      alignItems:"center",
      padding:"15px 20vw",
      borderBottom:"2px solid rgb(200,200,200)",
      // width:"100vw"
    }}>
      <h2 style={{fontWeight:"normal"
      }}>Biological Network Visualization</h2>

      
      <div style={{display:"flex"}}>
        <Link href="/">
          <h5 style={{fontWeight:"normal", fontSize:"14px"}}>Home</h5>
        </Link>
        <Link href="/">
          <h5 style={{fontWeight:"normal", marginLeft:"30px", fontSize:"14px"}}>Download</h5>
        </Link>
      </div>
    </div>
  )
}

export default Header