"use client"
import {motion} from 'framer-motion'


export default function Loading(){
    return(
        <div className='w-full h-screen flex flex-col items-center justify-center bg-gray-100'>
            {/* Spinner */}
         <motion.div
         className='w-16 h-16 border-4 border-gray-300 border-t-blue-50 rounded-full'
         animate={{rotate: 180}}
         transition={{repeat: Infinity, duration: 1, ease: 'linear'}}
         />

         <p className='mt-6 text-gray-600 text-xl font-medium animate-pulse'>Aguarde um momento</p>

          </div>
    );
}