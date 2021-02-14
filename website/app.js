/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const key = '&APPID=6dcd2b83fb29b9252343b21537c8acee';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', action);

function action() {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    console.log(newDate);
    getTemp(baseURL, zipCode, key).then(data => {
        postData('http://localhost:8000/addWeather', { temp: data.main.temp, date: newDate, feelings: feelings }).then(() => {
            // update user interface
            updateUI();
        });
    });
}

// function get temperature
const getTemp = async (baseURL, code, key) => {
    const res = await fetch(baseURL + code + key);
    console.log(res);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch (e) {
        // statements
        console.log('Error ' + e);
    }
}

// post data
const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await req.json();
        console.log(newData);
        return newData;
    } catch (e) {
        console.log('Error ' + e);
    }
}

// update user interface
const updateUI = async () => {
    const request = await fetch('http://localhost:8000/all');
    try {
        const data = await request.json();
        console.log('updateUI');
        document.getElementById('date').textContent = `Date : ${data.date}`;
        document.getElementById('temp').textContent = `Temperature : ${data.temp}`;
        document.getElementById('content').textContent = `Feelings : ${data.feelings}`;
    } catch (e) {
        console.log(e);
    }
}