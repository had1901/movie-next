/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
    AuthProvider, 
    GithubAuthProvider, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    updateProfile,
    EmailAuthProvider
} from "firebase/auth"
import { auth, db } from "./firebase"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
import { z } from 'zod'










// Login width provider (Google, Github,...)
// Biến toàn cục để lưu trữ thông tin đăng nhập đang chờ xử lý
export let pendingCredential: any = null // Sẽ là AuthCredential
export let conflictingEmail: string = ''

export const loginFireBase = async (provider: AuthProvider, callback: () => void) => {
    try {
        const { user } = await signInWithPopup(auth, provider)
        await createProfileUser(user, user.displayName as string)

        return user
    } catch (error:any) {
        // Nếu email đã tồn tại với method khác
        if(error.code === 'auth/account-exists-with-different-credential') {
            console.warn("Email của bạn đã tồn tại. Vui lòng đăng nhập bằng một phương thức đã dùng trước đây để liên kết tài khoản.")

            // Lấy email và thông tin đăng nhập (credential) đang chờ xử lý
            conflictingEmail = error.customData.email as string
            pendingCredential = (provider instanceof GoogleAuthProvider)
            ? GoogleAuthProvider.credentialFromError(error)
            : GithubAuthProvider.credentialFromError(error)

            console.log('PendingCredential', pendingCredential)
            alert(`Email của bạn (${conflictingEmail}) đã được đăng ký bằng một phương thức khác. Vui lòng đăng nhập bằng BẤT KỲ phương thức nào bạn đã sử dụng trước đây cho email này để liên kết tài khoản.`)
            callback()
        }
        return null
    } 
}

export const logoutFireBase = async () => {
    await signOut(auth)
    resetLinkingState()
}

export const resetLinkingState = () => {
    pendingCredential = null;
    conflictingEmail = '';
}





// Login with Email/Password
export const UserSchema = z.object({
  username: z.string()
    .min(3, "Tên người dùng phải có ít nhất 3 ký tự")
    .max(20, "Tên người dùng không được vượt quá 20 ký tự")
    .trim(),
  email: z.string()
    .email("Email không hợp lệ")
    .regex(/^[\w.-]+@[a-zA-Z\d.-]+\.(com|vn)$/, "Email phải kết thúc bằng .com hoặc .vn")
    .trim(),
  password: z.string()
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .max(20, "Mật khẩu tối đa 20 ký tự")
    // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/, "Mật khẩu phải có chữ hoa, chữ thường, số và ký tự đặc biệt")
    .regex(/[a-z]/, "Mật khẩu phải chứa ít nhất một chữ thường")
    .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất một chữ in hoa")
    .regex(/\d/, "Mật khẩu phải chứa ít nhất một chữ số")
    .regex(/[^a-zA-Z0-9]/, "Mật khẩu phải chứa ít nhất một ký tự đặc biệt")
    .trim()
})

export type UserValidate = z.infer<typeof UserSchema>
export type UserErrors = z.inferFormattedError<typeof UserSchema>

export type FormState = {
  zodError: UserErrors | null
  firebaseError: string | null
  success: boolean
  values: UserValidate | null
}

// Cập nhật profile trong Firestore Database
const createProfileUser = async (user: any, displayName:string) => {
    const userRef = doc(db, "users", user.uid) // tham chiếu đến docs

    try {
        const docSnap = await getDoc(userRef) // lấy thông tin docs

        if (!docSnap.exists()) {
            await setDoc(userRef, { 
                uid: user.uid,
                email: user.email,
                displayName: displayName, 
                role: 'client',
                photoURL: user.photoURL || "",
                provider: user.providerId,
                accessToken: user.accessToken,
                createdAt: serverTimestamp(),
            })
            console.log("Hồ sơ người dùng đã được tạo thành công!")
        } else {
            console.log("Người dùng đã tồn tại")
        }
    } catch (error) {
        console.error("Lỗi khi đọc tài liệu:", error)
    }
}



export async function handleCreateNewUser(prevState: FormState, formData: FormData): Promise<FormState> {
    const data = Object.fromEntries(formData) as UserValidate
    const parsed = UserSchema.safeParse(data) // Validate data

    if(!parsed.success) {
        return { 
            zodError: parsed.error.format(), 
            firebaseError: null, 
            success: false, 
            values: data 
        }
    }

    try{
        const { user } = await createUserWithEmailAndPassword(auth, data.email as string, data.password as string)

        await updateProfile(user, { // Cập nhật displayName trong Firebase Authentication User Object
            displayName: data.username as string 
        })

        await createProfileUser(user, data.username)
        console.log("Người dùng đã đăng ký thành công và hồ sơ đã được lưu vào Firestore:", user.uid)

        return { 
            zodError: null, 
            success: true,
            firebaseError: 'Đăng ký thành công', 
            values: null 
        }
    } catch(e:any) {
        console.log(e.message)
        if (e.code === 'auth/email-already-in-use') {
            console.error("Lỗi: Email này đã được sử dụng bởi một tài khoản khác.")
            return { 
                zodError: null, 
                firebaseError: 'Email này đã được sử dụng bởi một tài khoản khác', 
                success: false,
                values: null
            }
        } else if (e.code === 'auth/password-does-not-meet-requirements') {
            console.error("Mật khẩu quá yếu (phải bao gồm chữ viết Hoa, chữ thường, số và ký tự đặc biệt)")
            return { 
                zodError: null, 
                firebaseError: 'Mật khẩu quá yếu (phải bao gồm chữ viết Hoa, chữ thường, số và ký tự đặc biệt)', 
                success: false,
                values: null
            }
        } else {
            console.error("Lỗi đăng ký:", e.message)
            return { 
                zodError: null, 
                firebaseError: 'Lỗi đăng ký tài khoản, vui lòng thử lại', 
                success: false,
                values: null
            }
        }
    }
}

