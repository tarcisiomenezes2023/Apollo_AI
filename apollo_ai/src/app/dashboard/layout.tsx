import ChatList from "../components/chatList/page";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-2.5 pt-5 h-full">
      <div className="flex-4 mr-16"> <ChatList /> </div>
      <main className="flex-1 bg-[#001F3F]">{children}</main>  
    </div>
  );
}