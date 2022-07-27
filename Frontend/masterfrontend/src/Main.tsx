import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './Screens/LoginPage';
import { RegistrationPage } from './Screens/RegistrationPage';

const Main = () => {
    return (         
        <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/register' element={<RegistrationPage/>} />
    </Routes>
    );
}
export default Main;