import React from 'react'
import { Link, Navigate } from 'react-router-dom'

export default function Aboutus() {
    
  return (
    <div>
        <div id="modal" class="container mx-auto flex justify-center items-center px-4 md:px-10 py-20">
            <div class="bg-white dark:bg-gray-800 px-3 md:px-4 py-12 flex flex-col justify-center items-center">
                <div>
                    <h1 className=' text-white text-4xl font-semibold'>TO-DO TRACKS</h1>
                </div>
                <h1 class="mt-8 md:mt-12 text-3xl lg:text-4xl font-semibold leading-10 text-gray-800 text-center md:w-9/12 lg:w-7/12 dark:text-white">Empower Your Day, One Task at a Time!</h1>
                <p class="mt-10 text-base leading-normal text-center text-gray-600 md:w-9/12 lg:w-7/12 dark:text-white">Our mission is simple: to provide you with a seamless and intuitive platform to manage your tasks and streamline your life.</p>
                <div class="mt-12 md:mt-14 w-full flex justify-center">
                <Link to='/home'><button class="dark:text-white dark:border-white w-full sm:w-auto border border-gray-800 text-base font-medium text-gray-800 py-5 px-14 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 hover:bg-gray-800 hover:text-white dark:hover:text-white dark:hover:bg-gray-700">Back to Home</button></Link>
                </div>
            </div>
        </div>
    </div>
  )
}
