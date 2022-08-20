import React from 'react'
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Righbar from '../../components/rightbar/Rightbar';

import './Home.scss'

const Home = () => {
  return (
    <>
      <Topbar/>
        <div className='homeContainer'>
          <Sidebar />
          <Feed />
          <Righbar />
        </div>
    </>     
  )
}

export default Home