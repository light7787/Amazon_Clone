import React, { useEffect, useState } from 'react';
import { useAuth } from './Store';
import { useNavigate } from 'react-router-dom';

function Product({ id, title, image, price, rating }) {
    const { ProductCount } = useAuth();
    const [addedToBasket, setAddedToBasket] = useState(false);
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the product is already in the basket
        const basket = JSON.parse(localStorage.getItem('basket')) || [];
        const isProductInBasket = basket.some(item => item.id === id);
        setAddedToBasket(isProductInBasket);

        // Update product count
        const totalQuantity = basket.length;
        ProductCount(totalQuantity);
    }, [id, ProductCount]);

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

                    // Update product count
                    ProductCount(updatedBasket.length);
                } catch (error) {
                    console.error('Error updating localStorage:', error);
                }
            }
        } else {
            alert("Please sign in first");
        }
    };

    const handleProductClick = () => {
        navigate(`/product/${id}`);
    };

    return (
        <div onClick={handleProductClick} className=" cursor-pointer flex flex-col items-center justify-between w-full m-3 p-5 bg-white border border-gray-200 rounded-md shadow-md hover:scale-110 transition-all ease-in-out duration-700 z-10 hover:mb-8 hover:shadow-lg">
            <div className="mb-3">
                <p className="font-semibold">{title}</p>
                <p className="text-gray-600">${price}</p>
                <div className="flex mt-1">
                    {Array.from({ length: rating }, (_, index) => (
                        <p key={index} className="text-yellow-400">&#9733;</p>
                    ))}
                </div>
            </div>
            <img src={image} alt={title} className="w-full h-48 object-contain mb-3" />
            <button 
                className={`w-full py-2 bg-yellow-400 text-white font-semibold rounded-md transition duration-300 ${addedToBasket ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500'}`}
                onClick={handleAddToBasket}
                disabled={addedToBasket}
            >
                {addedToBasket ? 'Added to Basket' : 'Add to Basket'}
            </button>
        </div>
    );
}

export default Product;
