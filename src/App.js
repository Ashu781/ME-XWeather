import React, {useState,useEffect,useRef} from "react";
import axios from "axios";
import './app.css';


function App() {

  let city = useRef("");
  let [data,setData] = useState([]);
  let [loading, setLoading] = useState(false);
  let [success, setSuccess] = useState(false);



  async function submit(){

    let params = new URLSearchParams({
      key:"5531f5bccc6e4c6dbae120408250711",
      q: city.current.value,
    });

    try{
      let response = await axios.get(`https://api.weatherapi.com/v1/current.json?${params}`);
      setData(response.data);
      setLoading(false);
      setSuccess(true);
    }
    catch(err){
       setLoading(false);
       alert("Failed to fetch weather data");
    }

  }


  return (
   <>
   <div style={{display:"flex",justifyContent:"center",margin:"100px 0px 25px 0px"}}>
   <input type="text" placeholder="Enter city name" ref={city} className="input"/>
   <button onClick={()=>{submit();setLoading(true);setSuccess(false)}} className="button">Search</button>
   </div>
   {loading && <p style={{textAlign:"center",marginTop:"50px"}}>Loading data…</p>}
   {success && 
   <div className="weather-cards">
     <div className="weather-card"> 
     <h3>Temperature</h3>
     <p>{data?.current?.temp_c}°C</p>
    </div>
     <div className="weather-card"> 
     <h3>Humidity</h3>
     <p>{data?.current?.humidity}%</p>
    </div>
     <div className="weather-card"> 
     <h3>Condition</h3>
     <p>{data?.current?.condition?.text}</p>
    </div>
     <div className="weather-card"> 
     <h3>Wind Speed</h3>
     <p>{data?.current?.wind_kph} kph</p>
    </div>
   </div>}
   </>
  );
}

export default App;
