import React, { useEffect, useRef, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { getKeywordSearchApi } from '~/apis/search.api'
import useQuerString from '~/hooks/useQuerString'

function SearchBox() {
  const [keyWords, setKeyWord] = useState([])
  const [showKeyword, setShowKeyword] = useState(false)
  const [showMore, setShowmore] = useState(false)

  const keywordSearchRef = useRef(null)
  const inputRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { q } = useQuerString()
  const [text, setText] = useState(q ? q : '')

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu

      if (
        showKeyword &&
        keywordSearchRef.current &&
        !keywordSearchRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setShowKeyword(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [showKeyword])

  const searchQuery = useQuery({
    queryKey: ['keyword-search', text],
    queryFn: () => getKeywordSearchApi(text),
    onSuccess: (data) => {
      setKeyWord(data.data)
    }
  })

  const handleSearch = (keyword) => {
    if (keyword) {
      navigate(`/search?q=${keyword.keyword}`)
      setText(keyword.keyword)
    } else {
      navigate(`/search?q=${text}`)
    }
    setShowKeyword(false)
  }

  const searchWithMenu = (data) => {
    if (data.id) {
      navigate(`/${data.url_key}/${data.id}`)
    } else {
      navigate(`/search?q=${data.title}`)
    }
    setShowKeyword(false)
  }

  // const numberList = keyWords?.data?.length > 3 ? 3 : keyWords?.data?.length

  return (
    <div className='relative flex w-[75%] items-center justify-center'>
      <input
        ref={inputRef}
        className=' w-full rounded-md border px-2 py-2 text-black outline-blue-400 md:w-[75%]'
        type='text'
        onFocus={() => setShowKeyword(true)}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Tìm gì tìm gì nào...'
      />
      <button onClick={() => handleSearch()} className='absolute right-[14%]'>
        <FiSearch className=' h-7 w-7 text-black' />
      </button>
      {showKeyword && (
        <div
          ref={keywordSearchRef}
          className='absolute top-[50px] flex w-[75%] flex-col bg-white p-2 text-black shadow-md '
        >
          {keyWords.data?.slice(0, showMore ? keyWords.data?.length : 3).map((keyword) => (
            <div
              key={keyword.keyword}
              onClick={() => handleSearch(keyword)}
              className='flex cursor-pointer hover:bg-slate-200'
            >
              <div className='flex items-center'>
                {keyword.type === 'history' && (
                  <img
                    width={35}
                    height={35}
                    src='https://salt.tikicdn.com/ts/upload/90/fa/09/9deed3e3186254637b5ca648f3032665.png'
                    alt='history'
                  />
                )}
                {keyword.type === 'keyword' && (
                  <img
                    width={35}
                    height={35}
                    src='https://salt.tikicdn.com/ts/upload/e8/aa/26/42a11360f906c4e769a0ff144d04bfe1.png'
                    alt='keyword'
                  />
                )}
                {keyword.type !== 'keyword' && keyword.type !== 'history' && (
                  <img width={35} height={35} src={keyword.logo} alt='keyword' />
                )}
                <div className='flex flex-col'>
                  <span className='font-semibold'>{keyword.keyword}</span>
                  {keyword.type === 'seller' && <span className='text-[11px]'>{keyword.subtitle}</span>}
                </div>
              </div>
            </div>
          ))}
          <button type='submit' onClick={() => setShowmore(!showMore)} className='flex items-center justify-center'>
            <span className='text-sm text-blue-400'>{!showMore ? 'Xêm thêm' : 'Thu gọn'}</span>
            <img color='##449cf1' src={!showMore ? '/images/arrowDown.svg' : '/images/arrowUp.svg'} alt='arrowDown' />
          </button>
          {keyWords.widgets &&
            keyWords.widgets.map((item) => {
              if (item.code !== 'promo') {
                return (
                  <div className='mt-3 flex cursor-pointer flex-col ' key={item.code}>
                    <h2 className='text-[16px] font-semibold'>{item.title}</h2>
                    <div className='grid gap-3 p-3 md:grid-cols-2 lg:grid-cols-3'>
                      {item.items.map((value) => {
                        return (
                          <div
                            key={value.thumbnail_url}
                            onClick={() => searchWithMenu(value)}
                            className='flex items-center gap-2'
                          >
                            <img className='h-[70px] w-[70px]' src={value.thumbnail_url} alt={value.title} />
                            <span className='text-[12px]'>{value.title ? value.title : value.name}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              }
            })}
        </div>
      )}
    </div>
  )
}

export default SearchBox
