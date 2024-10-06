import Link from 'next/link';
import React from 'react';

const ChatList = () => {
  return (
    <div className='flex flex-col h-full'>
      <span className='text-xl font-bold mb-4'>DASHBOARD</span>
      <Link href="/dashboard" className='p-2.5 rounded-md text-green-500'>
        New Chat
      </Link>
      <Link href="/" className='p-2.5'>Explore Apollo</Link>
      <Link href="/" className='p-2.5'>Create your dashboard</Link>
      <hr className='border-none h-0.5 bg-[#ffffff] opacity-10 rounded-md my-5' />
      <span className='font-semibold text-lg mb-2.5'>CHATS</span>
      <div className="flex flex-col overflow-auto">
        {Array(11).fill('my chat').map((chat, index) => (
          <span key={index} className='p-2.5'>{chat}</span>
        ))}
      </div>
      <hr className="my-5" />
      <div className="mt-auto flex items-center gap-3">
        <img src="/logo3.png" alt="Logo" className='w-7 h-7' />
        <div className="flex flex-col">
        </div>
      </div>
    </div>
  );
};

export default ChatList;