import React from 'react'
import { ChatState } from '../../context/ChatProvider'
import { cancel } from '../../assets'
import "./usermodel.css"
const UserModel = ({setShowModel}) => {

    const {user} = ChatState()
  return (
    <>
        <div className="profile-model">
            <img
              src={cancel}
              alt={cancel}
              className="profile-close"
              onClick={() => setShowModel(false)}
            />
            <div>
              <img src={user.picture} alt={user.picture} />
              <p>{user.name.toUpperCase()}</p>
              <h2>{user.email}</h2>
            </div>
          </div>
    </>
  )
}

export default UserModel