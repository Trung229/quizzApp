import React, { createContext, useState, useRef } from "react";

export const QuestionContext = createContext();


const QuestionContextProvider =({ children})=>{
    const [question, setQuestion] = useState([
        {
          questionText: 'Who is Prime Minister of India?',
          answerOptions: [
            { answerText: 'Vijay Rupani', isCorrect: false },
            { answerText: 'Manmohan singh', isCorrect: false },
            { answerText: 'Narendra Modi', isCorrect: true },
            { answerText: 'Deep Patel', isCorrect: false },
          ],
        },
        {
          questionText: 'Who is CEO of Tata?',
          answerOptions: [
            { answerText: 'Jeff Bezos', isCorrect: false },
            { answerText: 'Ratan Tata', isCorrect: true },
            { answerText: 'Mukesh Ambani', isCorrect: false },
            { answerText: 'Gautam Adani', isCorrect: false },
          ],
        },
        {
          questionText: 'who is richest person in the world?',
          answerOptions: [
            { answerText: 'Jeff Bezos', isCorrect: false },
            { answerText: 'Elon Musk', isCorrect: true },
            { answerText: 'Mukesh Ambani', isCorrect: false },
            { answerText: 'Warren Buffett', isCorrect: false },
          ],
        },
        {
          questionText: 'how many countries in the world?',
          answerOptions: [
            { answerText: '120', isCorrect: false },
            { answerText: '183', isCorrect: false },
            { answerText: '170', isCorrect: false },
            { answerText: '195', isCorrect: true },
          ],
        },
      ])
      const answer = useRef([]);
      const [score, setScore] = useState(0)
      const [final,setFinal] = useState(0)
      const submitForm = ()=>{
          setFinal(answer.current.length);
          console.log(final);
      }
      const onChangeValue =(e, check, indexQuestion, indexAnswer)=>{
        // let checkValue = question[indexQuestion].answerOptions[indexAnswer].isCorrect == true ? true:false;
        if(check){
          answer.current.push(check);
        }
      }
      const QuestionContextData ={
          question,final, submitForm,onChangeValue
      }
      return(
          <QuestionContext.Provider value={QuestionContextData}>
              {children}
          </QuestionContext.Provider>
      )

}
export default QuestionContextProvider;