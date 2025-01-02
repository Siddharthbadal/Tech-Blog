import CategoriesList from "@/components/CategoriesList";
import Post from "@/components/Post";
import { postsData } from "@/data/posts"

const getPosts = async (): Promise<TPost[] | null> => {
    try{
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`,{
            cache: "no-store"
        });
        if(res.ok){
            const posts = await res.json();
            return posts;
        }
    } catch(error) {
        console.log(error)
    }
    return null;
}


export default async function Home() {

    const posts = await getPosts();
  return (
      <>
          <CategoriesList />
          
          {
              posts &&  posts.length > 0 ?
              (posts.map(post => 
                <Post  
                    key={post.id} 
                    id={post.id}
                    author={post.authorName.name}
                    authorEmail={post.authorEmail}
                    date={post.createdAt}
                    thumbnail={post.imageUrl}
                    category={post.categoryName}
                    title = {post.title}
                    content={post.content}
                    links={post.links || []}
                
                />
            ))              
              : 
              (<div>No Posts to display</div>)
          
          }
        
      </>
  );
}
