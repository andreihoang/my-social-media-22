import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user/user.selector';
import { useDispatch } from 'react-redux';
import { fetchPostStart, fetchPostSuccess, fetchPostFailure } from '../../store/post/post.action';
import { selectPosts } from '../../store/post/post.selector';

import './Feed.scss';

const Feed = ({username}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const posts = useSelector(selectPosts);
  const adjustedPosts = posts.sort((p1, p2) => {
    return new Date(p2.createdAt) - new Date(p1.createdAt);
  });
  
  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(fetchPostStart());
      try {
        const res = username 
          ? await axios.get(`/posts/profile/${username}`)
          : await axios.get(`/posts/timeline/${currentUser?._id}`)
       
        
        const newPosts = await res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        });

        dispatch(fetchPostSuccess(newPosts));

      } catch(err) {
        dispatch(fetchPostFailure(err));
      }
    }
    fetchPosts();
  }, [username, currentUser._id])

  return (
    <div className='feed'>
        <div className='feedWrapper'>
          {(!username || currentUser.username === username) && <Share/>}
          {
            adjustedPosts.map(post => (
            <Post key={post._id} post={post}/>
            ))
          }
        </div>
    </div>           
  )
}

export default Feed;