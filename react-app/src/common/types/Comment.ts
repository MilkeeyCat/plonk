export interface Comment {
    author_id: number
    id: number,
    pub_date: Date,
    reply_id: number | null
    text: string,
    avatar: string,
    name: string
}
