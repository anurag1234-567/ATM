import { useNavigate } from "react-router-dom";

function Main(){

  const navigate = useNavigate();

  const handleExit = ()=>{
    localStorage.removeItem('account_no');
    localStorage.removeItem('amount');
    localStorage.removeItem('pin');
    navigate('/authenticate');
  }

    return(
          <div className="main-wrp">
             <h3>Welcome to ATM Software</h3>
             <div className="option-wrp">
                <p onClick={()=>{ navigate('/deposit') }} className="options">Cash Deposit</p>
                <p onClick={()=>{ navigate('/withdraw') }} className="options">Cash Withdrawl</p>
             </div>

             <div className="option-wrp">
                <p onClick={()=>{ navigate('/fundsTransfer') }} className="options">Cash Transfer</p>
                <p onClick={()=>{ navigate('/bankDetails') }} className="options">Bank Details</p>

             </div>

             <div className="option-wrp">
                <p onClick={()=>{ navigate('/pinChange') }} className="options">Pin Change</p>
                <p onClick={handleExit} className="options">Exit</p>
             </div>
          </div>
    );
}
export default Main;