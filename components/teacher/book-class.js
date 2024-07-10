// "use client"
export async function updateClassLink(classId, body) {
    const res = await fetch(`/api/teacher/handle-classes/${classId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    return await res.json()
}


// export async function checkOrCreateStreamUser()