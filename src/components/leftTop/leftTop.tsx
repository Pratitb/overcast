import type { LeftTopType } from '../../types'
import topCss from './leftTop.module.scss'

const LeftTop = ({ greetingVal, dateVal, locationName }: LeftTopType) => {

    return (
        <div className={`${topCss['main-left__top']}`}>
            <div className={`${topCss['main-left__greet__date']}`}>
                <p className={`${topCss['main-left__greeting']}`}>{`${greetingVal}`}</p>
                <p className={`${topCss['main-left__date']}`}>{dateVal}</p>
            </div>
            <p className={`${topCss['main-left__location']}`}>{locationName}</p>
        </div>
    )
}

export default LeftTop