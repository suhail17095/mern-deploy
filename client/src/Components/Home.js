import React, { useEffect, useState } from 'react'
import axios from "axios"
axios.defaults.withCredentials=true

function Home() {
  const [name,setName]=useState("")
  const check=()=>
  {
    axios({
      method: 'get',
      url: "https://mern-deploy-production.up.railway.app/home",
      config: {
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      }).then((res)=>
      {
        setName(res.data.name)
        console.log(res)
      }).catch((err)=>
      {
        console.log(err);
      })
  }
  useEffect(()=>
  {
    check()
  },[])
  return (
    <div className='home'>
      <p>WELCOME</p>
      <div>
        <h1>{name}</h1>
        <h1>{name == ""?"We are the MERN developer":"Happy, to see you back"}</h1>
      </div>
    </div>
  )
}

export default Home