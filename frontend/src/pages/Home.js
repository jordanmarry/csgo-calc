import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import '../style/Home.css';

function Home(){
    const [data, setData] = useState([]);

    useEffect(() => {
        Axios.get('/get-data')
          .then(response => {
            console.log(response.data);
            setData(response.data);
          })
          .catch(error => {
            console.error(error);
          });
    }, []);

    const groupedData = data.reduce((acc, item) => {
        const existingItem = acc.find(i => i.itemName === item.itemName);
        if (existingItem) {
            existingItem.cost       = (((parseFloat(existingItem.quantity)*parseFloat(existingItem.cost)) + (parseFloat(item.quantity)*parseFloat(item.cost))) / (parseFloat(existingItem.quantity) + parseFloat(item.quantity))).toFixed(2);
            existingItem.quantity   = parseFloat(existingItem.quantity) + parseFloat(item.quantity);
            existingItem.totalPrice = (parseFloat(existingItem.totalPrice) + parseFloat(item.totalPrice)).toFixed(2);
            existingItem.steamPrice = item.steamPrice;

        } else {

            item.steamPrice = item.steamPrice.replace('$','');

            acc.push({ 
                itemName:   item.itemName, 
                quantity:   item.quantity, 
                cost:       parseFloat(item.cost).toFixed(2), 
                totalCost:  parseFloat(item.totalPrice).toFixed(2), 
                steamPrice: item.steamPrice,
                pnlMoney:   ((parseFloat(item.steamPrice)*item.quantity) - parseFloat(item.totalPrice)).toFixed(2),
                pnlPercent: ((parseFloat(item.steamPrice)-parseFloat(item.cost))/parseFloat(item.cost)*100).toFixed(2)
            });
        }
        return acc;
    }, []);

    console.log(groupedData);

    return(
        <div className='body'>
            <table>
                <thead>
                    <tr id='header'>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Cost</th>
                        <th>Total Cost</th>
                        <th>Steam Price</th>
                        <th>P/L ($)</th>
                        <th>P/L (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {groupedData.map(item => (
                        <tr key={item.itemName}>
                        <td>{item.itemName}</td>
                        <td>{item.quantity}</td>
                        <td>${item.cost}</td>
                        <td>${item.totalCost}</td>
                        <td>${item.steamPrice}</td>
                        <td>${item.pnlMoney}</td>
                        <td>{item.pnlPercent}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Home;