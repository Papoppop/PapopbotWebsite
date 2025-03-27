const Footer = () => {
    const year = new Date().getFullYear();

  return (
    <div className="py-2 w-full text-center bg-[#4775b9] text-white">
        Copyright © {year} | Papop-bot
    </div>
  )
}

export default Footer
