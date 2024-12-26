import Post from "@/components/Post";
import { postsData } from "@/data/posts"
import Link from "next/link";


export default function page() {
  return (
    <div>
        <h1>My Posts</h1>
        {
                      postsData &&  postsData.length > 0 ?
                      (postsData.map(post => 
                        <Post  
                            key={post.id} 
                            id={post.id}
                            author={post.author}
                            authorEmail={"email@email.com"}
                            date={post.datepublished}
                            thumbnail={post.thumbnail}
                            category={post.category}
                            title = {post.title}
                            content={post.content}
                            links={post.links || []}
                        
                        />
                    ))              
                      : 
                      (
                      <div className="py-6">Create a Post today.
                      <br />
                        <Link href={"/create-post"} className="underline">Create Post</Link>
                        </div>
                    )

                  
                  }
    </div>
  )
}
