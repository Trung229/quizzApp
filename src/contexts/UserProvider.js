import React, { createContext, useState } from "react";



export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [users, setUsers] = useState([
        {
            id: 1, email: "ductrung@gmail.com", password: "123456789",
        },
        {
            id: 2, email: "khanh@gmail.com", password: "123456789",
        },
    ])
    const [active, setActive] = useState(false);
    const [validateEmail, setValidateEmail] = useState({message:"", isValid:true});
    const [validatePassword, setValidatePassword] = useState({message:"", isValid:true});
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [allow, setAllow] = useState({isAccess:false, token:{}});
    function checkEmail(){
        const domainEmail = /.{3,5}\@.{5,10}.{2,}/g;
        const emailLength = /.{5,}/g;
        let user = users.some(item=> email == item.email);
        if(!emailLength.test(email)){
            setValidateEmail({...validateEmail, message:"bạn không được để trống email", isValid:false});
            return false;
        }else if(!domainEmail.test(email)){
            setValidateEmail({...validateEmail, message:"bạn nhập không đúng định dạng email", isValid: false});
            return false;
        }else if(!user){
            setValidateEmail({...validateEmail, message:"Tài khoản không tồn tại", isValid: false});
            return false;
        }
        else{
            setValidateEmail({...validateEmail, message:"", isValid:true});
            return true;
        }
    }
    const checkPassWord = () =>{
        const passLength = /.+/g;
        const specialCharacter = /[^a-zA-Z0-9]/g;
        const lengthLimit = /.{8,15}/g
        if(!passLength.test(password)){
            setValidatePassword({message:"bạn không được để trống Password", isValid:false});
            return false;
        }else if(specialCharacter.test(password)){
            setValidatePassword({message:"bạn không được dùng ký tự đặt biệt trong mật khẩu", isValid:false});
            return false;
        }else if(!lengthLimit.test(password)){
            setValidatePassword({message:"bạn không được nhập quá ký tự cho phép(8-15)", isValid: false});
            return false;
        }else{
            setValidatePassword({message:"", isValid:true});
            return true;
        }
    }

    const checkEmailSignUp =()=>{
        const domainEmail = /.{3,5}\@.{5,10}.{2,}/g;
        const emailLength = /.{5,}/g;
        let user = users.some(item=> email == item.email);
        if(!emailLength.test(email)){
            setValidateEmail({...validateEmail, message:"bạn không được để trống email", isValid:false});
            return false;
        }else if(!domainEmail.test(email)){
            setValidateEmail({...validateEmail, message:"bạn nhập không đúng định dạng email", isValid: false});
            return false;
        }else if(user){
            setValidateEmail({...validateEmail, message:"Tài khoản đã tồn tại", isValid: false});
            return false;
        }
        else{
            setValidateEmail({...validateEmail, message:"", isValid:true});
            return true;
        }
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const OnSignUp =()=>{
        const isEmailValid = checkEmailSignUp();
        const isPasswordValid = checkPassWord();
        if(isEmailValid && isPasswordValid){
            const newUser ={
                id:users.length+1,
                email:email,
                password:password,
            }
            setEmail(...users,newUser);
            setAllow({isAccess:true, token:newUser});
        }
    }
    const onSubmit =()=>{
        const isEmailValid = checkEmail();
        const isPasswordValid = checkPassWord();
        if(isEmailValid && isPasswordValid){
            const user = users.find(item=>email == item.email);
            setAllow({isAccess:true, token:user});
        }
        
    }
    
    const UserContextData = {
        users, validateEmail,validatePassword, password, email,allow, active, onChangeEmail, onChangePassword, onSubmit, OnSignUp
    }


    return (
        <UserContext.Provider value={UserContextData}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider;