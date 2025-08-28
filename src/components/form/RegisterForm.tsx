/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useActionState, useEffect, useState } from 'react'
import { FormState, handleCreateNewUser, UserErrors, UserSchema, UserValidate } from '@/libs/firebaseAction'
import { useNotification } from '@/store/store'

type FieldName = keyof UserValidate

interface Field {
    id: string
    name: FieldName
    type: string,
    title: string
    defaultValue: string,
    placeholder: string,
    renderError: () => string | null
}

function RegisterForm({ title }:{ title:string }) {
    const [state, formAction, isPending] = useActionState(handleCreateNewUser, { zodError: null, firebaseError: null, success: false, values: null })
    const [errors, setErrors] = useState<any>({})
    const [values, setValues] = useState({ username: "", email: "", password: "" })
    const [touched, setTouched] = useState<Record<FieldName, boolean>>({
        username: false,
        email: false,
        password: false,
    })
    
    // console.log('error-server', state)
    console.log('error-client', errors)
    console.log('touched', touched)
     
    const fieldsForm: Field[] = [
        {
            id: 'username',
            title: 'Tên hiển thị',
            name: 'username',
            type: 'text',
            defaultValue: state.values?.username ?? "",
            placeholder: 'Nhập tên người dùng...',
            renderError: () => {
                // if(errors.username && errors.username._errors.length) {
                //     console.log('Lỗi client')
                //     return errors.username._errors[0]
                // } else {
                //     console.log('Lỗi server')
                //     return state.zodError && state.zodError.username!._errors[0]

                // }
                return (errors?.username && errors.username._errors[0]) 
                    || (errors?.zodError?.username && errors.zodError.username._errors[0])
            }
        },
        {
            id: 'email',
            title: 'Email',
            name: 'email',
            type: 'email',
            defaultValue: state.values?.email ?? "",
            placeholder: 'Nhập tên người dùng...',
            renderError: () => {
                // if(errors.email && errors.email._errors.length) {
                //     return errors.email._errors[0]
                // } else {
                //     return state.zodError && state.zodError.email!._errors[0]

                // }
                return (errors?.email && errors.email._errors[0]) 
                    || (errors?.zodError?.email && errors.zodError.email._errors[0])

            }
        },
        {
            id: 'password',
            title: 'Password',
            name: 'password',
            type: 'password',
            defaultValue: state.values?.password ?? "",
            placeholder: 'Nhập tên người dùng...',
            renderError: () => {
                // if(errors.password && errors.password._errors.length) {
                //     return errors.password._errors[0]
                // } else {
                //     return state.zodError && state.zodError.password!._errors[0]

                // }
                return (errors?.password && errors.password._errors[0]) 
                    || (errors?.zodError?.password && errors.zodError.password._errors[0])

            }
            
        },
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const nextValues = { ...values, [name]: value }
        setValues(nextValues)
        setTouched(prev => ({ ...prev, [name]: true }))

        // validate realtime
        const result = UserSchema.safeParse(nextValues)
        if (!result.success) {
            setErrors(result.error.format())
            return
        } else {
            setErrors({})
        }
        
    }


    
    useEffect(() => {
        if(state.zodError) {
            console.log('Có lỗi Server')
            setErrors(state)
        }
    },[state.zodError, state])

    return (
        <div>
            {title && (<div className='text-center'>
                <h2>{title}</h2>
            </div>)}
            {state.firebaseError && <p className={`${state.success ? 'text-[#08ae70]' : 'text-red-600'} text-sm text-center`}>{state.firebaseError}</p>}
            <div className='mt-8 text-sm'>
                <form action={formAction}>
                    {fieldsForm.map((field: any) => (
                        <div key={field.id} className='flex flex-col mt-4'>
                            <label className='ml-2'>{field.title}</label>
                            <input
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                // required
                                onChange={handleChange}
                                defaultValue={field.defaultValue}
                                placeholder={field.placeholder}
                                className={`${
                                    ( 
                                        (errors?.[field.name]?._errors.length > 0 && values[field.name as keyof typeof values]?.length > 0) ||
                                        (errors?.zodError?.[field.name]?._errors.length > 0)
                                    )
                                    ? 'outline-2 outline-red-500 border-0' : ''} 
                                    relative border border-(--bg-sub) rounded-full px-4 py-2 mt-1 transition opacity-80 text-sm`
                                }
                            />
                            
                            {
                                (values[field.name as keyof typeof values]?.length > 0 || errors?.zodError?.[field.name]?._errors.length > 0) 
                                && (<p className='mt-1 text-sm text-[#e30119]'>{field.renderError()}</p>)
                            }
                        </div>
                    ))}
                    <p className='text-xs text-yellow-700 text-center mt-6 bg-yellow-100 rounded-xl p-2'>
                        Nếu bạn dùng <strong>email</strong> đã đăng ký ở đây để đăng nhập 
                        với <strong>Google</strong> hoặc <strong>Github</strong> thì sẽ tự động hợp nhất tài khoản vào phương thức mới 
                        đó và không thể đăng nhập lại bằng <strong>password</strong> vì vấn đề bảo mật</p>
                    <button 
                        type='submit' 
                        disabled={isPending}
                        className={`${isPending ? 'cursor-progress' : 'cursor-pointer'} w-full py-2 mt-6 bg-gray-200 rounded-lg hover:bg-gray-300 transition`}

                    >
                        {isPending ? 'Đang xử lý...' : 'Đăng ký'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm