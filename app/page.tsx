import Link from "next/link";
import LikeButton from "./ui/LikeButton";

export default function Home() {
  return (
    <div>
      Hello NextJs
      Blog Page <Link href={'/blogs'}>Blogs</Link>
      <LikeButton />
    </div>
  );
}
