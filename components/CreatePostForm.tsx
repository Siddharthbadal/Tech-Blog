"use client"

import { TCategory } from "@/app/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function CreatePostForm() {
    const [links, setLinks] = useState<string[]>([]);
    const [linkInput, setLinkInput] =  useState("");

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [categories, setCategories] = useState<TCategory[]>([])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [imageUrl, setimageUrl] = useState("")
    const [publicId, setPublicId] = useState("")
    const [error, setError] = useState("")

    const router = useRouter()

    useEffect(()=>{
        const fetchAllCategories = async () =>{
            const res = await fetch("api/categories");
            const categoryNames = await res.json();
            setCategories(categoryNames)
        };
        fetchAllCategories();
    }, [])

    const addLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        if(linkInput.trim() !== ""){
            setLinks((prev)=>[...prev, linkInput]);
            setLinkInput('')
        }
    }

    const deleteLink = (index:number) =>{
        setLinks((prev) => prev.filter((_,i)=> i !=index));
    }

    const handleFormSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
   

    if(!title || !content) {
        setError("Title and Content required!")
        return;
    }
    try{
            const res = await fetch("api/posts/", {
                method:"POST",
                headers: {
                    "Content-type":"application/json"
                },
                body: JSON.stringify({
                    title,
                    content,
                    links,
                    selectedCategory,
                    imageUrl,
                    publicId
                }),
            });

            if (res.ok){
                router.push("/dashboard")
            }
            
            

    }catch (error){

    }
};

  return (
    <div>
        <h2>Create Post</h2>
        <form
            onSubmit={handleFormSubmit} 
            className="flex flex-col gap-2">
            <input type="text"
                placeholder="Title"
                onChange={e => setTitle(e.target.value)}
            />
            <textarea 
                placeholder="Content"
                onChange={e => setContent(e.target.value)}
                >

            </textarea>
            { links && links.map((link, i)=> (
                <div 
                    key={i}
                    className="flex items-center gap-4"
                >
                    <span className="">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6">
                        <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
                        <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
                    </svg>

                    </span>
                    <Link 
                        href={link}
                        className="link text-xl"    
                    >                    
                        {link}                    
                    </Link>

                    <span 
                        className="cursor-pointer"
                        onClick={()=> deleteLink(i)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" clipRule="evenodd" />
                        </svg>
                    </span>
                </div> 
            ))}
            <div className="flex gap-2">
                <input 
                    type="text" 
                    placeholder="Paste the Link and add" className="flex-1"
                    onChange={e=> setLinkInput(e.target.value)}
                    value={linkInput}
                    />
                <button 
                    className="btn flex gap-2 items-center"
                    onClick={addLink}
                    >
                <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                </svg>
                </span>
                        Add                    
                </button>
            </div>
            <select 
                className="p-3 rounded-md border appearance-none"
                onChange={e => setSelectedCategory(e.target.value)}
                >
                <option value="" className="text-md">Select a category</option>
                {
                    categories && categories.map(category =>(
                        <option 
                            value={category.categoryName}
                            key={category.id}>
                                {category.categoryName}
                        </option>
                    ))
                }
            </select>
            <button type="submit" className="primary-btn">
                Create Post 
            </button>
            {error && 
                <div 
                    className="p-2 text-red-500 font-semibold">
                        { error }
                </div>
            }
        </form>

    </div>
  )
}