export async function handleLoginWithEmailAndPassword(prevState: any, formData: FormData): Promise<FormState>{
    const data = Object.fromEntries(formData)
    try{
        const { user } = await signInWithEmailAndPassword(auth, data.email as string, data.password as string)
        console.log('Login rồi nhé')
        if(!user) {
            return { 
                zodError: null, 
                firebaseError: 'Không tìm thấy thông tin user', 
                success: false,
                values: null
            }
        }
        console.log("Đăng nhập thành công vào Firebase", user.uid)
        return { 
            zodError: null, 
            firebaseError: 'Đăng nhập thành công', 
            success: true,
            values: {
                email: user.email || '',
                username: user.displayName || '',
                password: ''
                // id: user.uid,
                // photoURL: user.photoURL,
            } 
        }
    } catch(e:any) {
        console.log(e.message)
        //  if(e.code === 'auth/account-exists-with-different-credential') {
        //     console.warn("Email của bạn đã tồn tại. Vui lòng đăng nhập bằng một phương thức đã dùng trước đây để liên kết tài khoản.")

        //     // Lấy email và thông tin đăng nhập (credential) đang chờ xử lý
        //     // conflictingEmail = e.customData.email as string
        //     // pendingCredential = (provider instanceof GoogleAuthProvider)
        //     // ? GoogleAuthProvider.credentialFromError(e)
        //     // : GithubAuthProvider.credentialFromError(e)
        //     console.log(e.code)
        //     console.dir(e)
        //     const credential = EmailAuthProvider.credential(data.email as string, data.password as string)
        //     console.log('credential', credential)
        //     // console.log('PendingCredential', pendingCredential)
        //     // alert(`Email của bạn (${conflictingEmail}) đã được đăng ký bằng một phương thức khác. Vui lòng đăng nhập bằng BẤT KỲ phương thức nào bạn đã sử dụng trước đây cho email này để liên kết tài khoản.`)
        //     // callback()
        //     return { 
        //     zodError: undefined, 
        //     firebaseError: 'Email của bạn đã tồn tại. Vui lòng đăng nhập bằng một phương thức đã dùng trước đây để liên kết tài khoản.', 
        //     success: true,
        //     values: {} 
        // }
        // }
        switch (e.code) {
        case 'auth/invalid-credential':
            console.error("Tài khoản hoặc mật khẩu không đúng")
            return { 
                zodError: null, 
                firebaseError: 'Tài khoản hoặc mật khẩu không đúng', 
                success: false,
                values: null 
            }

        case 'auth/user-disabled':
            console.error("Tài khoản của bạn đã bị vô hiệu hóa. Vui lòng liên hệ hỗ trợ")
            return { 
                zodError: null, 
                firebaseError: 'Tài khoản của bạn đã bị vô hiệu hóa. Vui lòng liên hệ hỗ trợ', 
                success: false,
                values: null 
            }

        case 'auth/invalid-email':
            console.error("Địa chỉ email không đúng định dạng. Vui lòng nhập lại")
            return { 
                zodError: null, 
                firebaseError: 'Địa chỉ email không đúng định dạng. Vui lòng nhập lại', 
                success: false,
                values: null 
            }

        case 'auth/network-request-failed':
            console.error("Không thể kết nối. Vui lòng kiểm tra kết nối internet của bạn và thử lại")
            return { 
                zodError: null, 
                firebaseError: 'Không thể kết nối. Vui lòng kiểm tra kết nối internet của bạn và thử lại',
                success: false, 
                values: null 

            }

        case 'auth/too-many-requests':
            console.error("Bạn đã thử đăng nhập quá nhiều lần. Vui lòng thử lại sau một thời gian ngắn")
            return { 
                zodError: null, 
                firebaseError: 'Bạn đã thử đăng nhập quá nhiều lần. Vui lòng thử lại sau một thời gian ngắn', 
                success: false,
                values: null 

            }

        default:
            console.error("Lỗi đăng nhập:", e.message)
            return { 
                zodError: null, 
                firebaseError: 'Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau',
                success: false, 
                values: null 

            }
        }
    }
}