import { TbTemperatureCelsius } from "react-icons/tb";
import { LiaTemperatureLowSolid } from "react-icons/lia";
import { FaRegLightbulb } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Dashboard() {
  const [dados, setDados] = useState<any>(null);

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    let leiturasRef: ReturnType<typeof ref> | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      // Remove listener antigo
      if (leiturasRef) off(leiturasRef);

      if (user) {
        // Agora sempre lê a leitura 1
        leiturasRef = ref(db, `Sensores/Leituras`);

        onValue(leiturasRef, (snapshot) => {
          if (snapshot.exists()) {
            setDados(snapshot.val());
          } else {
            setDados(null);
          }
        });
      } else {
        setDados(null);
      }
    });

    return () => {
      if (leiturasRef) off(leiturasRef);
      unsubscribeAuth();
    };
  }, []);

  return (
    <div className="w-full">
      <p className="text-6xl text-gray-900 font-bold mb-10">Dashboard</p>

      <div className="flex flex-wrap gap-10">
        {/* Temperatura */}
        <div className="bg-white p-6 rounded-xl w-[400px] flex flex-col text-center gap-4 shadow-xl text-black">
          <p className="text-2xl border-b-1 border-gray-200 p-4 gap-3 flex items-center justify-center">
            <LiaTemperatureLowSolid size={30} /> Temperatura
          </p>
          <p className="flex items-center justify-center text-5xl">
            {dados?.temp ?? '---'} <TbTemperatureCelsius size={50} />
          </p>
        </div>

        {/* Luminosidade */}
        <div className="bg-white p-6 rounded-xl w-[400px] flex flex-col text-center gap-4 shadow-xl text-black">
          <p className="text-2xl border-b-1 border-gray-200 p-4 gap-3 flex items-center justify-center">
            <FaRegLightbulb size={30} color="yellow"/> Luminosidade
          </p>
          <p className="flex items-center justify-center text-5xl">
            {dados?.ldr ?? '---'} lux
          </p>
        </div>

        {/* Umidade*/} 
        <div className="bg-white p-6 rounded-xl w-[400px] flex flex-col text-center gap-4 shadow-xl text-black">
          <p className="text-2xl border-b-1 border-gray-200 p-4 gap-3 flex items-center justify-center">
            <WiHumidity size={35} color="blue"/> Umidade
          </p>
          <p className="flex items-center justify-center text-5xl">
            {dados?.umid ?? '---'}%
          </p>
        </div>
        {/* Limite de Temperatura*/} 
        <div className="bg-white p-6 rounded-xl w-[400px] flex flex-col text-center gap-4 shadow-xl text-black">
          <p className="text-2xl border-b-1 border-gray-200 p-4 gap-3 flex items-center justify-center">
          <LiaTemperatureLowSolid size={30} color="red"/> Limite de Temperatura
          </p>
          <p className="flex items-center justify-center text-5xl">
            {dados?.limite_max_temp ?? '---'}<TbTemperatureCelsius size={50} />
          </p>
        </div>
      
      </div>
    </div>
  );
}