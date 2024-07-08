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

  return (
    <>
      <div>

        <img src={blob2} className='upShape' />
        <img src={blob1} className='downShape' />
          {quiz? <div className='openContainer'>
              <h1>Quizzical</h1>
              <p>Desktop version</p>
              <p>I know say you no sabi am, me we do am no sabi am too </p>
              <button onClick={StartQuiz}>Start Quiz</button>
          </div> : <Quizmenu /> }
          

      </div>
     
    </>
  )
}

export default App



// https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple