import './styles/App.scss'
import LeftMid from './components/leftMid/leftMid'
import LeftTop from './components/leftTop/leftTop'
import { useEffect, useState } from 'react';
import type { CurrWeathType, WeatherType } from './types';

function App() {

  // greeting states
  const [greeting, setGreeting] = useState<string>('');
  const getDate = new Date().toDateString()
  const getHours = new Date().getHours()

  // set the greeting text
  useEffect(() => {
    if (getHours < 12) {
      setGreeting('morning')
    }
    else if (getHours > 12 && getHours < 17) {
      setGreeting('afternoon')
    }
    else {
      setGreeting('evening')
    }
  }, [getHours])

  // weather states
  const [loading, setLoading] = useState(true)
  const [weather, setWeather] = useState<WeatherType>()
  const [currWeath, setCurrWeath] = useState<CurrWeathType>()
  const [daily, setDaily] = useState(null)
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')

  // get user lat long via permission
  const getGeoLocation = () => {
    // here we are checking if user provides its location or not
    if ('geolocation' in navigator) {
      navigator?.geolocation?.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords

        // fetch weather data based on lat & long
        try {
          const fetchWeather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=auto`)
          if (!fetchWeather.ok) {
            throw new Error('Fetching weather data failed. Please try again later')
          }
          const weatherData = await fetchWeather?.json()
          console.log(weatherData, 'weatherData')
          setWeather(weatherData)
          setCurrWeath(weatherData?.current_weather)
          setDaily(weatherData?.daily)
          setLoading(false)
        }
        catch (error) {
          console.log(error)
        }
      })
    }
    else {
      setLoading(false)
    }

  }

  useEffect(() => {
    getGeoLocation()
  }, [])

  const getWeatherCategory = (code: number) => {
    if ([0, 1].includes(code ?? 0)) return "Sunny";
    if ([2, 3].includes(code ?? 0)) return "Cloudy";
    if ([45, 48].includes(code ?? 0)) return "Foggy";

    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return "Rainy";
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return "Snowy";

    if ([95, 96, 99].includes(code)) return "Stormy";

    return "Unknown";
  }

  return (
    <div className='main-wrapper'>
      <p className='main-app-name'>overcast</p>
      <div className='main-left'>
        <LeftTop greetingVal={greeting} dateVal={getDate} locationName={`${weather?.latitude}, ${weather?.longitude}`} />
        <LeftMid currentTemp={currWeath?.temperature} weathType={getWeatherCategory(currWeath?.weathercode ?? 0)} speed={currWeath?.windspeed} speedUnit={weather?.current_weather_units?.windspeed} />
      </div>
      <div className='main-right'>
        <LeftTop />
      </div>
    </div>
  )
}

export default App
