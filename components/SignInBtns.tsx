"use client"

import Image from "next/image";
import Button from "./Button";
import { signIn } from "next-auth/react";


export default function SignInBtns() {
  const handleGithubSignIn= ()=>signIn('github');
  const handleGoogleSignIn= (e:any)=>{
    e.preventDefault();
    signIn('google');
  }

  return (
    <>
        <h1 className="text-center mt-9">SignIn</h1>
        <div className="mt-4 p-4 flex flex-col justify-center items-center">
            <Button 
              img="/github.png" 
              text={'Sign In with Github'}
              onClick={handleGithubSignIn}
              />
            <Button 
              img="/google.png" 
              text={'Sign In with Google'}
              onClick={handleGoogleSignIn}
              />

              
            
        </div>
    </>
  )
}
