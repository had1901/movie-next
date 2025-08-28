/* eslint-disable @typescript-eslint/no-explicit-any */


import React, { useActionState, useState } from 'react'
import { useAuth } from '@/store/store'
import { handleLoginWithEmailAndPassword } from '@/libs/firebaseAction'



function LoginForm({ title }:{ title:string }) {
    const [state, formAction, isPending] = useActionState(handleLoginWithEmailAndPassword, { zodError: null, firebaseError: null, success: false, values: null })
    const [errors, setErrors] = useState<any>({})
    const [values, setValues] = useState({ email: "", password: "" })
    const setShowModal = useAuth(state => state.setShowModal)
    const setLoading = useAuth(state => state.setLoading)
    
    console.log('error-server', state)
    // console.log('error-client', errors)


    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        const nextValues = { ...values, [name]: value }
        setValues(nextValues)
        
        state.firebaseError = null
        state.zodError = null
    }

    // useEffect(() => {
    //     // setLoading(true)
    //     if(state.success) {
    //         setShowModal(false)
    //         // setLoading(false)
    //     }
    // },[state.success, setShowModal, setLoading])


    return (
        <div>
            {title && (<div className='text-center'>
                <h2>{title}</h2>
            </div>)}
            {state.firebaseError && <p className={`${state.success ? 'text-[#08ae70]' : 'text-red-600'} text-sm text-center`}>{state.firebaseError}</p>}
            <div className='mt-8 text-sm'>
                <form action={formAction}>
                    <div className='flex flex-col mt-4'>
                        <label htmlFor="#email" className='ml-2'>Email</label>
                        <input
                            id='email'
                            name='email'
                            type='email'
                            required
                            onChange={handleChange}
                            defaultValue={state.values?.email ?? ""}
                            placeholder='Nhập email...'
                            className={`${errors.email && errors.email?._errors.length > 0 ? 'outline-1 outline-red-500 border-0' : ''} relative border 
                            border-(--bg-sub) rounded-full px-4 py-2 mt-1 transition opacity-80 text-sm`}
                        />
                    </div>
                   
                    <div className='flex flex-col mt-4'>
                        <label htmlFor="#password" className='ml-2'>Mật khẩu</label>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            required
                            onChange={handleChange}
                            defaultValue={state.values?.password ?? ""}
                            placeholder='Nhập password...'
                            className={`${errors.password && errors.password?._errors.length > 0 ? 'outline-1 outline-red-500 border-0' : ''} relative border 
                            border-(--bg-sub) rounded-full px-4 py-2 mt-1 transition opacity-80 text-sm`}
                        />
                    </div>
                    {errors.password?._errors && errors.password._errors.map((err:any, index:number) => (
                        <p key={index} className='text-sm text-red-600 mt-1'>{err}</p>
                    ))}

                    <button 
                        type='submit' 
                        disabled={isPending}
                        className={`${isPending ? 'cursor-progress' : 'cursor-pointer'} w-full py-2 mt-6 bg-gray-200 rounded-lg hover:bg-gray-300 transition`}
                    >
                        {isPending ? 'Đang xử lý...' : 'Đăng nhập'}
                    </button>
                </form>
            </div>
                
            
        </div>
    )
}

export default LoginForm