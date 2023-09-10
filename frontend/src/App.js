import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Authenticate from './authenticate';
import Main from './main';
import Deposit from './deposit';
import Withdraw from './withdraw';
import FundsTransfer from './fundsTransfer';
import BankDetails from './bankDetails';
import PinChange from './pinChange';
import PrivateRoute from './privateRoute';
import './App.css';

function App(){
    return(
        <>
          <BrowserRouter>
           <Routes>
             <Route path='/authenticate' element={<Authenticate />} />

             <Route path='/' element={<PrivateRoute />} >
                <Route path='/' element={<Main />} />
                <Route path='/deposit' element={<Deposit />} />
                <Route path='/withdraw' element={<Withdraw />} />
                <Route path='/fundsTransfer' element={<FundsTransfer />} />
                <Route path='/bankDetails' element={<BankDetails />} />
                <Route path='/pinChange' element={<PinChange />} />
             </Route>

           </Routes>
          </BrowserRouter>
        </>
    );
}
export default App;