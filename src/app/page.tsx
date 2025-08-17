/* eslint-disable @typescript-eslint/no-explicit-any */
import HeroMovie from "@/components/HeroMovie";
import ListMovie from "@/components/ListMovie";
import MovieCard from "@/components/MovieCard";
import Poster from "@/components/Poster";
import Slider from "@/components/Slider";
import SwiperCarousel from "@/components/SwiperCarousel";
// import { MovieHomeResponse } from "@/interface/interface";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

// bg-[#292929]
const handleGetMovieHome = async (url: string): Promise<any> => {
  try{
    const res = await fetch(url)
    if (!res.ok) throw new Error('Lỗi API')
    return res.json()
  }catch(e){
    console.log('Lỗi API', e)
    return { message: e, status: 400 }
  }
 
}
  
export default async function Home() {
  // const result = await handleGetMovieHome(`${BASE_URL}/v1/api/home`)
  const comingMovies = await handleGetMovieHome(`${BASE_URL}/v1/api/danh-sach/phim-sap-chieu?page=1&limit=24&year=2025`)
  const cartoonMovies = await handleGetMovieHome(`${BASE_URL}/v1/api/danh-sach/hoat-hinh?page=1&limit=24&country=nhat-ban`)
  const newMovies = await handleGetMovieHome(`${BASE_URL}/v1/api/danh-sach/phim-moi?page=1&limit=24&year=2025`)
  const oddMovies = await handleGetMovieHome(`${BASE_URL}/v1/api/danh-sach/phim-le?page=1&limit=24&year=2025`)
  const collectionMovies = await handleGetMovieHome(`${BASE_URL}/v1/api/danh-sach/phim-chieu-rap?page=1&limit=24&year=2025&category=hanh-dong`)
  const tvMovies = await handleGetMovieHome(`${BASE_URL}/v1/api/danh-sach/tv-shows?page=1&limit=24`)
  const koreanMovies = await handleGetMovieHome(`${BASE_URL}/v1/api/quoc-gia/han-quoc?page=1&limit=24&year=2025`)
  const chinaMovies = await handleGetMovieHome(`${BASE_URL}/v1/api/quoc-gia/trung-quoc?page=1&limit=24&year=2025`)
  const usukMovies = await handleGetMovieHome(`${BASE_URL}/v1/api/quoc-gia/au-my?page=1&limit=24&year=2025`)
  const country = await handleGetMovieHome(`${BASE_URL}/v1/api/quoc-gia`)
  // console.log('home', result)
  // console.log('CategoryMovies', categoryMovies)
  // console.log('newMovies', newMovies)
  // console.log('tvMovies', tvMovies)
  console.log('country', country)

  return (
    <div className="w-full">
      <div className="px-10">
        <Slider result={comingMovies} hasMark/>
      </div>
      <div className="container mx-auto">
        
        <ListMovie title="Phim hành động chiếu rạp">
            <SwiperCarousel movies={collectionMovies} clippath/>
        </ListMovie>
        <ListMovie title="Phim mới">
            <SwiperCarousel movies={newMovies}/>
        </ListMovie>
        {/* <ListMovie title="Anime cho Wibu">
            <SwiperCarousel movies={cartoonMovies}/>
        </ListMovie> */}
        <ListMovie title="Anime cho wibu chúa">
          <Slider result={cartoonMovies} hasMark={false} />
        </ListMovie>
        <ListMovie title="Phim lẻ">
            <SwiperCarousel movies={oddMovies}/>
        </ListMovie>
        <ListMovie title="TV Shows">
            <SwiperCarousel movies={tvMovies}/>
        </ListMovie>

        <section className="rounded-2xl bg-gradient-to-b from-(--bg-sub) to-bg-transparent h-auto mt-10 overflow-hidden p-[40px]">
          <HeroMovie title="Phim Hàn Quốc mới" styleCustom="from-(--text-main-yellow) to-[#9457ff]"> 
            <SwiperCarousel movies={koreanMovies} slidesPerView={5}/>
          </HeroMovie>
          <HeroMovie title="Phim Trung Quốc mới" styleCustom="from-(--text-main-yellow) to-[#2d71f0]"> 
            <SwiperCarousel movies={chinaMovies} slidesPerView={5}/>
          </HeroMovie>
          <HeroMovie title="Phim US-UK mới" styleCustom="from-(--text-main-yellow) to-[#e60c66]"> 
            <SwiperCarousel movies={usukMovies} slidesPerView={5}/>
          </HeroMovie>
        </section>
        {/* <ListMovie title="Phim Hàn Quốc mới nhất">
            <SwiperCarousel movies={koreanMovies}/>
        </ListMovie>
        <ListMovie title="Phim Trung Quốc mới nhất">
            <SwiperCarousel movies={chinaMovies}/>
        </ListMovie>
        <ListMovie title="Phim US-UK mới nhất">
            <SwiperCarousel movies={usukMovies}/>
        </ListMovie> */}
      </div>
    </div>
  )
}
