import React from 'react'
import { useSelector } from 'react-redux'

const UserRoleCheck = ({role, children}) => {

  const user = useSelector((state) => state.auth.user);

  if(user && user.role === role){
    return <>{children}</>
  }

  return null;
}

export default UserRoleCheck