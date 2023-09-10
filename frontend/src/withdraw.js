import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Withdraw(){

    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async ()=>{
        if(amount.length === 0) return;

        const account_no = localStorage.getItem('account_no');
        const current_bal = parseInt(localStorage.getItem('amount'), 10);
        const Amount = parseInt(amount, 10);
        
        if(current_bal < Amount){
            setMessage('Your Account not does not enough balance for transaction!');
            return;
        }
        const new_balance = current_bal - Amount;

        try{
            await axios.put('http://localhost:4000/setAmount', { account_no: account_no, amount: new_balance });
            localStorage.setItem('amount', new_balance);
            setMessage('Please Collect Your Cash!');
        }catch(err){
            setMessage("Internal Server error!");
        }
    }

    return(
        <div className='container'>
            {
              message ? <p className='message'>{message}</p>
              :   <>
                    <p className='message'>Please Enter Amount</p>
                    <input type='Number' value={amount} onChange={(e)=>{ setAmount(e.target.value) }} />
                    <button onClick={handleSubmit} className='withdraw-btn'>Withdraw</button>
                  </>
            }
            <button onClick={()=>{ navigate('/') }} className="main-menu">Main menu</button>
        </div>
    );
}
export default Withdraw;