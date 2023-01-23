import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


const cities = ["Delhi", "Mumbai" , "Kolkata", "Bangalore", "Chennai", "Hyderabad", "Pune", "Ahmadabad", "Surat" , "Lucknow", "Jaipur", "Mirzapur", "Nagpur", "Ghaziabad", "Indore", "Vadodara", "Vishakhapatnam", "Bhopal", "Chinchvad", "Patna", "Ludhiana", "Agra", "Kalyan", "Madurai", "Jamshedpur", "Nasik", "Faridabad", "Aurangabad", "Rajkot", "Meerut", "Jabalpur", "Thane", "Dhanbad", "Allahabad", "Varanasi"]

let InputDiv = styled.div`
  width: 90%;
  height: 50px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  margin: auto;
  justify-content: space-between;
  background-color: white;
  border: 2px solid skyblue;
`;
let Input = styled.input`
  width: 95%;
  height: 40px;
  border-radius: 10px;
  border: none;
  outline: none;
`;
let Bounce = styled.div`
  width: 90%;
  height: 50px;
  margin: auto;
  border-radius: 1px 1px 5px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  background-color: white;
  cursor: pointer;
`;
let Bdiv = styled.div`
  width: 10%;
  display: flex;
  justify-content: space-around;
`;
let Img = styled.img`
  width: 40px;
  height: 40px;
  padding: 15px 0px;
`;
let Days = styled.div`
  width: 80%;
  margin: auto;
  .weeks {
    display: flex;
    width: 100%;
    .day {
      width: 20%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .fcast {
    display: flex;
    margin-top: -20px;
    .fdata {
      width: 20%;
    }
  }
`;
let Wraper = styled.div`
  display: flex;
  width: 90%;
  margin: auto;
  margin-top: 50px;
  #data {
    width: 50%;
  }
  #map {
    width: 50%;
  }
`;

let count = 0;
let id;

function Searchbar() {
  const [city, SetCity] = useState("kadapa");
  const [citydata, SetCityData] = useState([]);

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const [forecast, SetForecast] = useState([]);
  const [debounceArr, SetDebounceArr] = useState([]);
  const [cityforecast, SetCityForecast] = useState("kadapa");

  useEffect(() => {
    getforcast();
  }, [cityforecast]);

  useEffect(() => {
    let res = cities.filter((ele) => {
      return ele.slice(0, city.length).toLowerCase() === city;
    });
    SetDebounceArr(res);
  }, [city]);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  const getdata = async (e) => {
    try {
      SetCity(e);
      count = 0;
    } catch (err) {
      console.log(err);
    }
  };

  const getforcast = async () => {
    try {
      let getfor = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityforecast}&units=metric&appid=0e91ea9816665abc67fcec0febec0f7b`
      );

      //console.log("getcity", getfor.data.city.name)

      SetForecast(getfor.data.list);
      SetCityData([getfor.data.list[0]]);
      console.log("forcast", forecast);
    } catch (err) {
      console.log(err);
    }
  };

  function debounce(func, delay) {
    if (id) {
      clearTimeout(id);
    }
    id = setTimeout(() => {
      func();
    }, delay);
  }

  console.log("citydata", citydata);

  let sevendays = [];
  forecast.map((e, i, arr) => {
    if (
      i === 0 ||
      i === 8 ||
      i === 12 ||
      i === 16 ||
      i === 24 ||
      i === 32 ||
      i === 39
    ) {
      sevendays.push(e);
    }
  });

  let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  console.log("setcity", cityforecast);

  const handledisplay = () => {
    count = 1;
    console.log(count);
  };

  return (
    <div style={{ paddingTop: "20px" }}>
      <div>
        <InputDiv>
          <p style={{ fontSize: "30px" }} />
          <Input
            type="text"
            placeholder="Type your city"
            onInput={(e) => debounce(() => (getdata(e.target.value), 3000))}
          />
          <p style={{ fontSize: "32px" }} />
        </InputDiv>
      </div>

      {count === 0 && (
        <div>
          {debounceArr.map((e) => (
            <Bounce onClick={() => (SetCityForecast(e), handledisplay())}>
              <p>{e}</p>
            </Bounce>
          ))}
        </div>
      )}
      <br />
      <Days>
        <div className="weeks">
          {week.map((e) => (
            <div className="day">
              <p>{e}</p>
            </div>
          ))}
        </div>
        <div className="fcast">
          {sevendays.map((ele, i, arr) => (
            <div key={ele.id} className="fdata">
              <p>{ele.main.temp}°C</p>
              <p>
                {ele.weather[0].main === "Rain" ? (
                  <Img src="https://cdn-icons-png.flaticon.com/128/4551/4551693.png" />
                ) : (
                  <Img src="https://cdn-icons-png.flaticon.com/128/1163/1163573.png" />
                )}
              </p>
              <p style={{ marginTop: "-30px" }}>{ele.weather[0].main}</p>
            </div>
          ))}
        </div>
      </Days>

      <Wraper>
        <div id="data">
          <div>
            {citydata.map((e) => (
              <div>
                <h2>Temp : {e.main.temp}°C</h2>
                <h3>Pressure : {e.main.pressure} hpa</h3>
                <h3>Humidity : {e.main.humidity}%</h3>
              </div>
            ))}
          </div>
          <br />
          <div>
            <button onClick={getLocation} style={{ padding: "5px" }}>
              Show my location
            </button>
            <p>{status}</p>
            {lat && <p>Latitude: {lat}</p>}
            {lng && <p>Longitude: {lng}</p>}
          </div>
        </div>
        <div id="map">
          <iframe
            src={`https://maps.google.com/maps?q=${cityforecast}=&z=13&ie=UTF8&iwloc=&output=embed`}
            border="0"
            width="100%"
            height="450"
            style={{ border: "0" }}
          ></iframe>
        </div>
      </Wraper>
    </div>
  );
}

export default Searchbar;
