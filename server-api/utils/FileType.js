const MIME_TYPE_MAP = {
    image: {
        "image/png": "png",
        "image/jpeg": "jpeg",
        "image/jpg": "jpg",
        "image/svg+xml": "svg"
    },
    audio: {
        "audio/wav": "wav",
    },
    video: {
        "video/x-matroska": "mkv",
        "video/mp4": "mp4",
    }
}

export const fileType = (file) => {
    let result = null
    Object.keys(MIME_TYPE_MAP).forEach(key => {
        console.log(!!MIME_TYPE_MAP[key][file?.mimetype])
        if(!!MIME_TYPE_MAP[key][file?.mimetype]) {
            result = {type: key, ext: MIME_TYPE_MAP[key][file?.mimetype]}
        }
    })
    return result
}