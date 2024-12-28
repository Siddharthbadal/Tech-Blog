import CreatePostForm from "@/components/CreatePostForm";
import { getServerSession } from "next-auth/next";

import { redirect } from "next/navigation";
import { authOptions } from "../utilis/authoptions";


export default async function CreatePost() {
  const session = await getServerSession(authOptions);
  if (!session){
    redirect('/sign-in');
  }
  return (
    <CreatePostForm />
  )
}
