import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-between  w-full h-16 bg-black'>
        <p className='text-white flex items-center ml-4'>Copyright © 2012 - 2024 TermsFeed®. All rights reserved.</p>
            <div className="flex items-center  ml-[-250px]">
        <img
          className="mb-3"
        src="/logo.jpg"
          alt="Amazon Logo" width={60} height={80}
        />

        
      
      <p className="text-white mb-3 font-bold text-2xl">Gadget Store</p></div>
      <div className='flex justify-center items-center gap-5 mr-5'>
        <img src="/facebook_icon.png" alt="" width={40} height={40}/>
        <img src="/googleplus_icon.png" alt="" width={40} height={40} />
        <img src="/twitter_icon.png" alt="" width={40} height={40} />
      </div>

    </div>
    
  )
}

export default Footer