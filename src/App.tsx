import './styles/app.scss'
import LeftMid from './components/leftMid/leftMid'
import LeftTop from './components/leftTop/leftTop'
import { useEffect, useState } from 'react';
import type { CurrWeathType, DailyDataType, HourlyDataType, HourlyItemType, WeatherType } from './types';
import HourlyCard from './components/hourlyCard/hourlyCard';

const App = () => {

  // greeting states ----------------------------------------------------
  const [greeting, setGreeting] = useState<string>('');
  const getDate = new Date().toDateString()
  const getHours = new Date().getHours()

  // set the greeting text ----------------------------------------------------
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

  // weather states ----------------------------------------------------
  const [weather, setWeather] = useState<WeatherType>()
  console.log(weather, 'weather')
  const [currWeath, setCurrWeath] = useState<CurrWeathType>()
  const [daily, setDaily] = useState<DailyDataType>()
  const [formattedDates, setFormattedDates] = useState<string[]>()
  const [dailyObjs, setDailyObjs] = useState<HourlyItemType[]>()
  console.log(dailyObjs, 'dailyObjs')
  const [hourly, setHourly] = useState<HourlyDataType>()
  const [hourlySeven, setHourlySeven] = useState<any>([])

  // get user lat long via permission ----------------------------------------------------
  const getGeoLocation = () => {
    // here we are checking if user provides its location or not
    if ('geolocation' in navigator) {
      navigator?.geolocation?.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords

        // fetch weather data based on lat & long
        try {
          const fetchWeather = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,relative_humidity_2m,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=auto`
          );
          if (!fetchWeather.ok) {
            throw new Error('Fetching weather data failed. Please try again later')
          }
          const weatherData = await fetchWeather?.json()
          setWeather(weatherData)
          setCurrWeath(weatherData?.current_weather)
          setDaily(weatherData?.daily)
          setHourly(weatherData?.hourly)
        }
        catch (error) {
          console.log(error)
        }
      })
    }

  }
  // call geolocation on initial render ----------------------------------------------------
  useEffect(() => {
    getGeoLocation()
  }, [])
  // decide weather type ----------------------------------------------------
  const getWeatherCategory = (code: number) => {
    if ([0, 1].includes(code)) return "sunny";
    if ([2, 3].includes(code)) return "cloudy";
    if ([45, 48].includes(code)) return "foggy";
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return "rainy";
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return "snowy";
    if ([95, 96, 99].includes(code)) return "stormy";
    return "unknown";
  }
  // get next seven hours
  const getNextSevenHours = (hourly: any) => {
    if (!hourly || !hourly.time) return [];

    const now = new Date();
    // YYYY-MM-DD & HH
    const currentDate = now.toISOString().slice(0, 10);
    const currentHourLocal = now?.getHours()?.toString()?.padStart(2, "0");

    // Match Open-Meteo format → "YYYY-MM-DDTHH"
    const currentHourIso = `${currentDate}T${currentHourLocal}`;

    // Find current hour index in API response
    const currentIndex = hourly?.time?.findIndex((t: string) => t?.startsWith(currentHourIso));

    if (currentIndex === -1) return [];

    // Take next 7 hours
    const nextSeven = hourly?.time?.slice(currentIndex + 1, currentIndex + 10)?.map((time: string, index: number) => ({
      time: time?.split("T")[1],
      temp: hourly?.temperature_2m[currentIndex + index],
      type: getWeatherCategory(hourly?.weathercode[currentIndex + index] ?? null),
    }));

    return nextSeven;
  };
  // call seven hour data function ----------------------------------------------------
  useEffect(() => {
    if (!hourly) return;
    setHourlySeven(getNextSevenHours(hourly));
  }, [hourly]);

  // convert iso date to readable format
  useEffect(() => {
    const formatted = daily?.time?.map(d => {
      const date = new Date(d);
      return date.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short"
      });
    });
    setFormattedDates(formatted)
  }, [daily])

  // make daily data
  useEffect(() => {
    const dailyData = Array.from({ length: 7 }, (_, dailyIndex) => {
      return {
        time: formattedDates?.[dailyIndex],
        temp: daily?.temperature_2m_max?.[dailyIndex],
        type: getWeatherCategory(daily?.weathercode?.[dailyIndex] ?? 5),
      }
    })
    setDailyObjs(dailyData)
  }, [daily])

  return (
    <div className='main-wrapper'>
      <p className='main-app-name'>overcast</p>
      <div className='main-left-right'>
        <div className='main-left'>
          <LeftTop greetingVal={greeting} dateVal={getDate} locationName={`${weather?.latitude}, ${weather?.longitude}`} />
          <LeftMid currentTemp={currWeath?.temperature} weathType={getWeatherCategory(currWeath?.weathercode ?? 0)} speed={currWeath?.windspeed} speedUnit={weather?.current_weather_units?.windspeed} />
          <div className='main-left-hourly'>
            {hourlySeven?.map((hourlyItem: HourlyItemType, hourlyIndex: number) => (
              <HourlyCard key={hourlyIndex} time={hourlyItem?.time} temp={hourlyItem?.temp} type={hourlyItem?.type} />
            ))}
          </div>
        </div>
        <div className='main-right'>
          <p className='main-right-head'>next few days</p>
          <div className='main-right-daily'>
            {dailyObjs?.map((dailyItem: HourlyItemType, dailyIndex: number) => (
              <HourlyCard key={dailyIndex} time={dailyItem?.time} temp={dailyItem?.temp} type={dailyItem?.type} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
