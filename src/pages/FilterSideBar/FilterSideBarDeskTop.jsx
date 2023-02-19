function FilterSideBarDeskTop({ serviceFilter, dataFilter, handleSelectFilter, handleShowmore }) {
  return (
    <div className='hidden flex-col bg-white p-10 md:flex md:basis-1/3 lg:basis-1/4 xl:basis-1/5'>
      <div className='mb-3 '>
        <h2 className=' mb-2 text-xl font-semibold text-black'>Dịch vụ</h2>
        <div className='mt-2 grid grid-cols-1 '>
          {serviceFilter.map((item, index) => (
            <div
              key={item.display_name}
              onClick={() => handleSelectFilter(item, index)}
              className='my-1 flex cursor-pointer items-start  gap-2'
            >
              {!item.status ? (
                <img
                  src='https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/unchecked.svg'
                  alt='checkbox'
                />
              ) : (
                <img
                  src='https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/checked.svg'
                  alt='checkbox'
                />
              )}
              <div className='flex flex-wrap items-center'>
                {item.icon && <img className='h-[10px]' src={item.icon} alt={'icon'} />}
                <span>{item.display_name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='mb-3'>
        {dataFilter.map((item, index) => {
          if (item.type !== 'service') {
            return (
              <div key={item.display_name + index}>
                <h2 className=' mb-2 text-xl font-semibold text-black'>{item.display_name}</h2>
                <div className='mt-2 grid grid-cols-1 '>
                  {item.values.slice(0, !item.show_more ? 5 : item.values.length).map((value, indexVlaue) => (
                    <div
                      key={item.query_name + value.display_value}
                      className='my-1 flex cursor-pointer items-start  gap-2'
                      onClick={() => handleSelectFilter(value, indexVlaue)}
                    >
                      {item.query_name === 'price' || item.query_name === 'rating' ? (
                        ''
                      ) : (
                        <img
                          src={
                            !value.status
                              ? 'https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/unchecked.svg'
                              : 'https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/checked.svg'
                          }
                          alt='checkbox'
                        />
                      )}
                      <div className='flex flex-wrap items-center'>
                        {value.icon && <img className='h-[10px]' src={value.icon} alt={'icon'} />}
                        <span className='flex'>
                          {item.query_name === 'rating' &&
                            Array(+value.query_value)
                              .fill('0')
                              .map((index) => <img key={Math.random() * 10000000} src='/images/star.svg' alt='star' />)}
                          {value.display_value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {item.values.length > 5 && (
                  <button
                    onClick={() => handleShowmore({ ...item, show_more: !item.show_more ? true : false }, index)}
                    className='flex items-center '
                  >
                    <span className='text-sm text-blue-400'>{!item.show_more ? 'Xêm thêm' : 'Thu gọn'}</span>
                    <img
                      color='##449cf1'
                      src={!item.show_more ? '/images/arrowDown.svg' : '/images/arrowUp.svg'}
                      alt='arrowDown'
                    />
                  </button>
                )}
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default FilterSideBarDeskTop
