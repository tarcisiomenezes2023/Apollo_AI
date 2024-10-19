import ChatList from "../components/chatList/page";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-2.5 pt-5 h-full">
      <div className="flex-4"> <ChatList /> </div>
      <main className="flex-1 bg-[#030a2e]">{children}</main>  
    </div>
  );
}