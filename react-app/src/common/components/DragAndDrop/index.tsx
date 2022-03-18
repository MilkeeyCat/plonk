import classnames from "classnames"
import "./styles.scss"
import {useEffect, useRef, useState} from "react"
import {FaTimes} from "react-icons/fa"

interface IProps {
    className?: string,
    handleDrop: (...args: any[]) => void,
    handleCancel: (...args: any[]) => void,
    allowedExtensions: any[]
}

export const DragAndDrop: React.FC<IProps> = ({allowedExtensions, className, handleCancel, children, ...props}) => {
    const dropRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [dragging, setDragging] = useState(false)
    const [error, setError] = useState<null | string>(null)
    let [dropCounter, setDropCounter] = useState(0)
    const [postImageUrl, setPostImageUrl] = useState("")
    const [fileExtension, setFileExtension] = useState("")
    const [fileName, setFileName] = useState("")
    const imageExtensions = ["png", "jpeg", "webp"]
    const videoExtensions = ["mp4", "webm"]

    const handleDrag = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
    }
    const handleDragIn = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setDropCounter(dropCounter++)
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setDragging(true)
        }
    }
    const handleDragOut = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setDropCounter(dropCounter--)
        if (dropCounter-- > 0) return
        setDragging(false)
    }

    const handleDrop = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        setDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            props.handleDrop(e.dataTransfer.files)
            // e.dataTransfer.clearData()
            setDropCounter(0)
            const reader = new FileReader()
            reader.readAsDataURL(e.dataTransfer.files[0])
            setFileName(e.dataTransfer.files[0].name)
            reader.onload = (e) => {
                const result = e.target?.result as string
                const extension = result.match(/data:\w+\/(?<extension>.+);base64/)?.groups?.extension ?? ""
                console.log(allowedExtensions.includes(extension), allowedExtensions, extension)
                if (!allowedExtensions.includes(extension) && allowedExtensions.length !== 0) {
                    setFileExtension("")
                    setPostImageUrl("")
                    setFileName("")
                    setError("Your file is strange.")
                    return
                }
                setPostImageUrl(result)
                setFileExtension(extension)
                setError(null)
            }
        }
    }

    useEffect(() => {
        let div = dropRef.current
        div?.addEventListener("dragenter", handleDragIn)
        div?.addEventListener("dragleave", handleDragOut)
        div?.addEventListener("dragover", handleDrag)
        div?.addEventListener("drop", handleDrop)

        return () => {
            div?.removeEventListener("dragenter", handleDragIn)
            div?.removeEventListener("dragleave", handleDragOut)
            div?.removeEventListener("dragover", handleDrag)
            div?.removeEventListener("drop", handleDrop)
        }
    }, [])

    // useEffect()

    return (
        <div ref={dropRef} className={classnames("drag-and-drop", {[className as string]: className})}>
            <div
                onClick={() => !fileName && inputRef.current?.click()}
                className={classnames("drag-and-drop__inner", {"drag-and-drop__inner_active": dragging}, {"drag-and-drop__inner_error": error})}>
                {postImageUrl &&
                <div className="drag-and-drop__image">
                    <button className="drag-and-drop__image-cancel-btn" onClick={() => {
                        handleCancel()
                        setFileName("")
                        setFileExtension("")
                        setPostImageUrl("")
                    }
                    }><FaTimes/></button>
                    {imageExtensions.includes(fileExtension) && <img src={postImageUrl} alt="post image url"/>}
                    {videoExtensions.includes(fileExtension) &&
                    <video controls>
                        <source src={postImageUrl}/>
                    </video>}
                    {!imageExtensions.includes(fileExtension) && !videoExtensions.includes(fileExtension) &&
                        <div className="drag-and-drop__file-name">{fileName}</div>
                    }
                </div>}
                {error}
                <input type="file" onChange={(e) => {
                    // @ts-ignore
                    if (!e.target.files.length) return
                    // @ts-ignore
                    props.handleDrop(e?.target?.files)
                    const reader = new FileReader()
                    // @ts-ignore
                    console.log(e?.target?.files[0] as any)
                    // @ts-ignore
                    reader.readAsDataURL(e?.target?.files[0])
                    // @ts-ignore
                    setFileName(e?.target?.files[0].name)
                    reader.onload = (e) => {
                        const result = e.target?.result as string
                        const extension = result.match(/data:\w+\/(?<extension>.+);base64/)?.groups?.extension ?? ""
                        if (!allowedExtensions.includes(extension) && allowedExtensions.length !== 0) {
                            setFileExtension("")
                            setPostImageUrl("")
                            setFileName("")
                            setError("Your file is strange.")
                            return
                        }
                        setPostImageUrl(result)
                        setFileExtension(extension)
                        setError(null)
                    }
                }} className="drag-and-drop__file-input" ref={inputRef}/>
                {!postImageUrl && !error &&
                <>
                    {children}
                </>
                }
            </div>
        </div>
    )
}