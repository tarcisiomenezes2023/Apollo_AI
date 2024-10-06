import NewPrompt from "../components/newPrompt/page";

export default function DashboardPage() {
  return (
    <div className="h-full flex flex-col items-center">
      <div className="flex-1 flex flex-col items-center w-2.5/5 gap-12">
        <div className="flex items-center gap-5 opacity-20">
          <img src="/logo3.png" alt="logo" className="w-16 h-16" />
          <h1 className="text-6xl bg-gradient-to-r from-[#33ff28] to-[#e55571] bg-clip-text text-transparent font-bold">
            Apollo
          </h1>
        </div>
        <div className="w-full flex items-center justify-between gap-12">
          <div className="flex-1 flex flex-col gap-2.5 font-light text-sm p-5 border-2 border-[#555] rounded-2xl">
            <img src="/chat.png" alt="Chat Icon" className="w-10 h-10 object-cover" />
            <span>Create a New Chat</span>
          </div>
          <div className="flex-1 flex flex-col gap-2.5 font-light text-sm p-5 border-2 border-[#555] rounded-2xl">
            <img src="/image.png" alt="Image Icon" className="w-10 h-10 object-cover" />
            <span>Analyze Images</span>
          </div>
          <div className="flex-1 flex flex-col gap-2.5 font-light text-sm p-5 border-2 border-[#555] rounded-2xl">
            <img src="/code.jpg" alt="Code icon" className="w-10 h-10 object-cover" />
            <span>Analyze Code</span>
          </div>
        </div>
      </div>
      <div className="">
        <NewPrompt />
      </div>
    </div>
  );
}