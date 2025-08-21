import type { LeftMidType } from '../../types'
import midCss from './leftMid.module.scss'

const LeftMid = ({ currentTemp, weathType }: LeftMidType) => {
    return (
        <div className={`${midCss['main-left__mid']}`}>
            {/* { <span className={`${midCss['main-left__unit']}`}>&deg;C</span>} */}
            <p className={`${midCss['main-left__temp']}`}>{currentTemp}</p>
            <p className={`${midCss['main-left__weath-type']}`}>{weathType}</p>
        </div>
    )
}

export default LeftMid