import React, { createContext, useState } from 'react'

export const ProfileContext = createContext()

const ProfileProvider = ({children}) => {

    const [userProfile, setUserProfile] = useState('')
    const [follower, setFollower] = useState([])
    const [following, setFollowing] = useState([])
    const [posts, setPosts] = useState([])

  return (
    <ProfileContext.Provider value={{userProfile, setUserProfile, follower, setFollower, following, setFollowing,posts, setPosts }}>
        {children}
    </ProfileContext.Provider>
  )
}

export default ProfileProvider