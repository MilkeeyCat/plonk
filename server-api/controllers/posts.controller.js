class PostsController {
    createPost(req, res) {
        console.log(req.body)
        console.log(req.files)
        res.json('1')
    }
}

export default new PostsController()