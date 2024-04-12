import React from 'react';
import { useAuth } from './Store';
import Header from './Header';
import Product from './Product';

const SearchPage = () => {
  const { userdata } = useAuth() || { userdata: [] }; // Provide a default value of an empty array

  // Check if userdata is empty
  const isNoResults = userdata.length === 0;

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-10">
        <div className="flex justify-center">
          <div className="w-full md:w-4/5 lg:w-3/5">
            {isNoResults ? (
                <div className=" flex flex-col ">
              <div className="text-center text-gray-500 mt-4 text-3xl">No results found</div>
              <img src="https://media.tenor.com/t7_iTN0iYekAAAAe/sad-sad-cat.png" className='w-[300px] h-[300px] rounded mt-[20px] ml-auto mr-auto' alt="" /></div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {userdata.map((product) => (
                  <div key={product._id}>
                    <Product
                      id={product._id}
                      title={product.name}
                      price={product.price}
                      rating={parseInt(product.rating)}
                      image={product.img}
                      largerDiv={true} // Added prop for larger div
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
