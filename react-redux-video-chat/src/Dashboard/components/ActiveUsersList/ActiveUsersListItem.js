import userAvatar from "../../../resources/userAvatar.png";

const ActiveUsersListItem = (props) => {
    const { activeUser } = props;

    const handleListItemPressed = () => {
        // Call to other user
    };

    console.log(activeUser);

    return (
        <div className='active_user_list_item' onClick={handleListItemPressed}>
            <div className='active_user_list_image_container'>
                <img className='active_user_list_image' src={userAvatar}/>
            </div>
            <span className='active_user_list_text'>{activeUser.username}</span>
        </div>
    );
};

export default ActiveUsersListItem;