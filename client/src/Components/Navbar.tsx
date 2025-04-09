import { useState } from 'react';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex flex-row justify-between py-2 px-4 w-full text-center bg-gradient-to-b from-[#3B476F] to-[#2D3655] text-white sticky z-[100] top-0">
      <a href='/'><img className="h-12" src="/images/webcomponent/webicon.png" /></a>
      <div className='flex flex-row space-x-10'>
        <a href='/chat' className='hidden lg:block self-center hover:bg-[#2d365] hover:cursor-pointer hover:underline'>Chat</a>
        <a href='/developers' className='hidden lg:block self-center hover:bg-[#2d365] hover:cursor-pointer hover:underline'>Developers</a>
        <a href='/aboutus' className='hidden lg:block self-center hover:bg-[#2d365] hover:cursor-pointer hover:underline'>About Us</a>
      </div>

      <div className="relative lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 cursor-pointer align-middle self-center"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-[#2D3655] rounded-md shadow-lg py-1 z-20 ">
            <a
              href="/developers"
              className="block px-4 py-2 text-sm text-white hover:bg-[#1a1b24]"
            >
              Developers
            </a>
            <a
              href="/aboutus"
              className="block px-4 py-2 text-sm text-white hover:bg-[#1a1b24]"
            >
              About Us
            </a>
            <a
              href="/chat"
              className="block px-4 py-2 text-sm text-white hover:bg-[#1a1b24]"
            >
            Chat
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
