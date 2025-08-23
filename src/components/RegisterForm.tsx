/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useState } from 'react'
import { useFormState } from 'react-dom'
import SubmitButton from './SubmitButton'
import { handleCreateNewUser, UserSchema } from '@/libs/firebaseAction'
import { useNotification } from '@/store/store'




function RegisterForm({ title }:{ title:string }) {
    const [state, formAction] = useFormState(handleCreateNewUser, { zodError: undefined, firebaseError: null, success: false, values: {} })
    const [errors, setErrors] = useState<any>({})
    const [values, setValues] = useState({ username: "", email: "", password: "" })
    const toast = useNotification(state => state.toast)
    
    console.log('error-server', state)
    console.log('error-client', errors)


    const fieldsForm = [
        {
            id: 'username',
            title: 'Tên hiển thị',
            name: 'username',
            type: 'text',
            defaultValue: state.values?.username ?? "",
            placeholder: 'Nhập tên người dùng...',
            classNames: `${errors.username && errors.username?._errors.length > 0 ? 'outline-1 outline-red-500 border-0' : ''} 
            relative border border-(--bg-sub) rounded-full px-4 py-2 mt-1 transition opacity-80 text-sm`,
            renderError: () => {
                return errors.username && errors.username._errors.map((err:any, index:number) => (
                        <p key={index} className='text-sm text-red-600 mt-1'>{err}</p>
                        ))
            }
        },
        {
            id: 'email',
            title: 'Email',
            name: 'email',
            type: 'email',
            defaultValue: state.values?.email ?? "",
            placeholder: 'Nhập tên người dùng...',
            classNames: `${errors.email && errors.email?._errors.length > 0 ? 'outline-1 outline-red-500 border-0' : ''} 
            relative border border-(--bg-sub) rounded-full px-4 py-2 mt-1 transition opacity-80 text-sm`,
            renderError: () => {
                return errors.email && errors.email._errors.map((err:any, index:number) => (
                        <p key={index} className='text-sm text-red-600 mt-1'>{err}</p>
                        ))
            }
        },
        {
            id: 'password',
            title: 'Password',
            name: 'password',
            type: 'password',
            defaultValue: state.values?.password ?? "",
            placeholder: 'Nhập tên người dùng...',
            classNames: `${errors.password && errors.password?._errors.length > 0 ? 'outline-1 outline-red-500 border-0' : ''} 
            relative border border-(--bg-sub) rounded-full px-4 py-2 mt-1 transition opacity-80 text-sm`,
            renderError: () => {
                return errors.password && errors.password._errors.map((err:any, index:number) => (
                        <p key={index} className='text-sm text-red-600 mt-1'>{err}</p>
                        ))
            }
        },
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const nextValues = { ...values, [name]: value }
        setValues(nextValues)
        
        // validate realtime
        const result = UserSchema.safeParse(nextValues)
        if (!result.success) {
            setErrors(result.error.format())
        } else {
            setErrors({})
        }
        state.firebaseError = null
        state.zodError = undefined
    }


    return (
        <div>
            {title && (<div className='text-center'>
                <h2>{title}</h2>
            </div>)}
            {state.firebaseError && <p className={`${state.success ? 'text-[#08ae70]' : 'text-red-600'} text-sm text-center`}>{state.firebaseError}</p>}
            <div className='mt-8 text-sm'>
                <form action={formAction}>
                    {fieldsForm.map((field: any) => (
                        <>
                            <div key={field.id} className='flex flex-col mt-4'>
                                <label className='ml-2'>{field.title}</label>
                                <input
                                    id={field.id}
                                    name={field.name}
                                    type={field.type}
                                    required
                                    onChange={handleChange}
                                    defaultValue={field.defaultValue}
                                    placeholder={field.placeholder}
                                    className={field.classNames}
                                />
                            </div>
                            {field.renderError()}
                        </>
                    ))}
                    <p className='text-xs text-yellow-700 text-center mt-6 bg-yellow-100 rounded-xl p-2'>
                        Nếu bạn dùng <strong>email</strong> đã đăng ký ở đây để đăng nhập 
                        với <strong>Google</strong> hoặc <strong>Github</strong> thì sẽ tự động hợp nhất tài khoản vào phương thức mới 
                        đó và không thể đăng nhập lại bằng <strong>password</strong> vì vấn đề bảo mật</p>
                    <SubmitButton type='register' />
                </form>
            </div>
        </div>
    )
}

export default RegisterForm