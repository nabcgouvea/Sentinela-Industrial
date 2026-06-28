"use client"
import { useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { auth } from "../firebase/config";
import { getDatabase, ref, set } from "firebase/database";

export default function Cadastro(){
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [nome, setNome] = useState<string>('');
    const [sobrenome, setSobrenome] = useState<string>('');
    const router =  useRouter();
    const [createUserWithEmailAndPassword, user, loading] = useCreateUserWithEmailAndPassword(auth);
    

    const handleSignup = async (e?: React.FormEvent) => {
        if (e) {
            e.preventDefault();
        }

        try {
            const res = await createUserWithEmailAndPassword(email, senha);
            console.log(res);

            if (res?.user) {
                try {
                    // Salvar nome e sobrenome no Firebase
                    const db = getDatabase();
                    const perfilRef = ref(db, `Usuarios/${res.user.uid}/Perfil`);
                    await set(perfilRef, {
                        nome: nome.trim(),
                        sobrenome: sobrenome.trim()
                    });

                    sessionStorage.setItem('user', 'true');

                    setEmail('');
                    setSenha('');
                    setNome('');
                    setSobrenome('');
                    router.push('/login');
                } catch (dbError) {
                    console.error('Erro ao salvar perfil:', dbError);
                }
            }
        } catch (e: any) {
            console.error('Erro ao criar conta:', e);
        }
    }

    return(
      <div className="p-5 min-h-screen flex items-center justify-center bg-image">
        <div className="bg-gray-600 p-10 rounded-lg shadow-xl w-96">
        <FaArrowLeft onClick={()=>router.push('/')} size={20} className="cursor-pointer mb-4"/>

        <form onSubmit={handleSignup}>
          <input
            type="text" 
            placeholder="Nome"
            value={nome}
            onChange={(e)=>setNome(e.target.value)}
            disabled={loading}
            className='w-full p-3 bg-gray-700 rounded outline-none text-white placeholder-gray-500 mb-5 disabled:opacity-50'
            required
          />

          <input
            type="text" 
            placeholder="Sobrenome"
            value={sobrenome}
            onChange={(e)=>setSobrenome(e.target.value)}
            disabled={loading}
            className='w-full p-3 bg-gray-700 rounded outline-none text-white placeholder-gray-500 mb-5 disabled:opacity-50'
            required
          />

          <input
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            disabled={loading}
            className='w-full p-3 bg-gray-700 rounded outline-none text-white placeholder-gray-500 mb-5 disabled:opacity-50'
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e)=>setSenha(e.target.value)}
            disabled={loading}
            className='w-full p-3 bg-gray-700 rounded outline-none text-white placeholder-gray-500 mb-5 disabled:opacity-50'
            required
          />

          <button 
            type="submit"
            disabled={loading} 
            className="w-full p-3 bg-cyan-600 rounded text-white hover:bg-cyan-500 cursor-pointer mb-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cadastrar-se
          </button>
        </form>

        <p className="text-white text-md text-center mt-2">Já tem uma conta?</p>
        <p onClick={()=>router.push('/login')} className="font-bold text-center cursor-pointer text-lg">Fazer Login</p>
        </div>
      </div>
    ); 
}