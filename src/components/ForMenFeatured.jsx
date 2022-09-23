import React from 'react'
import forMenPic from '../images/home_for-men.png'

const ForMenFeatured = () => {
  return (
    <div className='mt-[59px] px-[45px] relative pt-[130px]'>
        {/* Title */}
        <img src={forMenPic} alt='FOR MEN' className='absolute top-0 left-[202px]'/>
        {/* Featured */}
        <div className='flex justify-between items-end aspect-[135/56]'>
          <div className='basis-[20.4%]'>
            <div className='home__for-men mb-[13px]'>
                {/* <img 
                src='https://s3-alpha-sig.figma.com/img/0a13/1a1c/ade33891a43841aa9fde3aecde3febdc?Expires=1664755200&Signature=TgaoM596TOhfFbUGfZHJyMw943L5gbFIY3vEuL~L8wGGYulEy0FJYgXa4vuIYNc3X48VKL-Ep5sKrSk-QRQbvr43xUsACYPMVjl52~UDteT-KfSbkCa0jeB7lgODW3KPMyI~rBRb6eFHyOf7loybytYaAPnWMtlCDsbcy1Q01zfi-gavO75Uwmn-9xublWpCKOrNA4JuA0dw6DbFgV4Hpi2LgvwHpqeGqI4GEaib8Wu4fO2uCwg3tXjmHRiPILlLsITTgm78lbLx0ikr0XTuptT1P~F7vrywAyXtVujGpReEspu5DPaxdXbf~C1Zl~00f5RKTR5aupqbjx3ysRyXFQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'
                alt='Men Featured 1' 
                className=''/> */}
            </div>
            <h5>Header</h5>
          </div>
          <div className='basis-[20.4%]'>
            <div className='home__for-men mb-[13px]'></div>
            <h5>Header</h5>
          </div>
          <div className='basis-[21.5%] self-start'>
            <div className='aspect-square rounded-[20px] bg-red-600'></div>
            <h5>Header</h5>
          </div>
          <div className='basis-[20.4%]'>
            <div className='home__for-men'></div>
            <h5>Header</h5>
          </div>
        </div>
      </div>
  )
}

export default ForMenFeatured