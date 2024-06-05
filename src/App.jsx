import { useEffect, useRef, useState } from 'react'
import './App.css'
import { HackerRankAPI, JsonPlaceHolder } from './components/api';

function App() {

  const [data, setData] = useState("")
  const [data2, setData2] = useState([])
  const [opitons, setOptions] = useState()
  const [selectYear, setSelectYear] = useState(2011)
  const [input, setInput] = useState(0)
  const footballRef = useRef()
  const jsonRef = useRef()

  useEffect(() => {
    if (opitons === "true") {
      jsonRef.current.style.display = "none"
      footballRef.current.style.display = "block"

      HackerRankAPI.get(`football_competitions?year=${selectYear}`).then((result) => setData2(result))
      setData("")
    } if (opitons === "false") {

      footballRef.current.style.display = "none"
      jsonRef.current.style.display = "block"

    }

  }, [opitons, selectYear])

  const getItem = () => {
    if (opitons === "false") {
      JsonPlaceHolder.get(`posts/${input}`).then((result) => setData(result))
      setData2([])

    }
  }


  const years = [
    { year: 2011 },
    { year: 2012 },
    { year: 2013 },
    { year: 2014 },
    { year: 2015 },
  ]


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

          <select id="cars" onChange={(e) => setSelectYear(e.target.value)} >
            {years.map((option, index) => {
              { option }
              return (
                <option key={index} value={option.year}>{`${option.year}`}</option>
              )
            })}
          </select>


          {data2.filter((data) => data.year == selectYear).map((x, index) => {
            return (
              <h4 key={index}>{x.name} - {x.runnerup} - {x.winner}</h4>
            )
          })}

        </div>



      </div>
    </>
  )
}

export default App
