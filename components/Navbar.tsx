import Link from "next/link";
import Image from "next/image"; 
import homeLogo from "../assets/homelogo.png"; 
import searchLogo from "../assets/searchlogo.png"; 
import savedLogo from "../assets/savedlogo.png"; 
import reviewsLogo from "../assets/reviewlogo.png"; 
import watchedLogo from "../assets/watchedlogo.png"; 
import aboutLogo from "../assets/aboutlogo.png";
export default function Navbar() { 
  return ( 
  <nav> 
    <Link href="/"> 
    <Image src={homeLogo} alt="Home" width={24} height={24} /> 
    Home 
    </Link> 
    <Link href="/search"> 
    <Image src={searchLogo} alt="Search" width={24} height={24} /> 
    Search 
    </Link> 
    <Link href="/saved"> 
    <Image src={savedLogo} alt="Saved" width={24} height={24} /> 
    Saved 
    </Link> 
    <Link href="/reviews"> 
    <Image src={reviewsLogo} alt="Reviews" width={24} height={24} /> 
    Reviews 
    </Link> 
    <Link href="/watched"> 
    <Image src={watchedLogo} alt="Watched" width={24} height={24} /> 
    Watched 
    </Link> 
    <Link href="/about"> 
    <Image src={aboutLogo} alt="About" width={24} height={24} />
    About 
    </Link> 
    </nav> ); 
    }
