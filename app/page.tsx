import Link from "next/link";

export default function Home() {
  return (
    <div>
      Hello NextJs
      Blog Page <Link href={'/blogs'}>Blogs</Link>
    </div>
  );
}
