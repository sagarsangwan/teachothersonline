import { auth } from '@/auth'
import TeacherForm from '@/components/teacher/teacher-application-form'
import { revalidatePath } from 'next/cache'
async function teacherapplication() {
    const session = await auth()
    if (!session) {
        revalidatePath('/api/auth/login/callback=teacherapplication')
    }
    return (
        <div className=''>
            <div className='justify-center items-center flex flex-col py-7'>
                <p>
                    Hii {session.user.name}! We are excited to have you on board. Please fill the form below to apply as a teacher. We will get back to you soon.
                </p>

            </div>
            <TeacherForm />
        </div>
    )
}

export default teacherapplication
