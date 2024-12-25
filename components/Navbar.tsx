import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-between pb-4 border-b mb-4">

        <div>
            <Link href={"/"}>
                <h1 className="text-4xl text-sky-900 font-bold tracking-wider">
                    Tech News
                </h1>
            </Link>
            <p className="text-md tracking-wider font-medium" >Curios about tech world. <br /> Write, Read and share.</p>
        </div>

        <div className="flex items-center">
            <Link className="btn" href={'/signin'}>SignIn</Link>
        </div>

    </div>
  )
}
