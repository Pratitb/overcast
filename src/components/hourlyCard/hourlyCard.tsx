import type { HourlyType } from '../../types'
import hourCss from './hourlyCard.module.scss'
const HourlyCard = ({ time, temp, type }: HourlyType) => {
    return (
        <div className={`${hourCss['main-hour__wrap']} ${hourCss[`main-hour__${type}`]}`}>
            <p className={`${hourCss['main-hour__time']}`}>{time}</p>
            <p className={`${hourCss['main-hour__temp']}`}>{temp}</p>
            <p className={`${hourCss['main-hour__type']}`}>{type}</p>
        </div>
    )
}

export default HourlyCard