/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/libs/firebase"
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"


export async function GET(req: NextRequest) {
    // const { slug, userId } = await req.json()
    const userId = await req.headers.get('User')
    console.log('headerUserId', userId)

    if (!userId) {
        return NextResponse.json({ error: 'Not add favorite', message: `Thêm thất bại`  }, { status: 400 })
    }
    
    try{
        const ref = doc(db, "users", userId)
        const snap = await getDoc(ref)
       
        if (!snap.exists() || !snap.data().favorites) {
            return NextResponse.json(
                { message: 'Không tìm thấy dữ liệu' },
                { status: 404 }
            )
        }
        return NextResponse.json(
            { message: 'Lấy danh sách thành công', data: snap.data()?.favorites },
            { status: 200 }
        )
    }catch(e: any){
        console.log('Invalid token', e)
        
        return NextResponse.json(
            {
                message: 'Có lỗi xảy ra khi thêm vào favorites',
                error: e.message ?? e.toString(),
            },
            { status: 500 }
        )
    }
}



export async function POST(req: NextRequest) {
    const { slug, userId } = await req.json()
    console.log('Slug===', slug, userId)
    if (!slug) {
        return NextResponse.json({ error: 'Not found slug movie', message: `Không tìm thấy phim`  }, { status: 400 })
    }
    
    try{
        const userRef = doc(db, 'users', userId)
        await updateDoc(userRef, {
            favorites: arrayUnion(slug)
        })
        return NextResponse.json(
            { message: 'Đã thêm vào danh sách yêu thích' },
            { status: 200 }
        )
    }catch(e: any){
        console.log('Invalid token', e)
        
        return NextResponse.json(
            {
                message: 'Có lỗi xảy ra khi thêm vào favorites',
                error: e.message ?? e.toString(),
            },
            { status: 500 }
        )
    }
}



export async function DELETE(req: NextRequest) {
    const { slug, userId } = await req.json()

    if (!slug) {
        return NextResponse.json({ error: 'Not found slug favorite', message: `Không tìm thấy phim`  }, { status: 400 })
    }
    
    try{
        const userRef = doc(db, 'users', userId)
        await updateDoc(userRef, {
            favorites: arrayRemove(slug)
        })
        return NextResponse.json(
            { message: 'Xóa thành công' },
            { status: 200 }
        )
    }catch(e: any){
        console.log('Invalid token', e)
        
        return NextResponse.json(
            {
                message: 'Không thể xóa, vui lòng thử lại',
                error: e.message ?? e.toString(),
            },
            { status: 500 }
        )
    }
}