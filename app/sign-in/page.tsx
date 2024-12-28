import SignInBtns from "@/components/SignInBtns";
import { getServerSession } from "next-auth/next";

import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function SignIn() {
    const session= await getServerSession(authOptions);
    // logged in user wont access sign in page
    if(session){
      redirect("/dashboard");
    }

    return (
      <SignInBtns />
    )
}
