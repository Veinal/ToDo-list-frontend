import React from 'react'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import '../HomeCard.css'
import ToDoimg from '../To-Do List.svg'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TodoModal from './TodoModal'
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Sidebar from './Sidebar'
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Notes() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selected, setSelected] = useState('')

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = (item) => {
    setOpen2(true);
    setSelected(item)
  }
  const handleClose2 = () => setOpen2(false);

  const [getNotes, setGetNotes] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    axios.get('http://localhost:7000/api/notes/view')
      .then((res) => {
        console.log(res.data, "res.data")
        setGetNotes(res.data)
      })
      .catch((err) => {
        console.log(err, "err")
      })
  }, [count])

  const HandleDelete = (item) => {
    axios.delete(`http://localhost:7000/api/notes/delete/${item._id}`)
      .then((res) => {
        console.log(res.data, "res.data")
        setCount((prev) => !prev)
        handleClose2()
      })
      .catch((err) => {
        console.log(err, "err")
      })
  }

  const HandleStarred = (i) => {
    axios.post('http://localhost:7000/api/starred/insert', { notes_id: i._id })
      .then((res) => {
        console.log(res.data, "res.data")
      })
      .catch((err) => {
        console.log(err, "err")
      })
  }

  const HandleArchived = (i) => {
    axios.post('http://localhost:7000/api/archived/insert', { notes_id: i._id })
      .then((res) => {
        console.log(res.data, "res.data")
        setCount((prev) => !prev)
      })
      .catch((err) => {
        console.log(err, "err")
      })

    axios.put(`http://localhost:7000/api/notes/update/${i._id}`, { status: "archived" })
      .then((res) => {
        console.log(res.data, "archived successfully")
      })
      .catch((err) => {
        console.log(err, "err")
      })
  }

  return (
    <div>
      <div className="flex min-h-screen flex-row bg-gray-100 text-gray-800">

        <Sidebar />

        <main className="main -ml-48 flex flex-grow flex-col p-4 transition-all duration-150 ease-in md:ml-0">
          <div className="flex flex-col h-full p-10 bg-white shadow-md">
            <div className='flex justify-center'>
              <h1 className=' font-bold text-4xl underline mb-6'>NOTES</h1>
            </div>
            <Link to='/register'>
              <button className="px-3 md:px-4 py-1 md:py-2 bg-sky-600 border border-sky-600 text-white rounded-lg hover:bg-sky-700"><i className="fa-solid fa-arrow-right-to-bracket"></i> Login</button>
            </Link>
            <Link to='/'>
              <button className="px-3 md:px-4 py-1 md:py-2 bg-sky-600 border border-sky-600 text-white rounded-lg hover:bg-sky-700"><i className="fa-solid fa-arrow-right-to-bracket"></i> LP</button>
            </Link>
            <br />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 px-10">
              {getNotes.map((item) => (
                item.status === 'unarchived' && ( //only display notes that are unarchived
                  <div
                    className="overflow-hidden group relative border-4 rounded-lg p-[1px] flex justify-center items-center"
                  >

                    <div key={item.id} className="flex flex-col justify-between w-full h-64 relative z-10 rounded-lg bg-white p-6 sm:p-8" >
                      <div className=" sm:pr-2 text-justify">
                        <h3 className="text-xl font-bold text-gray-900">
                          Name: {item.name}
                        </h3>
                        <div className="mt-2 text-sm text-gray-500 max-h-[80px] overflow-hidden">
                          {/* Apply word wrap for the description */}
                          <p style={{ wordWrap: 'break-word' }}>{item.description}</p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button onClick={() => handleOpen2(item)} className='bg-red-600 p-1 bg-transparent'>
                          <Tooltip title="Delete">
                            <DeleteIcon style={{ fontSize: '27px', color: 'red' }} />
                          </Tooltip>
                        </button>
                        <button onClick={() => HandleArchived(item)} className='bg-blue-600 text-blue-700 p-1 bg-transparent'>
                          <Tooltip title="archive"><ArchiveIcon style={{ fontSize: '27px' }} /></Tooltip>
                        </button>
                      </div>
                    </div>
                    <button onClick={() => HandleStarred(item)} className=' absolute z-10 right-2 top-1 bg-blue-600 p-1 mt-1 self-start bg-transparent'>
                      <Tooltip title="star note"><StarBorderIcon style={{ fontSize: '27px' }} /></Tooltip>
                    </button>
                  </div>
                )
              ))}

              <div style={{ display: 'flex', width: '100%', height: 260, border: '1px solid grey', borderRadius: '8px', alignItems: 'center', justifyContent: 'center' }}>
                <button onClick={handleOpen} style={{ fontSize: '250%' }}>
                  +
                </button>
              </div>
            </div>

            <br />
          </div>
        </main>
      </div>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TodoModal handleClose={handleClose} setCount={setCount} />
          </Box>
        </Modal>
      </div>

      <div>
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style2}>
            <p className=' font-medium text-xl mb-3'>Do you want to delete this note?</p>
            <div className=' flex gap-4 justify-end '>
              <button onClick={() => HandleDelete(selected)} style={{ borderRadius: '5px' }} className=' bg-green-600 py-2 px-4 text-white font-semibold'>YES</button>
              <button onClick={handleClose2} style={{ borderRadius: '5px' }} className='bg-red-600 py-2 px-3 text-white font-semibold'>CANCEL</button>
            </div>
          </Box>
        </Modal>
      </div>

      <Footer />
    </div>
  )
}
