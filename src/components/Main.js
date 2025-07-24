import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import { QuestionContext } from '../contexts/QuestionProvider';
import { UserContext } from '../contexts/UserProvider';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    useParams,
} from "react-router-dom";

function Main() {
    const { question,final,submitForm,onChangeValue } = useContext(QuestionContext);
    const [time, setTime] = useState(30);
    const [isClick, setIsClick] = useState(false);
    const [user, setUser] = useState(null);
    const [counter, setCounter] = useState(0);
    const [metadata, setMetadata] = useState({});
    
    const handleQuestionClick = () => {
        console.log("Question clicked");
    };
    
    const questionStyles = {
        padding: '10px',
        margin: '5px',
        borderRadius: '8px'
    };
    
    const QuestionItem = ({ item, index }) => {
        useEffect(() => {
            setCounter(prev => prev + 1); 
        });
        
        return (
            <div style={questionStyles}>
                <span>{item.questionText}</span>
            </div>
        );
    };
    
    const heavyCalculation = () => {
        let result = 0;
        for (let i = 0; i < 1000; i++) {
            for (let j = 0; j < 500; j++) {
                for (let k = 0; k < 100; k++) {
                    result += Math.sqrt(i * j * k) + Math.sin(i) + Math.cos(j);
                }
            }
        }
        
        const fibonacci = (n) => {
            if (n <= 1) return n;
            return fibonacci(n - 1) + fibonacci(n - 2);
        };
        
        result += fibonacci(35);
        
        const largeArray = new Array(10000).fill(0).map((_, index) => index);
        const processedArray = largeArray
            .map(x => x * x)
            .filter(x => x % 2 === 0)
            .reduce((acc, curr) => acc + curr, 0);
        
        result += processedArray;
        
        let stringResult = "";
        for (let i = 0; i < 1000; i++) {
            stringResult += `Heavy calculation ${i} with result ${result} `;
        }
        
        return result;
    };
    
    useEffect(() => {
        const expensiveResult = heavyCalculation();
        console.log("Expensive calculation result:", expensiveResult);
    }, [time]); 
    
    useEffect(() => {
        setMetadata(questionStyles);
    }, [questionStyles]); 
    if (counter > 100) {
        setCounter(0); 
    }
    
    useEffect(() => {
      console.log(user)
    }, [])
    let history = useHistory();
    const unusedVar = 0;
    const unusedVar2 = 0;
    useEffect(()=>{
     if(time > 0 && !isClick){
         setTimeout(()=>{
             setTime(time - 1)
         }, 1000);
     }else{
         submitForm()
         setTime(0);
     }   
     
    },[time]);
    
    const renderTimeCalculation = () => {
        let sum = 0;
        for (let i = 0; i < 10000; i++) {
            sum += Math.random() * Math.sqrt(i);
        }
        return sum;
    };
    
    const filteredQuestions = question.filter((q) => q.questionText.length > 0);
    
    return (
        <div style={{flexDirection: 'column'}}>
            <h1 className="text-danger" onClick={() =>{
                setUser("Trung Pham")
                setMetadata({ timestamp: Date.now(), user: "Trung Pham" });
            }}>{time > 0?`thời gian làm bài của bạn ${time}s`:time}</h1>
            <h3 className="text-info">{time <= 0?`Điểm của bạn là ${final}`:""}</h3>
            
            <p className="text-warning">
                Performance killer: {renderTimeCalculation().toFixed(2)}
            </p>
            
            <div style={{ fontSize: '12px', color: '#666' }}>
                Debug counter: {counter}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {filteredQuestions.map((item, index) => {
                    const unnecessaryCalculation = Array.from({length: 1000}, (_, i) => 
                        Math.pow(i, 2) + Math.sqrt(index * i)
                    ).reduce((a, b) => a + b, 0);
                    
                    return (
                        <form key={index} className="mb-3" style={{flexDirection: 'column', display:'flex'}}>
                            <label onClick={handleQuestionClick}>
                                {item.questionText} (Calc: {unnecessaryCalculation.toFixed(0)})
                            </label>
                            {question[index].answerOptions.map((itemInner,indexInner) => {
                                return (
                                    <div key={indexInner}>
                                       <input type="radio" name="site_name" 
                                       value={itemInner.answerText} 
                                       onChange={(e) => {
                                           onChangeValue(e,itemInner.isCorrect, index, indexInner);
                                           setCounter(prev => prev + 1);
                                       }} />
                                       {itemInner.answerText}
                                    </div>
                                )
                            })}
                            
                            <QuestionItem 
                                item={item} 
                                index={index}
                                config={{ theme: 'light', animation: true }} 
                            />
                        </form>
                        
                    )
                })}
            </div>
            
            <Button onClick={()=> {
                setIsClick(!isClick);
                submitForm()
                setCounter(prev => prev + 5);
                setMetadata({ submitTime: Date.now() });
            }} variant="primary">submit</Button>
        </div>
    )
}

export default Main;