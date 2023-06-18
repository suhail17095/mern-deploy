import React, { useEffect, useState } from 'react'
import axios from "axios"
import {Link,useNavigate} from "react-router-dom"
axios.defaults.withCredentials = true

function Contact() {
  const Navigate=useNavigate()
  const [user,setUser]=useState({name:"",email:"",phone:"",message:""})
  useEffect(()=>
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
      // console.log("hello from about us react")
      setUser({
        name:res.data.name,
        email:res.data.email,
        phone:res.data.phone
      })
      // console.log(res.data)
     
    }).catch((err)=>
    {
      console.log(err)
      Navigate("/login")
    })
  },[])
  const handleChange=(e)=>
  {
    const name=e.target.name
    const value=e.target.value

    setUser({
      ...user,
      [name]:value
    })
  }

  const submit=()=>
  {
    console.log("hello world")
    const {name,email,phone,work}=user
    axios({
      method: 'post',
      url: "http://localhost:3002/submit_message",
      data: {name,email,phone,work},
      config: {
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      })
      .then(function (response) {
          //handle success
          alert(response.data)
      })
      .catch(function (response) {
          //handle error
          console.log(response);
      });
  }
  return (

    <div className="contact_info">
      <div className="container_fluid">
        <div className="row contact-row">
          <div className="col-lg-3 col-md-4 col-sm-6 col contact-col shadow">
            <i class="fa-solid fa-phone mr-2" style={{ color: "#3ccee2" }}></i>
            <div className="content">
              <div className="content_text">
                Phone
              </div>
              <div className="content_num">
                +91 9518987967
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col contact-col shadow">
            <i className='fa-solid fa-envelope mr-2 ' style={{ color: "#3ccee2" }}></i>
            <div className="content">
              <div className="content_text">
                Email
              </div>
              <div className="content_num">
                sohaihlshaikh17095@gmail.com
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 col contact-col shadow">
            <i className='fa-solid fa-address-book mr-2' style={{ color: "#3ccee2" }}></i>
            <div className="content">
              <div className="content_text">
                Address
              </div>
              <div className="content_num">
                Maharashtra,421002
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="input">
        <div className="contact_input shadow m-center">
          <h2>Get in Touch</h2>
          <div action="" className='contact-form'>
            <div className="row temp">
              <div className="col-sm-12">
                <div className="row">
                  <div className="col-lg-3 contact-item">
                    <input type="text" placeholder='Your Name' className='p-2' value={user.name} name='name' onChange={handleChange}/>
                  </div>
                  <div className="col-lg-3 contact-item">
                    <input type="email" placeholder='Email' className='p-2' value={user.email} name='email' onChange={handleChange}/>
                  </div>
                  <div className="col-lg-3 contact-item">
                    <input type="Number" placeholder='Your Phone Number' className='p-2' value={user.phone} name='number'onChange={handleChange}/>
                  </div>
                </div>
              </div>
              <div className="col-sm-12">
                <div>
                  <textarea name="message" value={user.messsage} id="" cols="20" rows="7" placeholder='Message' className='p-2' onChange={handleChange}></textarea>
                </div>
                <button className='btn btn-primary' onClick={submit}>
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact