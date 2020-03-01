import React, { useRef, useState, useLayoutEffect, useEffect } from 'react'

function Slider({ from = 0, to = 100, width = 250, getValue = alert}) {
    const sliderRef = useRef()
    const lensRef = useRef()
    const [lensVisible, setLensVisible] = useState(false)
    const [xCoordinate, setXCoordinate] = useState(0)
    const [value, setValue] = useState(null)

    const lensValue = Math.round(from + xCoordinate * (to - from) / width)

    // update lens size
    useLayoutEffect(() => {
        if (lensVisible) {
            lensRef.current.style.height = getComputedStyle(lensRef.current).width
        }
    }, [lensVisible, xCoordinate])

    // send value to parent
    useEffect(() => {
        if (value !== null) {
            getValue(value.value)
        }
    }, [value, getValue])

    const sliderMouseEnter = () => {setLensVisible(true)}
    const sliderMouseLeave = () => {
        if (value !== null) {
            setXCoordinate(value.xCoordinate)
        } else {
            setLensVisible(false)
        }
    }
    const sliderMouseMove = e => {
        let x = e.clientX - sliderRef.current.offsetLeft
        if (x < 0) x = 0
        if (x > width) x = width
        setXCoordinate(x)
    }
    const sliderLensCkick = () => {
        setValue({ value: lensValue, xCoordinate })
    }

    return (
        <div
            ref={sliderRef}
            className="slider"
            onMouseEnter={sliderMouseEnter}
            onMouseLeave={sliderMouseLeave}
            onMouseMove={sliderMouseMove}
        >
            <div className="slider__labels">
                <span>{from}</span>
                <span>{to}</span>
            </div>
            <div 
                className="slider__rail"
                style={{width}}
            >
                <div
                    ref={lensRef}
                    className="slider__lens"
                    style={{
                        display: lensVisible? 'flex' : 'none',
                        transform: `translate(calc(${xCoordinate}px - 50%), -50%)`
                    }}
                    onClick={sliderLensCkick}
                >
                    <div className="slider__lens-lines">
                        {lensValue}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Slider