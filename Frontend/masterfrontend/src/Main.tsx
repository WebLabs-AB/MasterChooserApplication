import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './Screens/LoginPage';
import { RegistrationPage } from './Screens/RegistrationPage';
import { StartPageTeacher } from './Screens/StartPageTeacher';

const Main = () => {
    return (         
        <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/register' element={<RegistrationPage/>} />
        <Route path='/teacher-page' element={<StartPageTeacher/>}/>
    </Routes>
    );
}
export default Main;