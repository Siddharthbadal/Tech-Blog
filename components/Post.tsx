import Image from "next/image"
import Link from "next/link"

interface PostProps{
    id: string,
    author: string,
    authorEmail?: string,
    date:string,
    title: string,
    content: string,
    links?:string[],
    thumbnail?:string,
    category?: string
}

export default function Post({
    id,
    author,
    authorEmail,
    date,
    category,
    thumbnail,
    title,
    content,
    links,
}: PostProps) {
  return (
    <div className="my-4 border-b border-b-300 py-8">
            <div className="mb-2">
                <span className="font-semibold text-xl text-gray-600">
                    {author}
                </span>  &nbsp;
                <span className="text-sm">
                   on {date}
                </span>
            </div>

            <div className="w-full h-72 relative">
                {thumbnail ? 
                        (<Image src={thumbnail} alt={title} fill className="object-cover rounded-md object-center" />)
                :
                    (<Image src={'/no-image.jpg'} alt="No Image" fill className="object-cover rounded-md object-center" />)
                }
            </div>
            
            <span>
                {category && (
                    <Link href={`categories/${category}`}
                        className="bg-sky-950 text-white/80 w-fit px-4 py-1 text-sm font-semibold rounded-md mt-4 block"
                    >
                        {category}
                    </Link>
                )}
            </span>

            <h2>{title}</h2>
            <p>{content}</p>
            {
                links && (
                    <div>
                        {links.map((link, i)=>(
                            <div key={link}> 🔗 &nbsp;
                                <Link href={link} >
                                    {link}
                                </Link>
                            </div>
                        ))}
                    </div>
                )
            }


    </div>
  )
}
