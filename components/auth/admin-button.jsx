import { auth } from "@/auth"
import Link from "next/link"
async function AdminButton() {
    session = await auth()
    const userRole = session?.user.role
    return (
        <>
            {userRole === "admin" && <Link href="/admin-dashboard">Admin</Link>}
        </>

    )
}

export default AdminButton
