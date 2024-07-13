import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import { useAuth } from './Store';
import { NavLink } from "react-router-dom";

const ProductPage = () => {
    const { id } = useParams();

    const [title, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImg] = useState("");
    const [rating, setRating] = useState("");
    const [addedToBasket, setAddedToBasket] = useState(false);

    const auth = localStorage.getItem('user');
    const { ProductCount } = useAuth();
    const basket = JSON.parse(localStorage.getItem('basket')) || [];

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await fetch(`https://amazon-clone-back.vercel.app/product/${id}`);
                const result = await response.json();
                setName(result.name);
                setPrice(result.price);
                setCategory(result.category);
                setImg(result.img);
                setRating(result.rating);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        getProduct();

        // Check if the product is already in the basket
        try {
            
            const isProductInBasket = basket.some(item => item.id === id);
            setAddedToBasket(isProductInBasket);
        } catch (error) {
            console.error('Error accessing localStorage:', error);
        }
    }, [id]);

    useEffect(() => {
        try {
            const basket = JSON.parse(localStorage.getItem('basket')) || [];
            const totalQuantity = basket.length;
            ProductCount(totalQuantity);
        } catch (error) {
            console.error('Error accessing localStorage:', error);
        }
    }, [basket,ProductCount]);

    const handleAddToBasket = () => {
        if (auth) {
            if (!addedToBasket) {
                const product = {
                    id,
                    title,
                    image,
                    price,
                    rating
                };
                try {
                    const existingBasketItems = JSON.parse(localStorage.getItem('basket')) || [];
                    const updatedBasket = [...existingBasketItems, product];
                    localStorage.setItem('basket', JSON.stringify(updatedBasket));
                    setAddedToBasket(true);
                } catch (error) {
                    console.error('Error updating localStorage:', error);
                }
            }
        } else {
            alert("Please sign in first");
        }
    };

    return (
        <div className='h-[100vh]'>
            <Header />
            <div className='grid grid-cols-2 w-full h-[100vh]'>
                <div className='flex justify-center items-center'>
                    <img src={image} alt="" width={400} height={300} />
                </div>
                <div className='flex flex-col justify-center items-start'>
                    <div className='flex items-center mb-5'>
                        <h1 className='font-bold text-3xl'>Model Name:</h1>
                        <p className='ml-3 mt-2 text-2xl'>{title}</p>
                    </div>
                    <div className='flex items-center mb-5'>
                        <h1 className='font-bold text-3xl'>Price:</h1>
                        <p className='ml-3 mt-2 text-2xl'>${price}</p>
                    </div>
                    <div className='flex items-center mb-5'>
                        <h1 className='font-bold text-3xl'>Category:</h1>
                        <p className='ml-3 mt-2 text-2xl'>{category}</p>
                    </div>
                    <div className='flex items-center mb-5'>
                        <h1 className='font-bold text-3xl'>Rating:</h1>
                        <p className='flex ml-3 mt-2 text-2xl'>  {Array.from({ length: rating }, (_, index) => (
                        <p key={index} className="text-yellow-400">&#9733;</p>
                    ))}</p>
                    </div>
                    <button 
                        className={`w-full py-2 bg-yellow-400 text-white font-semibold rounded-md transition duration-300 ${addedToBasket ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500'}`}
                        onClick={handleAddToBasket}
                        disabled={addedToBasket}
                    >
                        {addedToBasket ? 'Added to Basket' : 'Add to Basket'}
                    </button>
                    <NavLink to='/basket' className={'w-full'}>
                    <button className='w-full py-2 mt-4 bg-yellow-400 text-white font-semibold rounded-md transition duration-300 hover:bg-yellow-500'>
                        Go to Cart

                    </button></NavLink>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
