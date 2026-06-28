"use client";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { auth, database } from "../firebase/config";
import { ref, set } from "firebase/database";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  const router = useRouter();
  const [signInWithEmailAndPassword, user, loading] =
    useSignInWithEmailAndPassword(auth);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!email.trim() || !senha.trim()) return;

    const res = await signInWithEmailAndPassword(email.trim(), senha);

    if (res?.user) {
     
      await set(ref(database, "UsuarioAtivo"), res.user.uid);

      sessionStorage.setItem("user", "true");
      setEmail("");
      setSenha("");
      router.push("/control");
    }
  };

  return (
    <div className="p-5 min-h-screen flex items-center bg-image justify-center">
      <div className="w-96 shadow-xl rounded-lg p-10 bg-gray-600">
        <FaArrowLeft
          onClick={() => router.push("/")}
          size={20}
          className="cursor-pointer mb-4"
        />

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
            required
          />

          <button className="w-full p-3 bg-cyan-600 rounded text-white hover:bg-cyan-500 cursor-pointer mb-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed">
            Login
          </button>
        </form>

        <p className="text-center text-white">Não tem uma conta?</p>
        <p
          onClick={() => router.push("/cadastro")}
          className="font-bold text-center cursor-pointer text-lg"
        >
          Cadastrar-se
        </p>
      </div>
    </div>
  );
}