import { categoriesData } from "@/data/posts"
import Link from "next/link"

export default function CategoriesList() {

  return (
    <div className="flex gap-2 text-sm flex-wrap">
           { categoriesData && categoriesData.map((category)=>(
                <Link className="px-3 py-1 rounded-md bg-sky-900 text-white/80 cursor-pointer font-semibold" href={`/categories/${category.name}`} key={category.id}>
                    {category.name}
                </Link>
           ))}
    </div>
  )
}
