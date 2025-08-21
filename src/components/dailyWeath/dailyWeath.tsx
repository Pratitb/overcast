
import type { DailyWeathType } from '../../types'
import dailyCss from './dailyWeath.module.scss'
const DailyWeath = ({ date, temp, type }: DailyWeathType) => {
    return (
        <div className={`${dailyCss['main-left__daily']}`}>
            <p className={`${dailyCss['main-left__daily-date']}`}>{date}</p>
            <p className={`${dailyCss['main-left__daily-temp']}`}>{temp}</p>
            <p className={`${dailyCss['main-left__daily-type']}`}>{type}</p>
        </div>
    )
}

export default DailyWeath