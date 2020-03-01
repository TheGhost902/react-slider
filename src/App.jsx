import React, { useState } from 'react'
import './main.css'
import Slider from './components/Slider'

function App() {
    const [value, setValue] = useState(null)
    return (
        <div className="app">
            <h1>Hello</h1>
            <h2>Value is: {value}</h2>
            <Slider from={0} to={900} width={300} getValue={setValue}/>
        </div>
    )
}

export default App