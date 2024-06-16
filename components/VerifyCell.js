// components/VerifyButton.js

import { use, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const VerifyButton = ({ applicantId, verified }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const handleVerify = async () => {
        // "use server"
        setLoading(true)
        console.log(applicantId, "------------------------in habdle")
        try {
            const res = await fetch(`/api/admin-dashboard/teachers/${applicantId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ verified: true })

            })
            if (res.ok) {
                setLoading(false)
                router.refresh();
                // revalidatePath("/admin-dashboard/teachers")
            }
        } catch (error) {
            console.error(error)
        }
        setLoading(false)


    }

    return (
        // <DropdownMenu>
        //     <DropdownMenuTrigger asChild>
        //         <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
        //             <span className="sr-only">Open menu</span>
        //             <IoIosMore className="h-4 w-4" />
        //         </Button>
        //     </DropdownMenuTrigger>
        //     <DropdownMenuContent align="end">
        //         <DropdownMenuLabel>Actions</DropdownMenuLabel>
        //         <DropdownMenuItem onClick={() => navigator.clipboard.writeText(userId)}>
        //             Copy user ID
        //         </DropdownMenuItem>
        //         <DropdownMenuSeparator />
        //         <DropdownMenuItem>

        //         </DropdownMenuItem>
        //         <DropdownMenuItem>View details</DropdownMenuItem>
        //     </DropdownMenuContent>
        // </DropdownMenu>
        <>
            {verified ? (
                <Button size="sm" onClick={handleVerify} disabled={loading}>
                    {loading ? 'Unverifying...' : 'Un verify'}
                </Button>
            ) : (
                <Button size="sm" onClick={handleVerify} disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify'}
                </Button>
            )}
        </>
    );
};

export default VerifyButton;
