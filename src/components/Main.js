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
    let history = useHistory();
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
    
    
    return (
        <div style={{flexDirection: 'column'}}>
            <h1 className="text-danger">{time > 0?`thời gian làm bài của bạn ${time}s`:time}</h1>
            <h3 className="text-info">{time <= 0?`Điểm của bạn là ${final}`:""}</h3>
            {question.map((item, index) => {
                return (
                    <form className="mb-3" style={{flexDirection: 'column', display:'flex'}}>
                        <label>
                            {item.questionText}
                        </label>
                        {question[index].answerOptions.map((itemInner,indexInner) => {
                            return (
                                <div>
                                   <input type="radio" name="site_name" 
                                   value={itemInner.answerText} 
                                   onChange={(e)=> onChangeValue(e,itemInner.isCorrect, index, indexInner)} />
                                   {itemInner.answerText}
                                </div>
                            )
                        })}
                    </form>
                    
                )
            })}
            <Button onClick={()=> {
                setIsClick(!isClick);
                submitForm()
            }} variant="primary">submit</Button>
        </div>
    )
}

export default Main;