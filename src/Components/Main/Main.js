import { useState, useEffect} from 'react'
import Papa from 'papaparse'
import file from '../../Data/studentMockData.csv'
import Chart from '../Chart/Chart'
import Students from '../Students/Students'
import StudentProfiles from '../Students/StudentProfiles'

const Main = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [name, setName] = useState('')
    const [difficultyChecked, setDifficultyChecked] = useState(true)
    const [enjoyChecked, setEnjoyChecked] = useState(true)
    const [lineChartChecked, setLineChart] = useState(false)

    useEffect(() => {
        Papa.parse(file, {
            download: true,
            header: true,
            complete: (results) => {
                setData(results.data)
                setIsLoading(false)
            }
        })
    }, [])

    const onStudentSelect = (event) => {
        setName(event.target.innerText)
    }

    const onAllSelect = () => {
        setName('')
    }

    const toggleDifficulty = () => {
        setDifficultyChecked(!difficultyChecked)
    }

    const toggleEnjoyment = () => {
        setEnjoyChecked(!enjoyChecked)
    }

    const toggleLineChart = () => {
        setLineChart(!lineChartChecked)
    }

    return (
        <main>
            <nav>
                <section className="student-names">
                    <Students 
                        data={data}
                        isLoading={isLoading}
                        name={name}
                        onStudentSelect={onStudentSelect}
                        onAllSelect={onAllSelect}
                    />
                </section>
                <section className="student-profiles">
                    <StudentProfiles 
                        name={name}
                    />
                </section>
                <form>
                    <h4>Choose an option below</h4>
                    <label htmlFor="difficulty" className='checkbox-container'>
                        <input
                            type="checkbox"
                            className="check-difficulty"
                            id="difficulty"
                            name="rating"
                            value="difficulty"
                            checked={difficultyChecked}
                            onChange={toggleDifficulty}
                        />
                        Difficulty
                        <span className="checkmark"></span>
                    </label>
                    <label htmlFor="enjoyment" className="checkbox-container">
                        <input
                            type="checkbox"
                            className="check-enjoyment"
                            id="enjoyment"
                            name="rating"
                            value="enjoyment"
                            checked={enjoyChecked}
                            onChange={toggleEnjoyment}
                        />
                        Enjoyment
                        <span className="checkmark"></span>
                    </label>
                    <label htmlFor="line-chart" className="checkbox-container">
                        <input
                            type="checkbox"
                            className="check-linechart"
                            id="line-chart"
                            name="rating"
                            value="enjoyment"
                            checked={lineChartChecked}
                            onChange={toggleLineChart}
                        />
                        Show as linechart
                        <span className="checkmark"></span>
                    </label>
                </form>
            </nav>
            <section className="chart">
                <Chart
                    data={data}
                    isLoading={isLoading}
                    name={name}
                    difficultyChecked={difficultyChecked}
                    enjoyChecked={enjoyChecked}
                    lineChartChecked={lineChartChecked}
                />
            </section>
        </main>
    )
}

export default Main