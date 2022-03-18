import "./styles.scss"

import {FriendsRequests} from "./FriendsRequests"

export const Sidebar = () => {
    return (
        <div className="sidebar">
            <FriendsRequests requests={[{_id: "lol", last_name: "Kazantsev 🦈", first_name: "Dmitry", avatar: "dima.jpg"}]}/>
        </div>
    )
}