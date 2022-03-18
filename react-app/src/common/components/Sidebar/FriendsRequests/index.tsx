import "./styles.scss"
import {Avatar} from "../../Avatar"
import {Button} from "../../Button"

interface IProps {
    requests: {
        _id: string
        first_name: string
        last_name: string
        avatar: string
    }[]
}

export const FriendsRequests: React.FC<IProps> = ({requests}) => {
    return (
        <div className="friends-request">
            <div className="friends-requests__header">
                <h3>Requests</h3>
                <span>2</span>
            </div>

            <div className="friends-requests__inner">
                {requests.map(request => {
                    return (
                        <div className="friends-requests__item">
                            <div className="friends-requests__item-header">
                                <Avatar src={request.avatar}/>
                                <p className="friends-requests__item-text"><span className="friends-requests__item-name">{`${request.first_name} ${request.last_name}`}</span> wants to add you  to friends.</p>
                            </div>
                            <div className="friends-requests__item-btns">
                                <Button filled customStyles={{maxWidth: "47%", width: "100%"}}>Accept</Button>
                                <Button customStyles={{maxWidth: "47%", width: "100%"}}>Decline</Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}