import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function FundsTransfer(){

    const [account_no, setAccount_no] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const server_url = process.env.REACT_APP_server_url;

    const handleInputChange = (e)=>{
        const input = e.target.value;
        if(input.length === 11) return;
        setAccount_no(input);
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(account_no.length < 10) return;

        //customer details
        const sender_account_no = localStorage.getItem('account_no');
        const current_bal = localStorage.getItem('amount');

        const Amount = parseInt(amount, 10);
        if(current_bal < Amount){
            setMessage('Current Balance is lesser than Transaction amount!')
            return;
        }

        const data = { sender_account_no: sender_account_no, receiver_account_no: account_no,  amount: Amount };
        const new_balance = current_bal - Amount; 

        try{
            await axios.post(`${server_url}/fundsTransfer`, data);
            localStorage.setItem('amount', new_balance);
            setMessage('Cash Transfer Successfully!');
        }catch(err){
            if(err.code === "ERR_NETWORK") setMessage('Internal Server Error');
            else setMessage(err.response.data);
        }
    }

    return(
        <div className='container2'>
        {   message ? <p className='msg'>{message}</p> :
            <>
            <p className='msg1'>Please Enter 10 digit Account number</p>
            <form onSubmit={handleSubmit}>
               <div className='input-wrp'>
                   <label>Account No: </label>
                   <input type='number' value={account_no} onChange={(e)=>{ handleInputChange(e) }} required/>
               </div>


               <div className='input-wrp'>
                   <label>Amount: </label>
                   <input type='number' value={amount} onChange={(e)=>{ setAmount(e.target.value) }} required/>
               </div>

               <button className='moneytransfer-btn'>Transfer Money</button>
            </form>
            </>
        }
         <button onClick={()=>{ navigate('/') }} className='menu'>Main menu</button>
        </div>
    );
}
export default FundsTransfer;