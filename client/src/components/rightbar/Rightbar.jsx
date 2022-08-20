import React from 'react';
import { Users } from '../../dummyData';
import Online from '../online/Online';

import './Rightbar.scss'

const Righbar = ({ profile }) => {

  const HomeRightBar = () => {
    return (
      <>
        <div className='birthdayContainer'>
          <img className='birthdayImg' src='assets/gift.png' alt=''/>
          <span className='birthdayText'>
            <b>Bon</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img className='rightbarAd' src='assets/ad.png'/>
        <h4 className='rightbarTitle'>Online Friends</h4>
        <ul className='rightbarFriendList'>
            {Users.map(user => (
              <Online key={user.id} user={user}/>
            ))}
        </ul>
      </>
    )
  }

  const ProfileRightBar = () => {
    return (
      <>
        <h4 className='rightbarTitle'>User Information</h4>
        <div className='rightbarInfo'>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>City: </span>
            <span className='rightbarInfoValue'>Nha Trang</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>From: </span>
            <span className='rightbarInfoValue'>Viet Nam</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Relationship: </span>
            <span className='rightbarInfoValue'>Single</span>
          </div>
        </div>
        <h4 className='rightbarTitle'>User friends</h4>
        <div className='rightbarFollowings'>
          <div className='rightbarFollowing'>
            <img className='rightbarFollowingImg' src='assets/person/9.jpeg' alt=''/>
            <span className='rightbarFollowingName'>Su Su</span>
          </div>
          <div className='rightbarFollowing'>
            <img className='rightbarFollowingImg' src='assets/person/9.jpeg' alt=''/>
            <span className='rightbarFollowingName'>Su Su</span>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
       {profile ? <ProfileRightBar/> : <HomeRightBar/>}
      </div>
    </div>
  )
}

export default Righbar;