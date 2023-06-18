import React,{useEffect} from 'react'
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"
function Logout() {
    const Navigate=useNavigate()
    useEffect(()=>
    {
        axios({
            method: 'get',
            url: "http://localhost:3002/logout",
            config: {
              withCredentials: true,
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              }
            }
            }).then((res)=>
            {
                if(res.status === 200)
                {
                    console.log(res.data)
                    alert(res.data)
                    Navigate("/login")
                }
                else{
                    throw new Error("logout failed")
                }

            }).catch((err)=>
            {
                console.log(err)
            })
    },[])
  return (
    <div>Logout</div>
  )
}

export default Logout