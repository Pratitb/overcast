import './styles/App.scss'
import LeftBottom from './components/leftBottom/leftBottom'
import LeftMid from './components/leftMid/leftMid'
import LeftTop from './components/leftTop/leftTop'
import { useEffect, useState } from 'react';

function App() {

  const [greeting, setGreeting] = useState<string>('');
  const getDate = new Date().toDateString()
  const getHours = new Date().getHours()
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

  // get user location via consent
  /* if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      console.log("Latitude:", latitude, "Longitude:", longitude);
    },
      (error) => {
        console.error("Geolocation error:", error.message);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  } */

  // get user location based off of ip address
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')

  useEffect(() => {
    const getIpLocation = async () => {
      try {
        const fetchLocation = await fetch('https://ipapi.co/json')
        if (!fetchLocation?.ok) {
          throw new Error('Failed to fetch location based off of IP')
        }
        const locationData = await fetchLocation?.json()
        console.log(locationData, 'locationData')
        setCity(locationData?.city)
        setRegion(locationData?.region)
      }
      catch (error) {
        console.log(error)
      }
    }
    getIpLocation()
  }, [])

  return (
    <div className='main-wrapper'>
      <p className='main-app-name'>overcast</p>
      <div className='main-left'>
        <LeftTop greetingVal={greeting} dateVal={getDate} locationName={`${city}, ${region}`} />
        <LeftMid />
        <LeftBottom />
      </div>
      <div className='main-right'>
        <LeftTop />
      </div>
    </div>
  )
}

export default App
