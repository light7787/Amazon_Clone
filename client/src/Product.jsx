import React, { useEffect, useState } from 'react';
import { useAuth } from './Store';

function Product({ id, title, image, price, rating }) {
    const { ProductCount } = useAuth();
    const [addedToBasket, setAddedToBasket] = useState(false);
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const auth = localStorage.getItem('user');

    useEffect(() => {
        const totalQuantity = basket.length;
        ProductCount(totalQuantity);
    }, [basket, ProductCount]);

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
                const existingBasketItems = JSON.parse(localStorage.getItem('basket')) || [];
                const isProductInBasket = existingBasketItems.some(item => item.id === id);
                if (!isProductInBasket) {
                    const updatedBasket = [...existingBasketItems, product];
                    localStorage.setItem('basket', JSON.stringify(updatedBasket));
                    setAddedToBasket(true);
                }
            }
        } else {
            alert("Please sign in first");
        }
    }

    return (
        <div className="flex flex-col items-center justify-between w-full m-3 p-5 bg-white border border-gray-200 rounded-md shadow-md">
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
