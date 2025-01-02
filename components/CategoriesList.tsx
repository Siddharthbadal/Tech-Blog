import Link from "next/link"
import { TCategory } from "@/app/types"

const getCategories = async(): Promise<TCategory[] | null>=>{
  try{
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`)
      if(res.ok){
        const categories = await res.json()
        return categories
      }
  } catch (error){
    console.log("categories not found")
  }
  return null;
}

export default async function CategoriesList() {
  const categoriesData = await getCategories();

  return (
    <div className="flex gap-2 text-sm flex-wrap">
           { categoriesData && categoriesData.map((category)=>(
                <Link className="px-3 py-1 rounded-md bg-sky-900 text-white/80 cursor-pointer font-semibold" href={`/categories/${category.categoryName}`} key={category.id}>
                    {category.categoryName}
                </Link>
           ))}
    </div>
  )
}
 