import React, {CSSProperties, useEffect, useState} from "react"
import WaveSurfer from "wavesurfer.js"
import {FaPlay, FaPause} from "react-icons/fa"
import "./styles.scss"

interface IProps {
    src: string | null,
    id?: number,
    styles?: CSSProperties
}

export const Waveform: React.FC<IProps> = React.memo(({src, id, styles}) => {
    const [waveform, setWaveform] = useState<any>(null)
    const [playing, setPlaying] = useState(false)

    useEffect(() => {
        setWaveform(WaveSurfer.create({
            container: `#waveform_${id}`,
            waveColor: "#ddd",
            progressColor: "#8569ff",
            cursorColor: "#fff",
            barWidth: 3,
            barMinHeight: 1,
            barRadius: 3,
            cursorWidth: 0,
            height: 40,
            barGap: 2,
        }))
    }, [])

    useEffect(() => {
        if (waveform !== null) {
            const track: any = document.querySelector(`#track_${id}`)
            waveform.load(track)

            waveform.on("pause", () => {
                setPlaying(false)
                waveform.seekTo(0)
            })
        }
    }, [waveform])

    const handlePlay = () => {
        waveform?.playPause()
        setPlaying(!playing)
    }

    return (
        <div className="waveform" style={styles}>
            <div className="waveform__play-btn" onClick={handlePlay}>
                {!playing && <FaPlay size={"16px"}/>}
                {playing && <FaPause size={"16px"}/>}
            </div>
            <div id={`waveform_${id}`} className="waveform__inner"></div>
            <audio id={`track_${id}`} src={src ?? ""}/>
        </div>
    )
})