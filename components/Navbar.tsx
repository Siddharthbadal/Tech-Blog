"use client"

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const {status} = useSession()


  return (
    <div className="flex justify-between pb-4 border-b mb-4">

        <div>
            <Link href={"/"}>
                <h1 className="text-4xl text-sky-900 font-bold tracking-wider">
                    Tech Blog
                </h1>
            </Link>
            <p className="text-md tracking-wider font-medium" >
                <br />
                Read, Write and share.</p>
        </div>

        {
            status === "authenticated" ? (
                <div>
                    <button 
                        onClick={()=> signOut()}
                        className="btn">
                        Sign Out
                    </button>
                </div>
            ) :
            <div className="flex items-center">
                <Link className="btn" href={'/signin'}>SignIn</Link>
            </div>
        }

        

    </div>
  )
}
