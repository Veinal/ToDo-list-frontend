import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import todosvg from '../todosvg.jpg'
import { Link } from 'react-router-dom'
import todoparal from '../todoparal.jpg'
import svgimg from '../notepad-svgrepo-com.svg'

export default function LandingPage() {
  return (
    <div>
        <main class="flex flex-col items-center justify-center mt-32">
    <header class="container">
        {/* <Navbar/> */}
    </header>

    <section
        class="flex flex-wrap items-center font-sans px-4 mx-auto w-full lg:max-w-screen-lg sm:max-w-screen-sm md:max-w-screen-md pb-20">
        <div class="px-3 w-full lg:w-2/5">
            <div
                class="mx-auto mb-8 max-w-lg text-center lg:mx-0 lg:max-w-md lg:text-left">
                <h2 class="mb-4 text-3xl font-bold text-left lg:text-5xl">
                    Tasks Made Simple:

                    Your Personal  

                    <span class="text-5xl text-blue-500 leading-relaxeds"
                        > ToDo Tracks
                    </span>

                </h2>

                <p
                    class="visible mx-0 mt-3 mb-0 text-sm leading-relaxed text-left text-slate-400">
                    Effortlessly manage tasks with our intuitive platform designed to simplify your day.
                </p>
            </div>

            <div class="text-center lg:text-left">
                <Link to='/register'>
                    <a
                        class="block visible py-4 px-8 mb-4 text-xs font-bold tracking-wide leading-none text-white bg-blue-500 rounded cursor-pointer sm:mr-3 sm:mb-0 sm:inline-block"
                        >LOGIN</a
                    >
                </Link>

                <Link to='/aboutus'>
                    <a
                        class="block visible py-4 px-8 text-xs font-semibold leading-none bg-white rounded border border-solid cursor-pointer sm:inline-block border-slate-200 text-slate-500"
                        >ABOUT US</a
                    >
                </Link>
            </div>
        </div>

        <div class="px-3 mb-12 w-full lg:mb-0 lg:w-3/5">
            <div class="flex justify-center items-center">
                <img src={todosvg} alt="" style={{width:'100%',paddingLeft:'20%'}}/>
                
            </div>
        </div>
    </section>

    <section
        class="flex flex-col w-full h-[500px] bg-cover bg-fixed bg-center justify-center items-center"
        style=
            {{backgroundImage: `url(${todoparal})`}}
        >
        <h1 class="text-white text-5xl font-semibold mt-20 mb-10">
            TO-DO TRACKS
        </h1>

        <span class="text-center font-bold my-20 text-white/90">
            Simplified Task Management

            <hr class="my-4" />

            Customizable Reminder System 

            <hr class="my-4" />

            Seamless Organization Experience

        </span>
    </section>

    <section className="p-20 space-y-8">
        <div className='flex justify-center items-center gap-2'>
            <img style={{width:'40%'}} src={svgimg} alt="dsfs" />
            <h1 className=' font-bold text-3xl text-gray-700'>Empower your productivity. <br /> Your to-do's, reimagined.</h1>
        </div>
    </section>
</main>

    <Footer/>
    </div>
  )
}
