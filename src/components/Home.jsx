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
import StarIcon from '@mui/icons-material/Star';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

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

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [getNotes, setGetNotes] = useState([])

  useEffect(() => {
    axios.get('http://localhost:7000/api/notes/view')
      .then((res) => {
        console.log(res.data, "res.data")
        setGetNotes(res.data)
      })
      .catch((err) => {
        console.log(err, "err")
      })
  }, [])

  return (
    <div>
      <div className="flex min-h-screen flex-row bg-gray-100 text-gray-800">
        <aside className="sidebar w-72 -translate-x-full transform bg-white p-4 transition-transform duration-150 ease-in md:translate-x-0 md:shadow-md">
          <div className="my-4 w-full border-b-4 border-indigo-100 text-center">
            <span className="font-mono text-xl font-bold tracking-widest"> <span className="text-indigo-600">HELLO</span> User </span>
          </div>
          <div className="my-9 flex flex-col  items-start ml-20 gap-5">
            <button className=' font-semibold text-xl text-gray-600'><StickyNote2Icon /> Notes</button>
            <button className=' font-semibold text-xl text-gray-600'><StarIcon /> Starred</button>
            <Link to='/archived'><button className=' font-semibold text-xl text-gray-600'><ArchiveIcon /> Archived</button></Link>
            <button className=' font-semibold text-xl text-gray-600'><DeleteIcon /> Deleted</button>
          </div>
        </aside>
        <main className="main -ml-48 flex flex-grow flex-col p-4 transition-all duration-150 ease-in md:ml-0">
          <div className="flex flex-col h-full p-10 bg-white shadow-md">
            <div className='flex justify-center'>
              <img src={ToDoimg} style={{ width: '40%' }} alt="" />
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
              <div
                className="overflow-hidden group relative border-4 rounded-lg p-[1px] flex justify-center items-center"
              >
                <div
                  className="rounded-lg hidden group-hover:block animate-gradient w-[250%] h-[500%] absolute -top-[60%] -left-[50%] bg-gradient-to-r from-zinc-900 via-gray-200/40 to-zinc-700 shadow-xl"
                ></div>

                  <div key={item.id} className="block w-full h-64 relative z-10 rounded-lg bg-white p-6 sm:p-8" >
                    <div className=" sm:pr-8">
                      <h3 className="text-xl font-bold text-gray-900">
                        Name: {item.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>

              </div>
                ))}

              <div style={{ display: 'flex', border: '1px solid grey',borderRadius:'8px', alignItems: 'center', justifyContent: 'center' }}>
                <button onClick={handleOpen}>
                  <span style={{ fontSize: '200%' }}>+</span>
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
            <TodoModal handleClose={handleClose} />
          </Box>
        </Modal>
      </div>

      <Footer />
    </div>
  )
}
