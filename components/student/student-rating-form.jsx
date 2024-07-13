import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'


function StudentRatingForm({ demoClass }) {
    return (
        <Dialog>
            <DialogTrigger>
                <Button>
                    Rate your class
                </Button>

            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> Demo Class Feedback  </DialogTitle>
                    <DialogDescription>
                        We value your feedback! Please take a moment to rate your demo class and share your thoughts with us. Your feedback helps us improve our services.
                    </DialogDescription>
                </DialogHeader>

            </DialogContent>
        </Dialog>

    )
}

export default StudentRatingForm
