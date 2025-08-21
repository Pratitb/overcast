import './styles/App.scss'
import LeftMid from './components/leftMid/leftMid'
import LeftTop from './components/leftTop/leftTop'
import { useEffect, useMemo, useState } from 'react';
import type { CodesType, CurrWeathType, WeatherType } from './types';

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

  const weatherCodes: CodesType[] = [
    { code: 0, type: 'clear sky' },
    { code: 1, type: 'clear' },
    { code: 2, type: 'cloudy' },
    { code: 3, type: 'overcast' },
    { code: 4, type: 'foggy' },
    { code: 5, type: 'drizzle' },
    { code: 6, type: 'rain' },
    { code: 7, type: 'snow' },
    { code: 8, type: 'heavy rain' },
    { code: 9, type: 'thunderstorm' },
  ]
  const precipitationRate = [
    { rate: 0, type: 'dry' },
    { rate: 0.1 - 2.5, type: 'drizzle' },
    { rate: 2.6 - 7.5, type: 'moderate rain' },
    { rate: 7.6 - 50, type: 'heavy rain' },
    { rate: 51, type: 'extreme rain' },
  ]

  const codeToType = weatherCodes?.find((curr) => curr?.code === currWeath?.weathercode)

  const dailyMemoData = useMemo(() => {
    if (!daily) return
  }, [])

  return (
    <div className='main-wrapper'>
      <p className='main-app-name'>overcast</p>
      <div className='main-left'>
        <LeftTop greetingVal={greeting} dateVal={getDate} locationName={`${weather?.latitude}, ${weather?.longitude}`} />
        <LeftMid currentTemp={currWeath?.temperature} weathType={codeToType?.type} />
      </div>
      <div className='main-right'>
        <LeftTop />
      </div>
    </div>
  )
}

export default App
