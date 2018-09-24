import React from 'react'; 

const Comment = ({commentInfo}) => {

    return(
        <div>
            <p>{commentInfo.body}</p>
            <p className="comment-attributor">- by {commentInfo.user.username}</p>
        </div>
    )
}

export default Comment; 