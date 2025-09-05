import type { LeftMidType } from '../../types'
import midCss from './leftMid.module.scss'

const LeftMid = ({ currentTemp, weathType, speed, speedUnit }: LeftMidType) => {
    return (
        <div className={`${midCss['main-left__mid']}`}>
            <div className={`${midCss['main-left__temp']}`}>
                <p className={`${midCss['main-left__temp__num']}`}>{currentTemp}</p>
                <span className={`${midCss['main-left__unit']}`}>&deg;C</span>
            </div>
            <div className={`${midCss['main-left__metrics']}`}>
                <p className={`${midCss['main-left__metrics-type']}`}>{weathType}</p>
                <p className={`${midCss['main-left__metrics-type']}`}>{speed}{speedUnit}</p>
            </div>
        </div>
    )
}

export default LeftMid