import React, {Component} from 'react';

const Badge = ({sub, deleteSub}) =>{
  return(
    <span className="badge badge-danger text-light p-2 m-1">
      {sub}
      <span className="ml-2 cursor-pointer" onClick={()=>{deleteSub(sub)}}>x</span>
    </span>
  )
}

export default Badge;
