import Image from "next/image"
import Link from "next/link"
import DeleteButton from "./DeleteButton";

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
    const isEditable = true;

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
            <p className="content">{content}</p>
            {
                links && (
                    <div className="my-4 flex flex-col gap-2">
                        {links.map((link, i)=>(
                            <div key={i}
                            className="flex gap-2 items-center"
                            >
                                 🔗 &nbsp;
                                <Link href={link} className="link" target="_blank">
                                    Read More
                                </Link>
                            </div>
                        ))}
                    </div>
                )
            }

            {
                isEditable && (
                    <div className="flex flex-row gap-2 py-2 px-4 rounded-sm w-fit">
                        <Link href={`/edit-post/${id}`}
                            className="text-gray-600 font-semibold tracking-wider border border-gray-200 px-2 hover:bg-sky-50 rounded-sm"
                        >
                           
                                Edit
                           
                        </Link>
                        <DeleteButton   />
                    </div>
                )
            }



    </div>
  )
}
