import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/data')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ' + error);
            });
    }, []);

    useEffect(() => {
        console.log(data); // This will log the updated data whenever it changes
    }, [data]); // Run this effect whenever `data` changes

    return (
        <div>
            <h1>MySQL Data from AWS RDS</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.user}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
