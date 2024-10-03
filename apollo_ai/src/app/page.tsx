import Link from "next/link";
import "./home.css"

export default function Home() {
  return (
    <div className="flex items-center gap-24 h-full">
      <div className="flex-1 flex flex-col items-center justify-center gap-2.5 text-center">
        <h1 className="text-9xl bg-gradient-to-r from-[#33ff28] to-[#e55571] bg-clip-text text-transparent font-bold">
          Apollo
        </h1>
        <h2 className="text-2xl font-bold max-h-4/5 bg-gradient-to-r from-[#0bbe0e] to-[#9ff6c6] bg-clip-text text-transparent px-6 py-4">
          Your AI Environmental Engineer!
        </h2>
        <h3 className="text-base text-[#bbf7d0]">Making the world a greener place, one solution at a time.</h3>
        <Link href="/dashboard" className="mt-5 inline-block bg-[#1bec49] text-white font-bold py-4 px-6 rounded-full text-sm transition duration-500 hover:bg-white hover:text-[#1bec49]">
          Get Started
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center h-full">
        <div className="flex items-center justify-center bg-zinc-900 rounded-3xl w-4/5 h-3/5 relative">
          <div className="w-full h-full overflow-hidden abolute top-0 left-0 rounded-3xl">
            <div className="bg bg-cover bg-no-repeat opacity-100 w-[200%] h-full animate-slideBg"></div>
          </div>
          <img src="/Apollo2.png" alt="Apollo Bot" className="apollo w-full h-full object-contain animate-botAnimate" />
        </div>
      </div>
    </div>
  );
}