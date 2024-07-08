import React from 'react'
import {decode} from 'html-entities';

function Quizmenu(){
 const [questions, setQuestions] = React.useState([])
 const [formData, setFormData] = React.useState({}) 
 const [selectedAnswer, setSelectedAnswer] = React.useState({})
 const [scoreCount, setScoreCount] = React.useState(0)

React.useEffect(() =>{
    fetch('https://opentdb.com/api.php?amount=5&category=12&difficulty=medium&type=multiple')
    .then(res => res.json())
    .then(data => {
        const questionWithId = data.results.map((question,index) => {
            const allAnswers = [...question.incorrect_answers, question.correct_answer];
            return{
                ...question,
                id: index + 1,
                name: `answers${index + 1}`,
                allAnswers: allAnswers.sort(() => Math.random() - 0.5)
            };
      });
              setQuestions(questionWithId)     
    })
      .catch(error => console.error('Error fetching data:', error));
 }, []);



 function handleChange(event, question){
    const {name, value, type, checked} = event.target

    setFormData(prevForm => {
        return({
            ...prevForm,
            [name]:type === "checkbox"? checked : value
        })
    })

    setSelectedAnswer(prevSelect => {
        return({
            ...prevSelect,
            [question.name]: value
        })
    })

    if (value === question.correct_answer) {
       setScoreCount(prevCount => prevCount + 1)
      }
    
}

function getAnswerStyle(question, answer) {
    if (!selectedAnswer[question.name]) {
      return {};
    }
    return {
      color: answer === question.correct_answer ? 'green' : 'red'
    };
  }

return (
    <div className='whole'>
        <form>
            {questions.length > 0 ?  questions.map(question => (
                <div key={question.id}>
                  <h1>{decode(question.question)}</h1>
                    <ul>
                       {question.allAnswers.map((answer,aIndex) => (
                         <li key={aIndex}>
                            <input
                                type='radio'
                                name={question.name}
                                id={`${question.name}-${aIndex}`}
                                value={answer}
                                onChange={(event) => handleChange(event, question)}
                                checked={formData[question.name] === answer}
                             />
                              <label 
                              htmlFor={`${question.name}-${aIndex}`}
                              style={getAnswerStyle(question, answer)}
                              >
                                {answer}
                             </label>
                         </li>
                     ))}
                    </ul>
                    <br />
                    <hr />
                 </div>
            ))
            : (<p>Loading questions...</p>)}
            
        </form>

        <div className='scoreCount'>
            <h1>{scoreCount} of {questions.length} correct </h1>
        </div>
        
    </div>
)
}

export default Quizmenu


// {questions.length > 0 ? (
//     <ul>
//       {questions.map((question, index) => (
//         <li key={index}>{question.question}</li>
//       ))}
//     </ul>
//   ) : (
//     <p>Loading questions...</p>
//   )}






//




{/* 
    <h1>What is my Fathers name</h1>
    <ul>
        <li>
            <input
                type='radio'
                name='answers2' 
                id='connectt1'
                value='charles'
                onChange={handleChange}
                checked={formData.answers === 'charles'}
                />
            <label htmlFor='connectt1'>Charles</label>
        </li>
        <li>
            <input 
            type='radio' 
            name='answers2' 
            id='connectt2'
            value="felix"
            onChange={handleChange}
            checked={formData.answers === 'felix'}
            />
            <label htmlFor='connectt2'>Felix</label>
        </li>
        <li>
            <input 
            type='radio' 
            name='answers2' 
            id='connectt3'
            value="john"
            onChange={handleChange}
            checked={formData.answers === 'john'}
            />
            <label htmlFor='connectt3'>John</label>
        </li>
    </ul>
    <br />
    <hr /> */}
        