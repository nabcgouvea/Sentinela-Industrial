"use client"
import logo from "@/app/assets/logo.png"
import { useRouter } from "next/navigation";
export default function Home(){

  const router = useRouter();
  return(
     <div className="w-screen h-screen flex justify-center bg-image flex-col gap-4 items-center">
      <div className="flex justify-center items-center">
        <img className="h-[100%] " src={logo.src} alt="" />
      </div>

      <div className="flex flex-col justify-center items-center gap-4">
        <button onClick={()=>router.push('/login')} className=" w-56 p-3 bg-cyan-600 hover:bg-cyan-500 hover:border-1 hover:border-white text-black rounded-xl">Login</button>
        <button onClick={()=> router.push('/cadastro')} className="w-56 p-3 bg-cyan-600 hover:border-1 hover:border-white text-black rounded-xl">Cadastre-se</button>
      </div>
     </div>
  );
}