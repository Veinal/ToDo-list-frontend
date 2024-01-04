import React from 'react'
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import StarIcon from '@mui/icons-material/Star';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div>
        <aside className="sidebar min-h-screen mt-4 ml-4 w-72 -translate-x-full transform bg-white p-4 transition-transform duration-150 ease-in md:translate-x-0 md:shadow-md">
          <div className="my-4 w-full border-b-4 border-indigo-100 text-center">
            <span className="font-mono text-xl font-bold tracking-widest"> <span className="text-indigo-600">HELLO</span> User </span>
          </div>
          <div className="my-9 flex flex-col  items-start ml-20 gap-5">
            <Link to='/notes'><button className=' font-semibold text-xl text-gray-600 hover:text-gray-800'><StickyNote2Icon /> Notes</button></Link>
            <Link to='/starred'><button className=' font-semibold text-xl text-gray-600  hover:text-gray-800'><StarIcon /> Starred</button></Link>
            <Link to='/archived'><button className=' font-semibold text-xl text-gray-600  hover:text-gray-800'><ArchiveIcon /> Archived</button></Link>
            <Link to='/deleted'><button className=' font-semibold text-xl text-gray-600  hover:text-gray-800'><DeleteIcon /> Deleted</button></Link>
          </div>
        </aside>
    </div>
  )
}
