import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineFilter } from 'react-icons/ai'

function FilterSideBarMobile({ serviceFilter, dataFilter, handleSelectFilter }) {
  const [showFilter, setShowfilter] = useState(false)
  const filterRef = useRef(null)

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu

      if (showFilter && filterRef.current && !filterRef.current.contains(e.target)) {
        setShowfilter(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [showFilter])

  return (
    <div>
      {/* mobile */}
      <div className='block w-20 md:hidden'>
        <div onClick={() => setShowfilter(true)} className='flex'>
          <AiOutlineFilter className='h-8 w-8 text-[#d5451b] ' />
          <span>Lọc</span>
        </div>
      </div>
      <div className={` ${showFilter ? 'fixed left-0 right-0 bottom-0 top-0 z-20 bg-black/20' : ''}`}>
        <div
          ref={filterRef}
          className={`fixed right-[0] top-[-100px] z-50   mt-[180px] w-[80%]   ${
            showFilter ? 'translate-x-0' : 'translate-x-full'
          } bg-white transition duration-150 md:hidden`}
        >
          <h2 className='flex w-full items-center justify-center bg-slate-300 p-3 font-semibold text-black'>
            Bộ lọc tìm kiếm
          </h2>
          <div className='h-screen overflow-hidden overflow-y-scroll'>
            <div className='my-5'>
              <h2 className='ml-4 mb-2 text-xl font-semibold text-black'>Dịch vụ</h2>
              <div className='ml-3  grid grid-cols-2 flex-wrap items-center justify-center gap-4 text-[12px] text-black'>
                {serviceFilter.map((item, index) => (
                  <div
                    onClick={() => handleSelectFilter(item, index)}
                    key={item.display_name}
                    className={`flex h-full w-full cursor-pointer flex-col items-center justify-center ${
                      !item?.values[0]?.selected ? 'bg-gray-200/50' : 'bg-black/50'
                    } p-3 text-center`}
                  >
                    {item.icon && <img className=' object-fit max-w-[70px]' src={item.icon} alt={item.display_name} />}
                    <span>{item.display_name}</span>
                  </div>
                ))}
              </div>
            </div>
            {dataFilter.map((item, index) => {
              if (item.type) {
                return
              } else {
                return (
                  <div key={item.display_name} className='my-5'>
                    <h2 className='ml-4 mb-2 text-xl font-semibold text-black'>{item.display_name}</h2>
                    <div className='ml-3 grid   grid-cols-2 flex-wrap items-center justify-center gap-4 text-xs text-black'>
                      {item.values.map((itemValue, indexValue) => (
                        <div
                          onClick={() => handleSelectFilter(itemValue, indexValue)}
                          key={itemValue.display_value}
                          className={`flex h-full w-full cursor-pointer flex-col items-center justify-center ${
                            !itemValue.selected ? 'bg-gray-200/50' : 'bg-black/50'
                          } p-3 text-center`}
                        >
                          <span>{itemValue.display_value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterSideBarMobile
