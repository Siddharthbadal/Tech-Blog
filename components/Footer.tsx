import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-center py-3 border-t">
        📝 Created by &nbsp;
            <Link href={'https://www.linkedin.com/in/siddharthbadal/'} target="_blank"
            className="font-semibold hover:underline delay-300"
            > Siddharth</Link>
    </footer>
  )
}
