import React from 'react'

const CategoryBar = ({ currCategory, categories, hide }) => {
  const categoryClick = (c, i) => {
    var element = document.getElementById(`menu${i}`)
    const headerOffset = 120;
    var offsetTop = element.getBoundingClientRect().top + window.pageYOffset - headerOffset
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    })
    // Hide if category bar is showing (on small devices)
    if (hide) {
      hide()
    }
  }

  return (
    <div className=''>
      {/* Menu Title */}
      <h1 className=' text-[35px] leading-[44px] font-bold'>Men</h1>

      {/* Side category bar */}
      <nav>
        <ul className={`mt-[59px] space-y-[63px] text-menu-nav`}>
          {categories.map((c, i) => <li
            className={currCategory === c ? 'cursor-pointer' : 'cursor-pointer'}
            key={i}
            onClick={() => categoryClick(c, i)}>
            {c}
          </li>)}
        </ul>
      </nav>
    </div>
  )
}

export default CategoryBar