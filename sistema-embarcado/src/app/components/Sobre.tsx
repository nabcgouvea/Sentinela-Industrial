import circuit from '../assets/circuit.png'

export default function Sobre() {
    return (
        <div className="w-full p-10">
            <h1 className="text-gray-900 text-6xl font-bold mb-10">Sobre</h1>
            
            <div className='flex gap-6 items-center'>
                <div className='flex-1'>
                    <img src={circuit.src} alt="" className='rounded-2xl shadow-xl w-full' />
                </div>

                <div className='flex-1 text-justify '>
                    <p className='text-base leading-relaxed text-gray-900 text-xl'>O projeto representa um sistema automatizado de segurança e controle ambiental instalado em uma fábrica ou linha de produção, com o objetivo de proteger equipamentos e funcionários contra condições inadequadas do ambiente.</p>
                </div>
            </div>
        </div>
    );
}