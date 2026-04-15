import { Button } from 'flowbite-react'
import React from 'react'

function CallToAction() {
return (
    <div className='flex flex-col sm:flex-row border border-teal-500 rounded-tl-3xl rounded-br-3xl p-3 text-center justify-center'>
            <div className='flex-1 justify-center flex flex-col'>
                    <h2 className='text-2xl'>Want to know more about me?</h2>
                    <p className='text-gray-500 my-2'>
                            I am a full stack developer with a passion for creating beautiful and functional web applications. I have experience with a variety of technologies, including React, Node.js, Express, MongoDB, and more. I am always looking for new opportunities to learn and grow as a developer. If you want to know more about me or my work, feel free to reach out!
                    </p>
                    <a href="https://abubekernuru.vercel.app" target='_blank' rel='noopener noreferrer'>
                            <Button className='bg-gradient-to-r from-purple-400 to-pink-400 cursor-pointer rounded-tl-xl rounded-br-xl rounded-bl-none w-full'>
                                    Visit my portfolio
                            </Button>
                    </a>
            </div>
            <div className='flex-1 p-7'>
                    <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="software developer" />
            </div>
    </div>
)
}

export default CallToAction