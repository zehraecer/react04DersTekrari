import { useEffect, useRef, useState } from 'react'
import './App.css'
import { HackerRankAPI, JsonPlaceHolder } from './components/api';

function App() {

  const [data, setData] = useState("")
  const [data2, setData2] = useState([])
  const [options, setOptions] = useState()
  const [selectYear, setSelectYear] = useState(2011)
  const [input, setInput] = useState(0)
  const footballRef = useRef()
  const jsonRef = useRef()

  useEffect(() => {
    if (options === "true") {
      jsonRef.current.style.display = "none"
      footballRef.current.style.display = "block"

      HackerRankAPI.get(`football_competitions?year=${selectYear}`).then((result) => setData2(result))
      setData("")
    } if (options === "false") {

      footballRef.current.style.display = "none"
      jsonRef.current.style.display = "flex"

    }

  }, [options, selectYear])

  const getItem = () => {
    if (options === "false") {
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

        <div className='selectApi'>

          <label style={{ color: "darkblue" }}>Select Api</label>
          <select value={options} onChange={(e) => setOptions(e.target.value)}>
            <option value="false" >jsonplaceholder</option>
            <option value="true">hackerrank</option>
          </select>

        </div>

        <div className='json' ref={jsonRef}  >

          <div className='jsonInput'>
            <input type="number" value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={getItem} >gönder</button>
          </div>

          <ul>

            <li>{data.title}</li>
            <li>{data.body}</li>

          </ul>

        </div>

        <div className='football' style={{ display: "none" }} ref={footballRef}>
          <label style={{ color: "darkblue", marginRight: "20px" }}>Select Year</label>
          <select id="cars" onChange={(e) => setSelectYear(e.target.value)} >
            {years.map((option, index) => {
              { option }
              return (
                <option key={index} value={option.year}>{`${option.year}`}</option>
              )
            })}
          </select>



          <div className='footballTable'>
            <table>
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Name</th>
                  <th>RunnerUp</th>
                  <th>Winner</th>
                </tr>
              </thead>
              <tbody>
                {data2.filter((data) => data.year == selectYear).map((x, index) => (
                  <tr key={index}>
                    <td>{x.country}</td>
                    <td>{x.name}</td>
                    <td>{x.runnerup}</td>
                    <td>{x.winner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>



        </div>
      </div>

    </>
  )
}

export default App
