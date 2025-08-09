import Slider from "@/components/Slider";
import { MovieHomeResponse } from "@/interface/interface";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

// bg-[#292929]
const handleGetMovieHome = async (): Promise<MovieHomeResponse> => {
  const res = await fetch(`${BASE_URL}/v1/api/home`)
  if (!res.ok) throw new Error('Lỗi API')
  return res.json()
}
export default async function Home() {
  const result = await handleGetMovieHome()

  return (
    <div className="w-full py-6">
      <Slider result={result} />
    </div>
  )
}
