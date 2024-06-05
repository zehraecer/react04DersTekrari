import { useEffect, useRef, useState } from 'react'
import './App.css'
import { HackerRankAPI, JsonPlaceHolder } from './components/api';

function App() {

  const [data, setData] = useState("")
  const [data2, setData2] = useState([])
  const [opitons, setOptions] = useState()
  const [footballOptions, SetFootballOptions] = useState(2011)
  const [input, setInput] = useState(0)
  const footballRef = useRef()
  const jsonRef = useRef()

  useEffect(() => {
    if (opitons === "true") {
      jsonRef.current.style.display = "none"
      footballRef.current.style.display = "block"

      HackerRankAPI.get(`football_competitions?year=${2012}`).then((result) => setData2(result))
      setData("")
    } if (opitons === "false") {

      footballRef.current.style.display = "none"
      jsonRef.current.style.display = "block"

    }

  }, [opitons])

  const getItem = () => {
    if (opitons === "false") {
      JsonPlaceHolder.get(`posts/${input}`).then((result) => setData(result))
      setData2([])

    }
  }
  console.log(data2);
  return (

    <>
      <div>
        <select value={opitons} onChange={(e) => setOptions(e.target.value)}>
          <option value="false" >jsonplaceholder</option>
          <option value="true">hackerrank</option>
        </select>

        <div style={{ display: "none" }} ref={jsonRef}  >
          <input type="number" value={input} onChange={(e) => setInput(e.target.value)} />
          <button onClick={getItem} >gönder</button>

          <h4>{data.title}</h4>

        </div>

        <div style={{ display: "none" }} ref={footballRef}>

          <select id="cars" onChange={(e) => SetFootballOptions(e.target.value)} >
            {data2.map((option, index) => {

              return (
                <option key={index} className='option' value={option.year}>{`${option.year}`}</option>
              )
            })}
          </select>


          {data2.map((data, index) => {
            return (
              <h4 key={index}>{data.name} - {data.runnerup} - {data.winner}</h4>
            )

          })}

        </div>



      </div>
    </>
  )
}

export default App
