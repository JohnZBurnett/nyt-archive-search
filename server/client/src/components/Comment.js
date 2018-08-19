import React from 'react'; 

const Comment = ({commentInfo}) => {

    return(
        <div>
            <p>{commentInfo.body}</p>
        </div>
    )
}