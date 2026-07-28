import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link> |{" "}
      <Link href="/search">Search</Link> |{" "}
      <Link href="/saved">Saved</Link> |{" "}
      <Link href="/reviews">Reviews</Link> |{" "}
      <Link href="/watched">Watched</Link> |{" "}
      <Link href="/about">About</Link>
    </nav>
  );
}

//or vertical 
/*export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/search">Search</Link></li>
        <li><Link href="/saved">Saved Movies</Link></li>
        <li><Link href="/reviews">Reviews</Link></li>
        <li><Link href="/watched">Watched</Link></li>
        <li><Link href="/about">About</Link></li>
      </ul>
    </nav>
  );
}*/