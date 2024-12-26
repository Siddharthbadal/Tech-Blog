import Image from "next/image";

export default function Button({img, text, onClick}:{img:string, text:String, onClick:any}) {
  return (
    <button className="flex items-center border p-4 rounded-full gap-4 hover:bg-sky-100 mb-2">
            <span>
                <Image  src={img}
                width={30}
                height={30}
                alt="github"
                />
            </span>
                    {text}
    </button>
  )
}
