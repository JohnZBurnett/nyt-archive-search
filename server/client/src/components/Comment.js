import React from 'react'; 

const Comment = ({commentInfo}) => {

    return(
        <div>
            <p>{commentInfo.body} - by {commentInfo.user.username}</p>
        </div>
    )
}

export default Comment; 