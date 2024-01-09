import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function TodoModal({handleClose,setCount}) {
  const [todo,setTodo]=useState()
  const [user,setUser]=useState('')

  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("userToken"))
    setUser(user)
  },[])

  const HandleChange=(e)=>{
    setTodo({...todo,[e.target.name]:e.target.value})
  }

  const HandleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:7000/api/notes/insert',todo,{headers:{"userToken":user}})
    .then((res)=>{
      console.log(res.data,"res.data")
      setCount((prev)=>!prev)
      handleClose()
    })
    .catch((err)=>{
      console.log(err,"err")
    })
  }

  return (
    <div className="p-2 rounded-md w-96 mx-auto">
      <h2 className="text-center font-bold text-4xl mb-6">INSERT DATA:</h2>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex flex-col items-start w-full">
          <label className="text-2xl" htmlFor="name">
            Title:
          </label>
          <input
            className="w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:border-blue-500"
            id="name"
            name='name'
            type="text"
            placeholder="Enter Name"
            onChange={(e)=>HandleChange(e)}
          />
        </div>
        <div className="flex flex-col items-start w-full">
          <label className="text-2xl" htmlFor="desc">
            Description:
          </label>
          <textarea
            className="w-full px-4 py-2 border-2 rounded-md focus:outline-none focus:border-blue-500 resize-none"
            id="desc"
            name='description'
            rows="4"
            placeholder="Enter Description"
            onChange={(e)=>HandleChange(e)}
          ></textarea>
        </div>
      </div>
      {/* remove handleClose */}
      <button onClick={HandleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 block mx-auto hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
        ADD 
      </button>
    </div>
  );
}
