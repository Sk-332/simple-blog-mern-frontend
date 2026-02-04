import {Link} from "react-router-dom";

export default function Navbar(){
    return(
        <nav style={styles.nav}>

        <h2 style={styles.logo}>Simple Blog</h2>

        <div style={styles.links}>
         <Link style={styles.link} to= "/">
           Home
         </Link>
         <Link style={styles.link} to= "/create">
          Create Blog
         </Link>
         
        </div>
        </nav>
    );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#111",
    color: "white",
    alignItems: "center",
  },
  logo: { margin: 0 },
  links: { display: "flex", gap: "15px" },
  link: { color: "white", textDecoration: "none", fontSize: "16px" },
};