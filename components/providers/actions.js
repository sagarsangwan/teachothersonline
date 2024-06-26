"use server"

import { auth } from "@/auth"
import { StreamClient } from "@stream-io/node-sdk"

export async function getToken() {
    const streamApiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY
    const streamApiSecret = process.env.STREAM_VIDEO_API_SECRET
    if (!streamApiKey || !streamApiSecret) {
        throw new Error("---------------")
    }
    const session = await auth()
    const user = session.user
    if (!session) {
        throw new Error("not authenticated")
    }
    const streamClient = new StreamClient(streamApiKey, streamApiSecret)
    const expirationTime = Math.floor(Date.now() / 1000) * 60 * 60
    const issuedAt = Math.floor(Date.now() / 1000) - 60
    const token = streamClient.createToken(user.id, expirationTime, issuedAt)
    console.log("successfully created token")
    return token

}