import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Authenticate(){

    const [accountNo, setAccountNo] = useState('');
    const [pin, setPin] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const server_url = process.env.REACT_APP_server_url;

    const handleInputChange = (e)=>{
        const input = e.target.value;
        if(input.length === 11) return;
        setAccountNo(input);
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(accountNo.length < 10) return;
        const data = { account_no: accountNo, pin: pin };

        try{
            const res = await axios.post(`${server_url}/customer`, data);
            localStorage.setItem('account_no', res.data.account_no);
            localStorage.setItem('amount', res.data.amount);
            localStorage.setItem('pin', res.data.pin);
            navigate('/');
        }catch(err){
            if(err.code === "ERR_NETWORK") setMessage('Internal Server Error');
            else setMessage(err.response.data);
        }
    }

    return(
        <div className='container3'>
          {
            message ? <p className='message'>{message}</p> :
          <form onSubmit={handleSubmit}>
            <div className='wrp'>
               <label>Account Number: </label>
               <input type='number' value={accountNo} onChange={(e)=>{ handleInputChange(e) }} required/>
            </div>

            <div className='wrp'>
               <label>Pin: </label>
               <input type='password' value={pin} onChange={(e)=>{ setPin(e.target.value) }} required 
               maxLength='4' minLength='4'/>
            </div>

            <button className='main-menu auth-btn-position'>Proceed</button>
          </form>
          }
        </div>
    );
}
export default Authenticate;