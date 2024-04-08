import React, { useEffect, useState } from 'react';
import Product from './Product';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useAuth } from './Store';

function Home() {
  const [products, setProducts] = useState([]);
  const { userdata } = useAuth();
  const types = [{ type: 'mobile' }, { type: 'laptop' },{type:'earphone'},{type:'speakers'}];

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      let response = await fetch('https://amazon-clone-back.vercel.app/product');
      let result = await response.json();
      setProducts(result);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const backgrounds = [
    'https://images-eu.ssl-images-amazon.com/images/G/31/img22/march/brands/GW/Under_1499_Tallhero_3000x1200._CB561212093_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img22/WLA/2024/April/MAD/GW/D125900647_MAD_DAYS_GW_graphics_DesktopHero_3000x1200._CB561300798_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/OHL/24/BAU/feb/PC_hero_1_2x_1._CB582889946_.jpg',
  ];

  const BackgroundSlider = () => {
    const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

    const updateBackgroundIndex = (increment) => {
      let newIndex = currentBackgroundIndex + increment;
      if (newIndex < 0) {
        newIndex = backgrounds.length - 1;
      } else if (newIndex === backgrounds.length) {
        newIndex = 0;
      }
      setCurrentBackgroundIndex(newIndex);
    };

    useEffect(() => {
      const interval = setInterval(() => updateBackgroundIndex(1), 5000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="relative">
        
        <div className="absolute top-[150px]">
          <ArrowBackIosNewIcon
            onClick={() => updateBackgroundIndex(-1)}
            className="text-white cursor-pointer"
          />
        </div>
        <div className="absolute top-[150px] right-0">
          <ArrowForwardIosIcon
            onClick={() => updateBackgroundIndex(1)}
            className="text-white cursor-pointer"
          />
        </div>
        <div className="w-full h-[570px] bg-cover absolute"
          style={{ backgroundImage: `url(${backgrounds[currentBackgroundIndex]})` }}>
            <div  className="flex flex-col mt-[200px]">
          {types.map((item, index) => (
            <div className="flex w-full px-4 overflow-x-auto gap-8" key={index}>
              {products
                .filter((product) => product.category === item.type)
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
          ))}
           </div>
                
        </div>
        
      </div>
    );
  };

  return (
    <div>
      <BackgroundSlider />
    </div>
  );
}

export default Home;
