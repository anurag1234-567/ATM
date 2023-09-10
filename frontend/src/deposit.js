import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Deposit(){

    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async ()=>{
        if(amount.length === 0) return;

        const account_no = localStorage.getItem('account_no');
        const current_bal = parseInt(localStorage.getItem('amount'), 10);
        const Amount = parseInt(amount, 10);
        const new_balance = current_bal + Amount;

        try{
            await axios.put('http://localhost:4000/setAmount', { account_no: account_no, amount: new_balance });
            localStorage.setItem('amount', new_balance);
            setMessage('Cash Deposited Successfully!'); 
        }catch(err){
            setMessage('Internal Server Error!');
        }
    }

    return(
        <div className='container'>
         {
            message ?  <p className='message'>{message}</p> 
            : <>
              <p className='message'>Please Enter Your Amount </p>
              <input type='number' value={amount} onChange={(e)=>{ setAmount(e.target.value) }} />
              <button onClick={handleSubmit} className='deposit-btn'>Deposit</button>
              </>
         }
            <button onClick={()=>{ navigate('/') }} className="main-menu">Main menu</button>
        </div>

    );
}
export default Deposit;