import {instance} from "./instance"

export const postAPI = {
    sendPost: (payload: { text: string, imageVideo: File | string, voice: Blob | null, file: File | string }) => {
        const formData = new FormData()

        formData.append("text", payload.text)
        formData.append("imageVideo", payload.imageVideo)
        formData.append("voice", payload.voice as any)

        return instance.post("/create-post", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(res => res.data)
            .catch(err => console.log(err))
    }
}