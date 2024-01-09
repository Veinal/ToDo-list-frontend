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
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Deleted() {
    const [getDeleted, setGetDeleted] = useState([])
    const [count, setCount] = useState(0)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate()
    useEffect(() => {
        const userExists = JSON.parse(localStorage.getItem("userToken"))
        if (!userExists) {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userToken"))
        axios.get('http://localhost:7000/api/deleted/view', { headers: { "userToken": user } })
            .then((res) => {
                console.log(res.data, "res.data")
                setGetDeleted(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }, [count])

    const HandleRestore = (item) => {
        axios.delete(`http://localhost:7000/api/deleted/delete/${item._id}`)
            .then((res) => {
                console.log(res.data, "res.data")
                axios.put(`http://localhost:7000/api/notes/update/${item?.notes_id?._id}`, { status: 'unarchived' })
                    .then((res) => {
                        console.log(res.data)
                    }).catch((err) => {
                        console.log(err)
                    })
                setCount((prev) => !prev)
            }).catch((err) => {
                console.log(err)
            })
    }

    const HandleDelete = (item) => {
        axios.delete(`http://localhost:7000/api/deleted/delete/${item._id}`)
            .then((res) => {
                console.log(res.data, "res.data")
                setCount((prev) => !prev)
                handleClose()
            }).catch((err) => {
                console.log(err)
            })

        axios.delete(`http://localhost:7000/api/notes/delete/${item?.notes_id?._id}`)
            .then((res) => {
                console.log(res.data, "res.data")
                setCount((prev) => !prev)
                handleClose()
            }).catch((err) => {
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
                                                <span className=' font-semibold text-xl'>Name: {item?.notes_id?.name}</span>
                                                <p className=' text-gray-700'>{item?.notes_id?.description}</p>
                                            </div>

                                        </CardContent>
                                        <CardActions style={{ position: 'relative', top: '40%', left: '50%' }}>
                                            <Tooltip title="restore"><Button color='inherit' onClick={() => HandleRestore(item)} ><RestoreIcon /></Button></Tooltip>
                                            <Tooltip title="delete"><Button color='error' onClick={handleOpen} ><DeleteIcon /></Button></Tooltip>
                                        </CardActions>
                                    </Card>
                                    {/* delete modal */}
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <p className=' font-medium text-xl mb-3'>Do you want to permamently delete this note?</p>
                                            <div className=' flex gap-4 justify-end '>
                                                <button onClick={() => HandleDelete(item)} style={{ borderRadius: '5px' }} className=' bg-green-600 py-2 px-4 text-white font-semibold'>DELETE</button>
                                                <button onClick={handleClose} style={{ borderRadius: '5px' }} className='bg-red-600 py-2 px-3 text-white font-semibold'>CANCEL</button>
                                            </div>
                                        </Box>
                                    </Modal>
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
