"use client";
import { useState, useEffect } from "react";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, set } from "firebase/database";
import Loading from "../components/loading";

export default function Controle() {
  const [buzzer, setBuzzer] = useState(false);
  const [ledazul, setLedazul] = useState(false);
  const [ledvermelho, setLedvermelho] = useState(false);

  const [useruid, setUseruid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    // Aguarda o Firebase carregar o usuário
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUseruid(user.uid);

        const db = getDatabase();
        const buzzerRef = ref(db, `controles/Buzzer`);
        const ledazulRef = ref(db, `controles/LedAzul`);
        const ledvermelhoRef = ref(db, `controles/LedVermelho`);

        onValue(buzzerRef, (snapshot) => {
          if (snapshot.exists()) setBuzzer(snapshot.val());
        });

        onValue(ledazulRef, (snapshot) => {
          if (snapshot.exists()) setLedazul(snapshot.val());
        });

        onValue(ledvermelhoRef, (snapshot) => {
          if (snapshot.exists()) setLedvermelho(snapshot.val());
        });

        setLoading(false);
      } else {
        setUseruid(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <Loading />;

  function toggleBuzzer() {
    if (!useruid) return;
    const db = getDatabase();
    const novoValor = !buzzer;
    set(ref(db, `controles/Buzzer`), novoValor);
  }

  function toggleleda() {
    if (!useruid) return;
    const db = getDatabase();
    const novoValor = !ledazul;
    set(ref(db, `controles/LedAzul`), novoValor);
  }

  function toggLedver() {
    if (!useruid) return;
    const db = getDatabase();
    const novoValor = !ledvermelho;
    set(ref(db, `controles/LedVermelho`), novoValor);
  }

  return (
    <div className="w-full p-10">
      <p className="text-6xl text-gray-900 font-bold mb-10">Controle</p>

      <div className="flex flex-wrap gap-10">
        <div className={`${buzzer ? "bg-green-600" : "bg-red-600"} p-6 rounded-xl w-[250px] flex flex-col items-center gap-4 shadow-xl`}>
          <p className="text-2xl text-white font-semibold">Buzzer</p>
          <button className="text-6xl text-white" onClick={toggleBuzzer}>
            {buzzer ? <BsToggleOn className="cursor-pointer"/> : <BsToggleOff className="cursor-pointer"/>}
          </button>
          <p>{buzzer ? "Ativo" : "Inativo"}</p>
        </div>

        <div className={`${ledazul ? "bg-green-600" : "bg-red-600"} p-6 rounded-xl w-[250px] flex flex-col items-center gap-4 shadow-xl`}>
          <p className="text-2xl text-white font-semibold">Led Azul</p>
          <button className="text-6xl text-white" onClick={toggleleda}>
            {ledazul ? <BsToggleOn className="cursor-pointer"/> : <BsToggleOff className="cursor-pointer"/>}
          </button>
          <p>{ledazul ? "Ligado" : "Desligado"}</p>
        </div>

        <div className={`${ledvermelho ? "bg-green-600" : "bg-red-600"} p-6 rounded-xl w-[250px] flex flex-col items-center gap-4 shadow-xl`}>
          <p className="text-2xl text-white font-semibold">Led Vermelho</p>
          <button className="text-6xl text-white" onClick={toggLedver}>
            {ledvermelho ? <BsToggleOn className="cursor-pointer" /> : <BsToggleOff className="cursor-pointer"/>}
          </button>
          <p>{ledvermelho ? "Ligado" : "Desligado"}</p>
        </div>
      </div>
    </div>
  );
}