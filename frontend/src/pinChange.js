import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function PinChange(){

    const [oldPin, setOldPin] = useState('');
    const [newPin, setNewPin] = useState('');
    const [confirmNewPin, setConfirmNewPin] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const server_url = process.env.REACT_APP_server_url;

    const handleSubmit = async (e)=>{
       e.preventDefault();
       const pin = localStorage.getItem('pin');

       if(oldPin !== pin){
        setMessage('Wrong PIN!');
        return;
       }
       if(newPin !== confirmNewPin){
        setMessage('New PIN and Re-entered PIN does not match!');
        return;
       }
       const account_no = localStorage.getItem('account_no');

       try{
        await axios.put(`${server_url}/pinChange`, { account_no: account_no, pin: newPin });
        localStorage.setItem('pin', newPin); 
        setMessage('PIN Change Successfully!');
       }catch(err){
        setMessage('Internal Server Error!');
       }
    }

    return(
        <div className="container1">
        {
            message ? <p className='message'>{message}</p> 
            :
            <form onSubmit={handleSubmit}>
                <div className='input-wrp'>
                   <label>Old Pin: </label>
                   <input type='password' value={oldPin} onChange={(e)=>{ setOldPin(e.target.value) }}  
                   maxLength='4' minLength='4' required/>
                </div>

                <div className='input-wrp'>
                   <label>New Pin:</label>
                   <input type='password' value={newPin} onChange={(e)=>{ setNewPin(e.target.value) }} 
                   maxLength='4' minLength='4' required/>
                </div>

                <div className='input-wrp'>
                   <label>Re-enter Pin:</label>
                   <input type='password' value={confirmNewPin} onChange={(e)=>{ setConfirmNewPin(e.target.value) }} 
                   maxLength='4' minLength='4' required/>
                </div>

                <button className="changePin-btn">Change Pin</button>
            </form>
        }

        <button onClick={()=>{ navigate('/') }} className='menu-btn'>Main menu</button>
        </div>
    );
}
export default PinChange;
