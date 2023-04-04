import React from 'react';
import $ from 'jquery';
import Axios from 'axios';

import '../style/AddItem.css';

function AddItem(){
        return(
        <div className='addItem'>
            <form id='myForm' onSubmit={(event) => submitButton(event)}>
                <label>Item Name:</label> <input type='text' id='itemName' name='itemName' required/><br />
                <label>Quantity:</label> <input type='number' id='quantity' name='quantity' min='1' required/><br />
                <label>Cost:</label> <input type='number' id='cost' name='cost' min='0.01' step='0.01' required/><br />
                <input type='submit' id='submit' value='Submit' />
                <input type='reset' id='reset' value='Clear' />
            </form>
        </div>
    )
}

function submitButton(event) {
    const url = "http://localhost:5000/data"

    var formData = {
        "itemName": $('#itemName').val(),
        "quantity": $('#quantity').val(),
        "cost": $('#cost').val(),
    }

    Axios.post(url, {
        "itemName": $('#itemName').val(),
        "quantity": $('#quantity').val(),
        "cost": $('#cost').val(),
    })
    .then(res => {
        console.log(res.data)
    })

    clear();

    event.preventDefault();

    console.log(formData);

}

function clear() {
    document.getElementById('itemName').value = "";
    document.getElementById('quantity').value = "";
    document.getElementById('cost').value = "";
}

export default AddItem;