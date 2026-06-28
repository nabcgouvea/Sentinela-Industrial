"use client"
import logo from '../assets/logo.png'
import { signOut } from 'firebase/auth';
import{auth} from '../firebase/config'
import { useRouter } from 'next/navigation';
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { set } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDatabase, ref, get } from 'firebase/database';


import Sobre from '../components/Sobre'
import Dashboard from '../components/Dashboard';
import Controle from '../components/Controle';
import QuemSomos from '../components/QuemSomos';

export default function Control(){
  const router = useRouter();
  const [menu, setMenu] = useState<string>('Sobre');

  const [user, loading] = useAuthState(auth);
  const [nome, setNome] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(()=>{
     if(!loading){
      const userSession = sessionStorage.getItem('user');

      if(!user && !userSession){
         router.push('/login')
      }

      else{
         setChecked(true);

         if(user){
            const db = getDatabase();
            const perfilRef = ref(db, `Usuarios/${user.uid}/Perfil`);
            get(perfilRef).then(snapshot => {
               if(snapshot.exists()){
                  const perfil = snapshot.val()
                  setNome((perfil.nome || '') + "  " + (perfil.sobrenome || ' '))
               }
            })
         }
      }
     }
  }, [user, loading, router])

  // Mostrar loading enquanto verifica autenticação
  if(loading){
    return (
      <main className='w-screen min-h-screen flex items-center justify-center bg-white'>
        <p className='text-gray-900 text-xl'>Carregando...</p>
      </main>
    )
  }

   return(
      <main className='w-screen min-h-screen flex text-white bg-white'>
         <div className='bg-cyan-900 w-[20%] px-10 py-20 flex flex-col items-center justify-between'>
         <div>
            <img src={logo.src} alt="" className='w-[100%] mt-30' />
           <ul className='w-full'>
            <li onClick={()=>setMenu('Sobre')} className={menu == 'Sobre'? 'gap-4 border-r-red-600 text-xl p-4 bg-blue-800 border-r-10 ml-10 items-center rounded-lg hover: transition-all hover:duration-600 cursor-pointer':'hover:bg-blue-800 cursor-pointer rounded-lg text-xl p-4 flex gap-4 items-center hover:transition-all hover:duration-500'}>Sobre</li>
            <li onClick={()=>setMenu('Dashboard')} className={menu == 'Dashboard'? 'gap-4 border-red-600 text-xl p-4 bg-blue-800 border-r-10 ml-10 items-center rounded-lg hover: transition-all hover:duration-600 cursor-pointer':'hover:bg-blue-800 cursor-pointer rounded-lg text-xl p-4 flex gap-4 items-center hover:transition-all hover:duration-500'}>Dashboard</li>
            <li onClick={()=>setMenu('Controle')} className={menu == 'Controle'? 'gap-4 border-r-red-600 text-xl p-4 bg-blue-800 border-r-10 ml-10 items-center rounded-lg hover: transition-all hover:duration-600 cursor-pointer':'hover:bg-blue-800 cursor-pointer rounded-lg text-xl p-4 flex gap-4 items-center hover:transition-all hover:duration-500'}>Controle</li>
            <li onClick={()=>setMenu('Quem Somos')} className={menu == 'Quem Somos'? 'gap-4 border-r-red-600 text-xl p-4 bg-blue-800 border-r-10 ml-10 items-center rounded-lg hover: transition-all hover:duration-600 cursor-pointer':'hover:bg-blue-800 cursor-pointer rounded-lg text-xl p-4 flex gap-4 items-center hover:transition-all hover:duration-500'}>Quem somos</li>
         </ul>
         </div>

         <button onClick={()=>{
            signOut(auth);
            sessionStorage.removeItem('user');
            router.push('/login')
         }} className='bg-red-700 hover:bg-red-600 rounded w-30 h-10 items-center justify-center flex mt-10 hover:font-bold cursor-pointer'>Logout</button>
         </div>

         <div className='w-[80%] purple-100 p-10'>
            <div className='text-gray-900 h-20 p-10 flex justify-end items-center gap-4'>
            <p className='font-bold  items-center justify-center text-xl p-4 rounded-lg'><FaUser size={30} color='#000'/> {nome || 'Nome do Usuario'}</p>
            </div>

            {/* Componentes do painel */}

            <div>
               {menu == 'Sobre'  && (
                  <Sobre />
               )}

               {menu == 'Dashboard'  &&(
                  <Dashboard />
               )}

               {menu == 'Controle' && (
                  <Controle />
               )}

               {menu == 'Quem Somos' && (
                  <QuemSomos />
               )}
            </div>
         </div>
      </main>
   );
}