import { MoreVert } from '@material-ui/icons';
import React, { useState } from 'react';
import { Users } from '../../dummyData';

import './Post.scss';

const Post = ({post}) => {
    const {desc, photo, date, userId, comment} = post;
    const [like, setLike] = useState(post.like);
    const [isLiked, setIsLiked] = useState(false);

    const likeHandler = () => {
        setLike(isLiked ? like-1 : like + 1);
        setIsLiked(!isLiked);
    }

  return (
    <div className='post'>
        <div className='postWrapper'>

            <div className='postTop'>
                <div className='postTopLeft'>
                    <img className='postProfileImg' src={`${Users.filter(user => user.id === userId)[0].profilePicture}`} alt=''/>
                    <span className='postUsername'>{Users.filter(user => user.id === userId)[0].username}</span>
                    <span className='postDate'>{date}</span>
                </div>
                <div className='postTopRight'>
                    <MoreVert />
                </div>
            </div>

            <div className='postCenter'>
                <span className='postText'>{desc}</span>
                <img className='postImg' src={`${photo}`} alt=''/>
            </div>

            <div className='postBottom'>
                <div className='postBottomLeft'>
                    <img className='likeIcon' src='/assets/like.png' alt='' onClick={likeHandler}/>
                    <img className='likeIcon' src='/assets/heart.png' alt='' onClick={likeHandler}/>
                    <span className='postLikeCounter'>{like} people like it</span>
                </div>
                <div className='postBottomRight'>
                    <span className='postCommentText'>{comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post