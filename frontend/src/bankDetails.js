// {/* <p className='message'>Account Details</p> */}
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function BankDetails(){
    const [bankDetails, setBankDetails] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const fetchdetails = async()=>{
        try{
            const account_no = localStorage.getItem('account_no');
            const pin = localStorage.getItem('pin');
      
            const res = await axios.post('http://localhost:4000/customer', { account_no, pin });
            setError(''); setBankDetails(res.data); 
        }catch(err){
            setError('Server Error');
        }
    }

    useEffect(()=>{
        fetchdetails();
    }, []);
    
    return(
        <div className='container'>
         {
            error && <p>{error}</p>
         }
         {
            bankDetails &&
            <div className='content-wrp'>
                <div className='detail-wrp'>
                    <label>Account holder name :-</label>
                    <p>{bankDetails.name}</p>
                </div>

                <div className='detail-wrp'>
                    <label>Account number :-</label>
                    <p>{bankDetails.account_no}</p>
                </div>
                
                <div className='detail-wrp'>
                    <label>Account type :-</label>
                    <p>{bankDetails.account_type}</p>
                </div>

                <div className='detail-wrp'>
                    <label>Current Balance :-</label>
                    <p>{bankDetails.amount}</p>
                </div>

                <div className='detail-wrp'>
                    <label>Registered mobile number :-</label>
                    <p>{bankDetails.mobile_no}</p>
                </div>

                <div className='detail-wrp'>
                    <label>Account Opening date :-</label>
                    <p>{bankDetails.opening_date}</p>
                </div>
            </div>
         }
         <button onClick={()=>{ navigate('/') }} className="menu-Btn">Main menu</button>
        </div>
    );
}
export default BankDetails;