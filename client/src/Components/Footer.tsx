const Footer = () => {
    const year = new Date().getFullYear();

  return (
    <div className="sticky bottom-0 p-1 w-full text-center bg-[#4775b9] text-white z-[100]">
        Copyright © {year} | Papop-bot
    </div>
  )
}

export default Footer
