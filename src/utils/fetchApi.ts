/* eslint-disable @typescript-eslint/no-explicit-any */


export const handleGetMovie = async ( url: string, ...rest:any[] ): Promise<any> => {
    try {
        const res = await fetch(url, ...rest, { cache: 'force-cache' })
        if (!res.ok) throw new Error('Lỗi API Movie')
        const data = await res.json()
        return data
    } catch (err) {
        console.error('Lỗi khi gọi API:', err, url)
        return 'Không thể tải dữ liệu phim. Vui lòng thử lại sau'
    }
}