import React, { useEffect, useState } from 'react';
import Product from './Product';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress component
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useAuth } from './Store';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const types = [{ type: 'mobile' }, { type: 'laptop' },{type:'earphone'},{type:'speakers'},,{type:'watch'}];
  const[data,setData] = useState('');

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      let response = await fetch('https://amazon-clone-back.vercel.app/product');
      let result = await response.json();
      setProducts(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const filteredProducts = data
  ? products.filter(product => product.category === data)
  : products;




    return (
      <div >
        <div className='flex justify-center items-center gap-10 mt-10'>
       <div className='flex flex-col justify-center items-center cursor-pointer'> <img onClick={(e)=>setData('mobile')}src="/mobile.png" alt="" width={150} height={150} /> <span className={data=='mobile'?'font-bold underline':''}>Mobiles</span></div>
       <div className='flex flex-col justify-center items-center cursor-pointer'> <img  onClick={(e)=>setData('laptop')}src="/laptop.png" alt="" width={150} height={150} /><span className={data=='laptop'?'font-bold underline':''}>Laptops</span></div>
       <div className='flex flex-col justify-center items-center cursor-pointer'> <img  onClick={(e)=>setData('speakers')}src="/speaker.png" alt="" width={150} height={150} /><span className={data=='speakers'?'font-bold underline':''}>Speakers</span></div>
       <div className='flex flex-col justify-center items-center cursor-pointer'> <img onClick={(e)=>setData('earphone')} src="/earphone.png" alt="" width={150} height={150} /><span className={data=='earphone'?'font-bold underline':''}>Earphones</span></div>
       <div className='flex flex-col justify-center items-center cursor-pointer'> <img onClick={(e)=>setData('watch')} src="/watch.png" alt="" width={150} height={150} /><span className={data=='watch'?'font-bold underline':''}>Watches</span></div>
        </div>
  
       
 
          {loading ? ( // Conditionally render the loader based on the loading state
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <CircularProgress /> {/* Render the CircularProgress component while loading */}
            </div>
          ) : (
            <div className="flex flex-col bg-black pt-6">
            
              <div className="grid grid-cols-4 gap-8 px-4 ">

                  {filteredProducts
                    
                    .map((product) => (
                      <div key={product._id}>
                        <Product
                          id={product._id}
                          title={product.name}
                          price={product.price}
                          rating={parseInt(product.rating)}
                          image={product.img}
                          largerDiv={true} // Added prop for larger div
                        />
                        <br />
                      </div>
                    ))}
                </div>
       
            </div>
          )}
      
      </div>
    );
  };

 


export default Home;
