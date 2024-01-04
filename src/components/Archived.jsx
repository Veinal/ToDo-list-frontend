import React from 'react'
import Sidebar from './Sidebar'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import Footer from './Footer';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';

export default function Archived() {
    const [getArchived, setGetArchived] = useState([])
    const [count, setCount] = useState(0)
    const [open, setOpen] = React.useState(false);
    const handleOpen = (item) => {
        setOpen(true);

    }
    const handleClose = () => setOpen(false);

    useEffect(() => {
        axios.get('http://localhost:7000/api/archived/view')
            .then((res) => {
                console.log(res.data, "res.data")
                setGetArchived(res.data)
            }).catch((err) => {
                console.log(err, 'err')
            })
    }, [count])

    const HandleDelete = (item) => {
        axios.delete(`http://localhost:7000/api/archived/delete/${item._id}`)
            .then((res) => {
                console.log(res.data, 'res.data')
                setCount((prev) => !prev)

                axios.put(`http://localhost:7000/api/notes/update/${item?.notes_id?._id}`, { status: 'unarchived' })
                    .then((res) => {
                        console.log(res.data, "unarchived successfully")
                    })
                    .catch((err) => {
                        console.log(err, "err")
                    })
            })
            .catch((err) => {
                console.log(err, "err");
            })
    }

    return (
        <div>
            <div className="flex min-h-screen flex-row bg-gray-100 text-gray-800">
                <div>
                    <Sidebar />
                </div>
                <div className="flex flex-col min-h-full w-full p-10 bg-white shadow-md m-4">
                    <h1 className=' text-center font-bold text-4xl underline mb-6'>ARCHIVED</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 px-10">
                        {getArchived.map((item, index) => {
                            return (
                                <>
                                    <Card sx={{ width: 300, height: 256, border: '2px solid gray' }} variant='outlined'>
                                        <CardContent>
                                            <div className='flex flex-col gap-1'>
                                                <span className=' font-semibold text-xl'>Name: {item.notes_id?.name} </span>
                                                <p className=' text-gray-700'>{item?.notes_id?.description}</p>
                                            </div>

                                        </CardContent>
                                        <CardActions className=' relative top-28 left-3/4'>
                                            <Tooltip title="unarchive"><Button onClick={() => HandleDelete(item)}><UnarchiveIcon style={{fontSize:'27px'}}/></Button></Tooltip>
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
