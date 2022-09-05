import React, { useEffect } from 'react'
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Righbar from '../../components/rightbar/Rightbar';
import './Home.scss'
import PostDetail from '../../components/postDetail/PostDetail';
import { useSelector } from 'react-redux';
import { selectCurrentPost } from '../../store/post/post.selector';


const Home = () => {
  const currentPost = useSelector(selectCurrentPost);

  return (
    <>
      <Topbar/>
      <div className='homeContainer'>
        <Sidebar />
        <Feed />
        <Righbar />
      </div>
      {currentPost && 
        <div>
          <PostDetail />
        </div>}
    </>     
  )
}

export default Home