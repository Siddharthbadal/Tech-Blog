"use client"

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
    const {status, data:session} = useSession()
    const [isPopUpVisible, setIsPopupVisible] = useState<boolean|null>(false)
    const popupRef = useRef<HTMLDivElement | null >(null)

    const handleProfilePopUp = (e:MouseEvent | any)=>{
        e.preventDefault();
        setIsPopupVisible(!isPopUpVisible)
    }

    useEffect(()=>{
        const handleProfilePopUp = (e:MouseEvent) =>{
            if (popupRef.current && !popupRef.current.contains(e.target as Node)){
                setIsPopupVisible(false); 
            }};

            document.addEventListener("click", handleProfilePopUp);
            if (!isPopUpVisible){
                document.removeEventListener("click", handleProfilePopUp);
            }
            return ()=>{
                document.removeEventListener("click", handleProfilePopUp);
            };
        
    }, [isPopUpVisible])

    




  return (
    <div className="flex justify-between pb-4 border-b mb-4 relative text-gray-600">

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
        <>                
            <div    
                ref={popupRef}
                className={`absolute z-30 right-0 top-20 bg-white p-6 shadow-lg rounded-md flex flex-col gap-2 text-right min-w-[160px] 
                ${isPopUpVisible ? "flex" : "hidden"}`}
            >
                <div className="font-semibold">         
                    {session?.user?.name}
                </div>
                <div className="font-semibold text-sm">         
                    {session?.user?.email}
                </div>
                <Link 
                    href={'/dashboard'}
                    onClick={()=>setIsPopupVisible(false)}
                    className="font-semibold hover:underline"
                >
                    Dashboard
                    </Link>
                <Link 
                    href={'/create-post'}
                    onClick={()=>setIsPopupVisible(false)}
                    className="font-semibold hover:underline"
                >
                    Create Post
                </Link>
                <button 
                    onClick={()=> signOut()}
                    className="btn">
                    Sign Out
                </button>
            </div>
            <div className="hidden md:flex gap-6 items-center">
                <Link 
                    href={'/create-post'}
                    className="flex gap-1 justify-center items-center"
                >
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </span>
                    <span className="text-xl font-semibold">
                        Create Post</span>
                </Link>
            <Image 
                src={session?.user?.image || ""}
                width={36}
                height={28}
                alt='Profile'
                className="rounded-full cursor-pointer"
                onClick={handleProfilePopUp}
                />
            </div>
        </>
    ) : (
        <div className="flex items-center">
            <Link className="btn" href={'/sign-in'}>SignIn</Link>
        </div>
    )
            
            
        }

        

    </div>
  )
}
