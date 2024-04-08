import React from 'react';

const Basket = () => {
    // Retrieve basket items from localStorage
    const basketItems = JSON.parse(localStorage.getItem('basket')) || [];

    const removeItem = (index) => {
        const updatedBasket = [...basketItems];
        updatedBasket.splice(index, 1); // Remove the item at the specified index
        localStorage.setItem('basket', JSON.stringify(updatedBasket));
        window.location.reload(); // Reload the page to reflect changes
    }

    const removeAllItems = () => {
        localStorage.removeItem('basket');
        window.location.reload(); // Reload the page to reflect changes
    }

    // Calculate total price and quantity
    let totalPrice = 0;
    let totalQuantity = 0;

    basketItems.forEach(item => {
        totalPrice += parseFloat(item.price);
        totalQuantity++;
    });

    return (
        <div className="bg-white rounded-md shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Basket</h2>
            {basketItems.length > 0 ? (
                <div>
                    <ul>
                        {basketItems.map((item, index) => (
                            <li key={index} className="flex items-center border-b border-gray-300 py-2">
                                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
                                <div className="ml-4">
                                    <p className="text-lg font-semibold">{item.title}</p>
                                    <p className="text-gray-600">${item.price}</p>
                                </div>
                                <button onClick={() => removeItem(index)} className="ml-auto px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">Remove</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={removeAllItems} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Remove All</button>
                    <div className="mt-4">
                        <p className="font-semibold text-right">Total Quantity: {totalQuantity}</p>
                        <p className="font-semibold text-right">Total Price: ${totalPrice.toFixed(2)}</p>
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Buy Now</button>
                    </div>
                </div>
            ) : (
                <p className="text-gray-600">Your basket is empty</p>
            )}
        </div>
    );
}

export default Basket;
