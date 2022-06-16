import {Waveform} from "../../../pages/MainPageAuthtorized/Waveform"

interface Props {
    src: string,
    id?: number
}

export const AppAudio: React.FC<Props> = ({src, id}) => {
    return (
        <Waveform src={src} id={id} styles={{maxWidth: "60%"}}/>
    )
}