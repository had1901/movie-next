/* eslint-disable @typescript-eslint/no-explicit-any */
import HeroMovie from "@/components/HeroMovie";
import HistoryViewed from "@/components/HistoryViewed";
import ListMovie from "@/components/ListMovie";
import DotGrid from "@/components/service/DotGrid";
import Slider from "@/components/Slider";
import SwiperCarousel from "@/components/SwiperCarousel";
import { handleGetMovie } from "@/utils/fetchApi";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL


const unwrap = (res: PromiseSettledResult<any>) => res.status === 'fulfilled' ? res.value : null

export default async function Home() {

  const [
  comingResult,
  cartoonResult,
  newResult,
  oddResult,
  collectionResult,
  tvResult,
  koreanResult,
  chinaResult,
  usukResult,
] = await Promise.allSettled([
  handleGetMovie(`${BASE_URL}/v1/api/danh-sach/phim-sap-chieu?page=1&limit=24&year=2025`),
  handleGetMovie(`${BASE_URL}/v1/api/danh-sach/hoat-hinh?page=1&limit=24&country=nhat-ban`),
  handleGetMovie(`${BASE_URL}/v1/api/danh-sach/phim-moi?page=1&limit=24&year=2025`),
  handleGetMovie(`${BASE_URL}/v1/api/danh-sach/phim-le?page=1&limit=24&year=2025`),
  handleGetMovie(`${BASE_URL}/v1/api/danh-sach/phim-chieu-rap?page=1&limit=24&year=2025`),
  handleGetMovie(`${BASE_URL}/v1/api/danh-sach/tv-shows?page=1&limit=24`),
  handleGetMovie(`${BASE_URL}/v1/api/quoc-gia/han-quoc?page=1&limit=24&year=2025`),
  handleGetMovie(`${BASE_URL}/v1/api/quoc-gia/trung-quoc?page=1&limit=24&year=2025`),
  handleGetMovie(`${BASE_URL}/v1/api/quoc-gia/au-my?page=1&limit=24&year=2025`),
])
  const comingMovies = unwrap(comingResult)
  const cartoonMovies = unwrap(cartoonResult)
  const newMovies = unwrap(newResult)
  const oddMovies = unwrap(oddResult)
  const collectionMovies = unwrap(collectionResult)
  const tvMovies = unwrap(tvResult)
  const koreanMovies = unwrap(koreanResult)
  const chinaMovies = unwrap(chinaResult)
  const usukMovies = unwrap(usukResult)

  return (
    <div className="w-full">
      
      <div className="px-10">
        <Slider result={comingMovies} hasMark ratio="aspect-[2/3]"/>
      </div>
      <div className="container mx-auto">
      
      {/* <div className='fixed inset-0'>
          <DotGrid
            dotSize={2}
            gap={20}
            baseColor="#6b6b6b"
            activeColor="#5227FF"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={500}
            returnDuration={1.5}
          />
      </div> */}
      <ListMovie title="Phim hành động chiếu rạp" >
        <SwiperCarousel movies={collectionMovies} clippath/>
      </ListMovie>
      
      <HistoryViewed />

      <ListMovie title="Phim mới">
        <SwiperCarousel movies={newMovies} />
      </ListMovie>

      <ListMovie title="Anime cho wibu chúa">
        <Slider result={cartoonMovies} hasMark={false} ratio="aspect-[2/3]"/>
      </ListMovie>

      <ListMovie title="Phim lẻ">
        <SwiperCarousel movies={oddMovies} />
      </ListMovie>

      <ListMovie title="TV Shows">
        <SwiperCarousel movies={tvMovies} />
      </ListMovie>

      <section className="rounded-2xl bg-gradient-to-b from-(--bg-sub) to-bg-transparent h-auto mt-10 p-[40px] ">
        <HeroMovie title="Phim Hàn Quốc mới" styleCustom="from-(--text-main-yellow) to-[#9457ff]"> 
          <SwiperCarousel movies={koreanMovies} slidesPerView={5} ratio="aspect-[16/9]" isBackdrop/>
        </HeroMovie>

        <HeroMovie title="Phim Trung Quốc mới" styleCustom="from-(--text-main-yellow) to-[#2d71f0]"> 
          <SwiperCarousel movies={chinaMovies} slidesPerView={5} ratio="aspect-[16/9]" isBackdrop/>
        </HeroMovie>

        <HeroMovie title="Phim US-UK mới" styleCustom="from-(--text-main-yellow) to-[#e60c66]"> 
          <SwiperCarousel movies={usukMovies} slidesPerView={5} ratio="aspect-[16/9]" isBackdrop/>
        </HeroMovie>
      </section>

      </div>
    </div>
  )
}
