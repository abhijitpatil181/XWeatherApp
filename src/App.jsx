import { useEffect, useState } from "react";
import { Card } from "./components";
import "./App.css";

const API_KEY = "06033f621028494084d25003230712";

const toCamelCase = (str) => {
  const s =
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join("");
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};

function App() {
  const [value, setValue] = useState("");
  const [data, setData] = useState({
    temperature: "",
    humidity: "",
    condition: "",
    windSpeed: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) {
      if (confirm(error)) {
        setError("");
      }
    }
  }, [error]);

  const getData = (value) => {
    setLoading(true);

    fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${value}&aqi=no`
    )
      .then((response) => response.json())
      .then((data) => {
        setData({
          temperature: `${data.current.temp_c} °C`,
          humidity: `${data.current.humidity} %`,
          condition: data.current.condition.text,
          windSpeed: `${data.current.wind_kph} kph`,
        });
        setLoading(false);
        setError("");
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
        setData({
          temperature: "",
          humidity: "",
          condition: "",
          windSpeed: "",
        });
        // setError("Failed to fetch weather data");
      });
  };

  const onSearchClick = () => {
    if (value) {
      getData(value);
    }
  };

  return (
    <>
      <div className="search">
        <input
          placeholder="Enter city name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={onSearchClick}>Search</button>
      </div>

      <div className="weather-cards">
        {loading ? (
          <p>Loading data…</p>
        ) : (
          Object.keys(data).length > 0 &&
          Object.values(data).some((value) => value) &&
          Object.keys(data).map((label) => (
            <Card title={toCamelCase(label)} value={data[label]} key={label} />
          ))
        )}
      </div>
    </>
  );
}

export default App;
