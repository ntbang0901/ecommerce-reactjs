import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBox from './SearchBox'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0  w-full  ${isScrolled ? 'bg-[#e5e5e5]' : 'bg-slate-200'} `}>
      <div className='flex items-center space-x-4 px-4  md:space-x-20 md:px-24'>
        <Link to={'/'}>
          <img
            className='h-[80px] cursor-pointer object-contain md:h-[100px] md:w-[100px]'
            src='/images/logo.svg'
            alt='logo'
          />
        </Link>
        <SearchBox />
      </div>
    </header>
  )
}

export default Header
