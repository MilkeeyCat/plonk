import {instance} from "./instance"
import {Post} from "../common/types/Post"
import {ResponseStatuses} from "./types/statuses.type"

type PostType = { text: string, imageVideo: File | string, voice: Blob | "", file: File | string }

export const postAPI = {
    sendPost: (payload: PostType) => {
        const formData = new FormData()


        Object.keys(payload).forEach(key => {
            if (payload[key as keyof PostType] !== "") {
                formData.append(key, payload[key as keyof PostType])
            }
        })
        // formData.append("text", payload.text)
        // formData.append("imageVideo", payload.imageVideo)
        // formData.append("voice", payload.voice as any)
        // if()
        const isFormDataEmpty = formData.entries().next().done

        if (!isFormDataEmpty) {
            return instance.post("/create-post", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                // .then(res => res.data)
                // .catch(err => console.log(err))
        }
    },
    getPosts() {
        return instance.get<Post[]>("/posts")
            .then(res => res.data)
            .catch(err => console.log(err))
    },

    postViewed(postId: number) {
        return instance.get(`/post-viewed/${postId}`)
    },

    sendComment(comment: string, postId: number) {
        return instance.post(`/comments/create/${postId}`, {comment})
    },

    sendReaction(postId: number, reaction: string) {
        return instance.post(`/posts/reaction/${postId}`, {reaction})
    },

    deletePost(postId: number) {
        try {
            return instance.delete(`/posts/delete/${postId}`)
        } catch (e) {
            console.log("IM DED")
        }
    }
}