"use client"
import dynamic from "next/dynamic";
import { useState } from "react";

let Editor = dynamic(() => import('../../../../components/CustomEditor'), { ssr: false })
function Page() {
    const [content, setContent] = useState(null);
    return (
        <div>
            <Editor
                data={content}
                onChange={(e) => setContent(e)}
                holder="editor_create"
            />
        </div>
    )
}

export default Page
