/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=6220417be041a302eefd22f93e45fc86';

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e){
  const zipCode = document.getElementById('zip').value;
  const userResponse = document.getElementById('feelings').value;
  getInfo(baseURL, zipCode, apiKey)
  .then(
    function(data){
    console.log(data);
    postData('/add', {temperature: data.temp, date: newDate, userResponse: userResponse});
  })
  .then(
    updateUI()
  )

  }

const getInfo = async (baseURL, zip, key)=>{

  const res = await fetch(baseURL+zip+key)
  try {
    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

const postData = async (url = '', data = {})=>{
      console.log(data);
      const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header
      body: JSON.stringify(data),
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

  const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      document.getElementById('date').innerHTML = allData[0].date;
      document.getElementById('temp').innerHTML = allData[0].temperature;
      document.getElementById('content').innerHTML = allData[0].userResponse;

    }catch(error){
      console.log("error", error);
    }
  }
