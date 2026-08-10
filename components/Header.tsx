import styles from "./Header.module.css"; 
import Image from "next/image"; 
import Mlogo from "../assets/logo.png"; 
export default function Header() { 
  return ( 
  <header className={styles.header}> 
  <div className={styles.title}> 
    <span>FrameFinder</span> 
    <div className={styles.logoCircle}> 
      <Image src={Mlogo} 
      alt="FrameFinder Logo"
      width={35} height={35} 
      className={styles.headerLogo} 
      /> 
    </div>
  </div>
  </header> );
}
//Changed header with added logo