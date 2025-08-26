
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {  } from 'react'
import LabelSub from './LabelSub'
import ButtonViewDetail from './ButtonViewDetail'

function Poster({ data, hasMark = true, textSize }:{ data: any, hasMark: boolean, textSize: string }) {
    
    const icons = [
      {
        label: data.year,
        icon: () => {
          return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path d="M5.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75V12ZM6 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H6ZM7.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H8a.75.75 0 0 1-.75-.75V12ZM8 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H8ZM9.25 10a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H10a.75.75 0 0 1-.75-.75V10ZM10 11.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75H10ZM9.25 14a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H10a.75.75 0 0 1-.75-.75V14ZM12 9.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V10a.75.75 0 0 0-.75-.75H12ZM11.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75V12ZM12 13.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75H12ZM13.25 10a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H14a.75.75 0 0 1-.75-.75V10ZM14 11.25a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 0 0 .75-.75V12a.75.75 0 0 0-.75-.75H14Z" />
              <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
            </svg>
          )
        }
      },
      {
        label: data.time,
        icon: () => {
          return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
            </svg>
          )
        }
      },
      {
        label: data.country[0].name,
        icon: () => {
          return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 1-11-4.69v.447a3.5 3.5 0 0 0 1.025 2.475L8.293 10 8 10.293a1 1 0 0 0 0 1.414l1.06 1.06a1.5 1.5 0 0 1 .44 1.061v.363a1 1 0 0 0 .553.894l.276.139a1 1 0 0 0 1.342-.448l1.454-2.908a1.5 1.5 0 0 0-.281-1.731l-.772-.772a1 1 0 0 0-1.023-.242l-.384.128a.5.5 0 0 1-.606-.25l-.296-.592a.481.481 0 0 1 .646-.646l.262.131a1 1 0 0 0 .447.106h.188a1 1 0 0 0 .949-1.316l-.068-.204a.5.5 0 0 1 .149-.538l1.44-1.234A6.492 6.492 0 0 1 16.5 10Z" clipRule="evenodd" />
            </svg>
          )
        }
      },
      // {
      //   label: data.time,
      //   icon: () => {
      //     return (
      //       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
      //         <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 1-11-4.69v.447a3.5 3.5 0 0 0 1.025 2.475L8.293 10 8 10.293a1 1 0 0 0 0 1.414l1.06 1.06a1.5 1.5 0 0 1 .44 1.061v.363a1 1 0 0 0 .553.894l.276.139a1 1 0 0 0 1.342-.448l1.454-2.908a1.5 1.5 0 0 0-.281-1.731l-.772-.772a1 1 0 0 0-1.023-.242l-.384.128a.5.5 0 0 1-.606-.25l-.296-.592a.481.481 0 0 1 .646-.646l.262.131a1 1 0 0 0 .447.106h.188a1 1 0 0 0 .949-1.316l-.068-.204a.5.5 0 0 1 .149-.538l1.44-1.234A6.492 6.492 0 0 1 16.5 10Z" clipRule="evenodd" />
      //       </svg>
      //     )
      //   }
      // },
      {
        label: data.lang,
        icon: () => {
          return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path fillRule="evenodd" d="M14 6a2.5 2.5 0 0 0-4-3 2.5 2.5 0 0 0-4 3H3.25C2.56 6 2 6.56 2 7.25v.5C2 8.44 2.56 9 3.25 9h6V6h1.5v3h6C17.44 9 18 8.44 18 7.75v-.5C18 6.56 17.44 6 16.75 6H14Zm-1-1.5a1 1 0 0 1-1 1h-1v-1a1 1 0 1 1 2 0Zm-6 0a1 1 0 0 0 1 1h1v-1a1 1 0 0 0-2 0Z" clipRule="evenodd" />
              <path d="M9.25 10.5H3v4.75A2.75 2.75 0 0 0 5.75 18h3.5v-7.5ZM10.75 18v-7.5H17v4.75A2.75 2.75 0 0 1 14.25 18h-3.5Z" />
            </svg>

          )
        }
      },
      {
        label: data.quality,
        icon: () => {
          return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path d="M3.25 4A2.25 2.25 0 0 0 1 6.25v7.5A2.25 2.25 0 0 0 3.25 16h7.5A2.25 2.25 0 0 0 13 13.75v-7.5A2.25 2.25 0 0 0 10.75 4h-7.5ZM19 4.75a.75.75 0 0 0-1.28-.53l-3 3a.75.75 0 0 0-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 0 0 1.28-.53V4.75Z" />
            </svg>
          )
        }
      },
    ]

    const buttonsView = [
      {
        label: 'Xem ngay',
        type: 'view-now',
        icon: () => {
          return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
            </svg>

          )
        }
      },
      // {
      //   label: 'Xem trailer',
      //   type: 'view-trailer',
      //   icon: () => {
      //     return (
      //       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
      //         <path d="M3.25 4A2.25 2.25 0 0 0 1 6.25v7.5A2.25 2.25 0 0 0 3.25 16h7.5A2.25 2.25 0 0 0 13 13.75v-7.5A2.25 2.25 0 0 0 10.75 4h-7.5ZM19 4.75a.75.75 0 0 0-1.28-.53l-3 3a.75.75 0 0 0-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 0 0 1.28-.53V4.75Z" />
      //       </svg>
      //     )
      //   }
      // },
    ]

    const styleCustomY = {
      maskImage: 'linear-gradient(90deg, transparent 0, rgba(0, 0, 0, 0.2) 15%, #292929 40%, #292929 80%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(90deg, transparent 0, rgba(0, 0, 0, 0.2) 15%, #292929 40%, #292929 80%, transparent 100%)',
    }
    const styleCustomX = {
      WebkitMaskImage: 'linear-gradient(0deg, transparent 0%, #292929 20%, #292929 80%, transparent)',
      maskImage: 'linear-gradient(0deg, transparent 0%, #292929 20%, #292929 80%, transparent)',
      WebkitMaskSize: '100% 100%',
      maskSize: '100% 100%',
      
    }
  

  return (
    <section className='relative h-full overflow-hidden rounded-2xl'>
      <div className='h-full' style={hasMark ? styleCustomY : {}}>
        <div className='relative flex h-full text-white overflow-hidden' style={hasMark ? styleCustomX : {}}>
          <div 
            className='w-full h-full bg-cover bg-center' 
            data-swiper-parallax-x="-30"
            style={{
            backgroundImage: ` url(https://img.ophim.live/uploads/movies/${data.poster_url})`,
            backgroundSize: '100%',
            backgroundPosition: 'right',
            backgroundRepeat: 'no-repeat'
          }}>
            <div style={{backgroundImage: `url(/dot.png)`, backgroundRepeat: 'repeat', backgroundSize: '3px'}} className='absolute inset-0 opacity-50 w-full h-full'></div>
          </div>
        </div>
      </div>

      {/* <Information data={data}/> */}
      <div className={`${hasMark ? '' : 'absolute inset-0 bg-gradient-to-r from-black to-bg-transparent'}`}>
        <div data-swiper-parallax-x="30" className={`absolute inset-[10%] text-white flex flex-col justify-center gap-2 z-50`}>
           
          <div className='flex items-center gap-2'>
            <h1 className='font-nosifer inline-block leading-14 px-1 font-bold text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl bg-(--text-main-yellow) bg-clip-text text-transparent' style={{ fontSize: hasMark ? '' : textSize}}>
                {data.name}
            </h1 >
            {data.chieurap && <span className='bg-gradient-to-r from-[#3f57ca] to-[#c650c0] py-[2px] px-1 rounded text-xs mt-1 inline-block'>Phim chiếu rạp</span>}
          </div>
  
          <h2 className='font-medium text-[18px]'>{data.origin_name}</h2>
          
          <div className='flex items-center gap-2 mt-1'>
            {data.category.map((item: any, index: number) => (
                <span key={index} className=' py-1 px-2 rounded text-sm' style={{ backgroundImage: 'var(--bg-main-gradient)'}}>{item.name}</span>
            ))}
          </div>
  
          <div className='flex items-center flex-wrap gap-4 mt-1'>
            {icons.slice(0,3).map((item, index) => (
                <LabelSub key={index} icon={item.icon()} label={item.label} />
            ))}
            {icons.slice(3).map((item, index) => (
                <LabelSub key={index} icon={item.icon()} label={item.label} />
            ))}
          </div>
  
          <p className='text-md mt-1 text-shadow-heading text-justify'>
            <span  className='font-bold'>Đang phát: </span>
            <span style={{ backgroundImage: 'var(--bg-main-gradient)'}} className='font-semibold ml-1 py-1 px-2 rounded'>{data.episode_current === 'Trailer' ? 'Chưa phát hành' : data.episode_current}</span>
          </p>
  
          <div className='flex items-center gap-10'>
            {buttonsView.map((btn, i) => (
                <ButtonViewDetail key={i} icon={btn.icon()} label={btn.label} type={btn.type} originalURL={data.trailer_url} slug={data.slug} />
            ))}
          </div>
          
        </div>
      </div>
    </section>
        
  )
}

export default Poster