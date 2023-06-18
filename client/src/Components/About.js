import React, { useEffect, useState } from 'react'
import Suhail from "../Images/Suhail.png"
import axios from "axios"
import {Link,useNavigate} from "react-router-dom"

axios.defaults.withCredentials = true

function About() {
  const Navigate=useNavigate()
  const [user,setUser]=useState({name:"",email:"",phone:"",work:""})
    const aboutPage=()=>
    {
      axios.post("http://localhost:3002/about",{
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(async(res)=>
      {
        console.log(res.status)
        const s=await res.status
          if(s != 200)
          {
            throw new Error(res.error)
          }
        console.log("hello from about us react")
        setUser(
          {
            name:res.data.name,
            email:res.data.email,
            phone:res.data.phone,
            work:res.data.work,
          }
        )
        console.log(res.data)
       
      }).catch((err)=>
      {
        console.log(err)
        Navigate("/login")
      })
    }
    useEffect(()=>
    {

      aboutPage();
    },[])
  return (
    <section className=''>
      <div className="container about-container shadow mt-4">
        <div className="row mt-4">
          <div className="col-md-4" >
            <img src={Suhail} alt="" style={{ width: "130px" }} />
          </div>
          <div className="col-md-6">
            <h5>{user.name}</h5>
            <h6>{user.work}</h6>
            <p>RANKINGS <span>1/10</span></p>
            <ul class="nav nav-tabs" role='tablist'>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#home" id='home-tab' data-toggle="tab" role='tab'>About</a>
              </li>
              {/* <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#profile" id='profile-tab' data-toggle="tab" role='tab'>Timeline</a>
              </li> */}
            </ul>
          </div>
          <div className="col-md-2">
            <button className='btn btn-secondary'>
              Edit Profile
            </button>
          </div>
        </div>
        <div className="row m-3">
          <div className="col-md-4 ">
            <div className="profile-work">
              <a href="www.youtube.com">Youtube</a> <br />
              <a href="www.youtube.com">Instagram</a> <br />
              <a href="www.youtube.com">Web Developer</a> <br />
              <a href="www.youtube.com">figma</a> <br />
              <a href="www.youtube.com">Youtube</a> <br />
              <a href="www.youtube.com">Youtube</a><br />
            </div>
          </div>
          
          <div className="col-md-8">
            <div >
              <div>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="">User Id</label>
                  </div>
                  <div className="col-md-6" style={{ color: "blue" }}>
                    suhail_shaikh
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="">Name</label>
                  </div>
                  <div className="col-md-6" style={{ color: "blue" }}>
                    {user.name}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="">Email</label>
                  </div>
                  <div className="col-md-6" style={{ color: "blue" }}>
                  {user.email}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="">Phone</label>
                  </div>
                  <div className="col-md-6" style={{ color: "blue" }}>
                  {user.phone}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="">Profession</label>
                  </div>
                  <div className="col-md-6" style={{ color: "blue" }}>
                  {user.work}
                  </div>
                </div>
              </div>
            </div>

          </div>

       

        </div>
      </div>

    </section>
  )
}

export default About