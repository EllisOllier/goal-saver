import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <header>
        <nav>
          <Link href={"/login"}>Login/ Signup</Link>
        </nav>
      </header>
      
    </div>
  );
}
