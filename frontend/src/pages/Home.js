import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import '../style/Home.css';

function Home(){
    const [data, setData] = useState([]);

    useEffect(() => {
        Axios.get('/get-data')
          .then(response => {
            setData(response.data);
          })
          .catch(error => {
            console.error(error);
          });
    }, []);

    const groupedData = data.reduce((acc, item) => {
    const existingItem = acc.find(i => i.itemName === item.itemName);
    if (existingItem) {
        existingItem.cost       = (((parseInt(existingItem.quantity)*parseInt(existingItem.cost)) + (parseInt(item.quantity)*parseInt(item.cost))) / (parseInt(existingItem.quantity) + parseInt(item.quantity))).toFixed(2);
        existingItem.quantity   = parseInt(existingItem.quantity) + parseInt(item.quantity);
        existingItem.totalPrice = (parseInt(existingItem.totalPrice) + parseInt(item.totalPrice)).toFixed(2);
    } else {
        acc.push({ 
            itemName:   item.itemName, 
            quantity:   item.quantity, 
            cost:       item.cost, 
            totalPrice: item.totalPrice 
        });
    }
    return acc;
    }, []);

    return(
        <div className='body'>
            <table>
                <thead>
                    <tr id='header'>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Cost</th>
                        <th>Total Price</th>
                        <th>Steam Price</th>
                    </tr>
                </thead>
                <tbody>
                    {groupedData.map(item => (
                        <tr key={item.itemName}>
                        <td>{item.itemName}</td>
                        <td>{item.quantity}</td>
                        <td>{item.cost}</td>
                        <td>{item.totalPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Home;