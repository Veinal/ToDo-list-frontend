import React from 'react'
import Sidebar from './Sidebar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Footer from './Footer';
import { useState } from 'react';
import axios from 'axios';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';

export default function Deleted() {
    const [getDeleted, setGetDeleted] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:7000/api/deleted/view')
        .then((res)=>{
            console.log(res.data,"res.data")
            setGetDeleted(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const HandleRestore = (item) => {
        axios.delete(`http://localhost:7000/api/deleted/restore/${item._id}`)
        .then((res)=>{
            console.log(res.data,"res.data")
        }).catch((err)=>{
            console.log(err)
        })
    }

    const HandleDelete = (item) => {
        axios.delete(`http://localhost:7000/api/deleted/delete/${item._id}`)
        .then((res)=>{
            console.log(res.data,"res.data")
        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div>
            <div className="flex min-h-screen flex-row bg-gray-100 text-gray-800">
                <div>
                    <Sidebar />
                </div>
                <div className="flex flex-col min-h-full w-full p-10 bg-white shadow-md m-4">
                    <h1 className=' text-center font-bold text-4xl underline mb-6'>DELETED</h1>

                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 px-10'>
                        {getDeleted.map((item, index) => {
                            return (
                                <>
                                    <Card sx={{ width: 300, height: 256, border: '2px solid gray' }} variant='outlined'>
                                        <CardContent>
                                            <div className='flex flex-col gap-1'>
                                                <span className=' font-semibold text-xl'>Name: {item.name}</span>
                                                <p className=' text-gray-700'>{item.description}</p>
                                            </div>
    
                                        </CardContent>
                                        <CardActions style={{position:'relative',top:'40%',left:'50%'}}>
                                            <Tooltip title="restore"><Button color='inherit' onClick={() => HandleRestore(item)} ><RestoreIcon/></Button></Tooltip>
                                            <Tooltip title="delete"><Button color='error' onClick={() => HandleDelete(item)} ><DeleteIcon/></Button></Tooltip>
                                        </CardActions>
                                    </Card>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
