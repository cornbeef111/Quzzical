import React from 'react'
import './App.css'
import blob1 from './images/blob.png'
import blob2 from './images/blob5.png'
import Quizmenu from './component/Quizmenu'

function App() {
  const [quiz, setQuiz] = React.useState(true)
  
   function StartQuiz(){
      setQuiz(false)
   }
   function endgame(){
    setQuiz(true)
   }

  return (
    <>
      <div>

        <img src={blob2} className='upShape' />
        <img src={blob1} className='downShape' />
          {quiz? <div className='openContainer'>
              <h1>Quizzical</h1>
              <p>(Desktop version)</p>
              <p>P/S: Please tilt your mobile phone</p>
              <button onClick={StartQuiz}>Start Quiz</button>
          </div> : <Quizmenu endgame={endgame}/> }
          

      </div>
     
    </>
  )
}

export default App



// https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple