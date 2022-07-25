import {useState} from 'react'

const Statistics = ({good, neutral, bad}) => {
    if (good + neutral + bad === 0) {
        return (
            <>
                <p>No feedback given</p>
            </>
        )
    }
    return (
        <>
            <table>
                <tbody>
                <StatisticLine text={'good'} value={good}/>
                <StatisticLine text={'neutral'} value={neutral}/>
                <StatisticLine text={'bad'} value={bad}/>
                <StatisticLine text={'all'} value={good + neutral + bad}/>
                <StatisticLine text={'average'} value={(good - bad) / (good + neutral + bad)}/>
                <StatisticLine text={'positive'} value={good / (good + neutral + bad) * 100}/>
                </tbody>
            </table>
        </>
    )
}

const StatisticLine = ({text, value}) => {
    if (text === 'positive') {
        return (
            <tr>
                <td>
                    {text} {value} %
                </td>
            </tr>
        )
    }

    return (
        <tr>
            <td>
                {text} {value}
            </td>
        </tr>
    )
}

const Button = ({handleCLick, text}) => {
    return (
        <button onClick={handleCLick}>
            {text}
        </button>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleCLick={() => setGood(good + 1)} text={'good'}/>
            <Button handleCLick={() => setNeutral(neutral + 1)} text={'neutral'}/>
            <Button handleCLick={() => setBad(bad + 1)} text={'bad'}/>
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App
