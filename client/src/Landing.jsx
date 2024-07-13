import React from 'react'

const Landing = () => {
  return (
    <div className='grid grid-cols-2 w-full h-[100vh] bg-[#FFFFFF]' >
        <div className='flex flex-col justify-center items-center font-serif pb-8'>
       <p className='text-black text-3xl '> Discover the latest and greatest in tech at </p>
       <h3 className='text-black text-5xl font-bold mt-2'>Gadget Store</h3>
       <button className='text-black font-semibold border border-black rounded-lg w-[100px] h-[50px] mt-5 hover:bg-yellow-100'>Discover gadgets</button>
       <div className='flex justify-center items-center gap-5 mt-5'><button className='hover:scale-100 hover:underline'>Sign up</button>
       <button className='hover:scale-100 hover:underline'>Log in</button></div>
        </div>
        <div className='flex justify-center items-center w-full'>
            <img src="/bg1.jpg" className='h-[400px] w-[400px]' alt="" />
        </div>


    </div>
  )
}

export default Landing