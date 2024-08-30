// Header.js

import Link from "next/link";

const Header = ({ onDownload }) => {
  return (
    <div style={{
      display: "flex",
      justifyContent: 'space-between',
      alignItems: "center",
      padding: "15px 20vw",
      borderBottom: "2px solid rgb(200,200,200)",
    }}>
      <h2 style={{ fontWeight: "normal" }}>
        Biological Network Visualization
      </h2>

      <div style={{ display: "flex" }}>
        <Link href="/">
          <h5 style={{ fontWeight: "normal", fontSize: "14px" }}>Home</h5>
        </Link>
        <button
          style={{ fontWeight: "normal", marginLeft: "30px", fontSize: "14px", border: "none", background: "none", cursor: "pointer", }}
          onClick={onDownload}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Header;
