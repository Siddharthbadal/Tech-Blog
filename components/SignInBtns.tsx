import Image from "next/image";
import Button from "./Button";

export default function SignInBtns() {
  return (
    <>
        <h1 className="text-center mt-9">SignIn</h1>
        <div className="mt-4 p-4 flex flex-col justify-center items-center">
            <Button img="/github.png" text={'Sign In with Github'}/>
            <Button img="/google.png" text={'Sign In with Google'}/>
            {/* <button className="flex items-center border p-4 rounded-full gap-4 hover:bg-sky-100 ">
                <span>
                    <Image  src={'/github.png'}
                    width={30}
                    height={30}
                    alt="github"
                    />
                </span>
                Sign In with Github
            </button> */}
        </div>
    </>
  )
}