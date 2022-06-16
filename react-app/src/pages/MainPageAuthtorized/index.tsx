import {Avatar} from "../../common/components/Avatar"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "../../store/state"
import "./styles.scss"
import {AiOutlineFileText, AiOutlinePicture, AiOutlineSmile} from "react-icons/ai"
import {BsFillStopFill} from "react-icons/bs"
import {MdKeyboardVoice} from "react-icons/md"
import {PopUp} from "../../common/components/PopUp"
import {useEffect, useState} from "react"
import {Button} from "../../common/components/Button"
import classnames from "classnames"
import {useReactMediaRecorder} from "react-media-recorder"
import {Waveform} from "./Waveform"
import {Field, Form, Formik} from "formik"
import {DragAndDrop} from "../../common/components/DragAndDrop"
import {ReceiveAndSetPosts, SendPost} from "../../store/thunk/post"
import {FaTrashAlt} from "react-icons/fa"
import {Posts} from "../../common/components/Posts"

export const MainPageAuthtorized: React.FC = () => {
    const dispatch = useDispatch()

    const user = useSelector((state: RootState) => state.userReducer.user)
    const posts = useSelector((state: RootState) => state.postsReducer.posts)
    const [isPopUpVisible, setIsPopUpVisible] = useState(false)
    const [isTextAreaVisible, setIsTextAreaVisible] = useState(true)
    const [isVoiceRecorderVisible, setIsVoiceRecorderVisible] = useState(false)
    const [voiceMessageBlob, setVoiceMessageBlob] = useState<Blob | "">("")
    const [isImageVideoVisible, setIsImageVideoVisible] = useState(false)
    const [isFileVisible, setIsFileVisible] = useState(false)

    const {
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
        clearBlobUrl
    } = useReactMediaRecorder(
        {
            audio: true, onStop: (blobUrl, blob) => {
                setVoiceMessageBlob(blob)
            }
        }
    )

    useEffect(() => {
        //load posts here. you know
        dispatch(ReceiveAndSetPosts())
    }, [])

    return (
        <>
            <div className="create-post-form">
                <Avatar src={user.avatar}/>
                <div className="create-post-form__input-container">
                    <input type="text" className="create-post-form__input" onClick={() => setIsPopUpVisible(true)}
                           placeholder="Type here everything you want."/>
                    <div className="create-post-form__media-content">
                        <AiOutlineSmile size={"24px"}/>
                        <AiOutlineFileText size={"24px"} onClick={() => {
                            setIsPopUpVisible(true)
                            setIsFileVisible(true)
                            setIsTextAreaVisible(true)
                            setIsVoiceRecorderVisible(false)
                            setIsImageVideoVisible(false)
                        }}/>
                        <AiOutlinePicture size={"24px"} onClick={() => {
                            setIsPopUpVisible(true)
                            setIsTextAreaVisible(true)
                            setIsVoiceRecorderVisible(false)
                            setIsFileVisible(false)
                            setIsImageVideoVisible(true)
                        }}/>
                        <MdKeyboardVoice size={"24px"} onClick={() => {
                            setIsPopUpVisible(true)
                            setIsVoiceRecorderVisible(true)
                            setIsTextAreaVisible(false)
                            setIsFileVisible(false)
                            setIsImageVideoVisible(false)
                        }}/>
                    </div>
                </div>
            </div>
            <PopUp visible={isPopUpVisible} onClose={() => setIsPopUpVisible(false)} title={"Create post"}
                   width={"570px"} styles={{padding: "20px"}}>
                <Formik initialValues={{
                    text: "",
                    imageVideo: "",
                    file: "",
                    voice: ""
                } as { text: string, imageVideo: string | File, file: string | File, voice: string }}
                        onSubmit={(values, {resetForm}) => {
                            dispatch(SendPost({
                                text: values.text,
                                imageVideo: values.imageVideo,
                                voice: voiceMessageBlob,
                                file: values.file
                            }, () => {
                                resetForm()
                                setIsPopUpVisible(false)
                            }))
                        }}>
                    {({values, setFieldValue}) => {

                        if (values.imageVideo) console.log(values.imageVideo)

                        if (status === "stopped" && values.voice === "" && mediaBlobUrl !== null) setFieldValue("voice", mediaBlobUrl)

                        return (
                            <Form>
                                <Field
                                    name="text"
                                    className={classnames("new-post__textarea", {"new-post__textarea_hidden": !isTextAreaVisible})}
                                    placeholder="Type here everything you want."
                                    as="textarea"/>
                                <div
                                    className={classnames("new-post__voice-recorder", {"new-post__voice-recorder_hidden": !isVoiceRecorderVisible})}>

                                    {values.voice === "" &&
                                    <button type="button" className="new-post__voice-recorder-btn"
                                            onMouseDown={startRecording} onMouseUp={stopRecording}>
                                        {status === "recording" && <BsFillStopFill size={"20px"}/>}
                                        {(status === "stopped" || status === "idle") &&
                                        <MdKeyboardVoice size={"20px"}/>}
                                    </button>
                                    }
                                    {status === "stopped" && mediaBlobUrl ?
                                        <Waveform src={mediaBlobUrl} id={0}/> : false}
                                    {status === "stopped" && mediaBlobUrl && console.log(voiceMessageBlob)}
                                    {values.voice !== "" &&
                                    <button type="button" onClick={() => {
                                        clearBlobUrl()
                                        setFieldValue("voice", "")
                                        setVoiceMessageBlob("")
                                    }} className="new-post__voice-recorder-btn new-post__voice-recorder-delete">
                                        <FaTrashAlt/></button>
                                    }
                                </div>
                                <DragAndDrop allowedExtensions={["png", "jpeg", "webp", "mp4", "webm"]}
                                             handleDrop={(files) => {
                                                 setFieldValue("imageVideo", files[0])
                                             }} handleCancel={() => {
                                    setFieldValue("imageVideo", "")
                                }}
                                             className={classnames("new-post__image-video", {"new-post__image-video_hidden": !isImageVideoVisible})}>
                                    <AiOutlinePicture size={"40px"}/>
                                    <p>Click or drop a photo/video here</p>
                                </DragAndDrop>

                                <DragAndDrop allowedExtensions={[]} handleDrop={(files) => {
                                    setFieldValue("file", files[0])
                                }} handleCancel={() => {
                                    setFieldValue("file", "")
                                }}
                                             className={classnames("new-post__document", {"new-post__document_hidden": !isFileVisible})}>
                                    <AiOutlineFileText size={"40px"}/>
                                    <p>Click or drop a file here</p>
                                </DragAndDrop>
                                <div className="new-post__btns">
                                    <button type="button" onClick={() => {
                                        setIsImageVideoVisible(!isImageVideoVisible)
                                        setIsTextAreaVisible(true)
                                        setIsFileVisible(false)
                                        setIsVoiceRecorderVisible(false)
                                    }}><AiOutlinePicture size={"20px"}/> Photo/Video
                                    </button>
                                    <button type="button" onClick={() => {
                                        setIsTextAreaVisible(true)
                                        setIsFileVisible(!isFileVisible)
                                        setIsVoiceRecorderVisible(false)
                                        setIsImageVideoVisible(false)
                                    }}><AiOutlineFileText size={"20px"}/> File/Document
                                    </button>
                                    <button type="button" onClick={() => {
                                        setIsTextAreaVisible(!isTextAreaVisible)
                                        setIsVoiceRecorderVisible(!isVoiceRecorderVisible)
                                        setIsFileVisible(false)
                                        setIsImageVideoVisible(false)
                                    }}><MdKeyboardVoice size={"20px"}/> Voice
                                    </button>
                                </div>
                                <Button type="submit" className="new-post__submit"
                                        filled={Object.values(values).some(e => e !== "")}>Submit.</Button>
                            </Form>
                        )
                    }}
                </Formik>
            </PopUp>
            <Posts posts={posts}/>
        </>
    )
}