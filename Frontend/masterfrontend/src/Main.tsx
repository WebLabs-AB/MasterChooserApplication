import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./Screens/LoginPage";
import { RegistrationPage } from "./Screens/RegistrationPage";
import { StudentChooseMasterPage } from "./Screens/StudentChooseMasterPage";
import TeacherPage from "./Screens/TeacherPage";

const Main = () => {
  return (
    <Routes>
      <Route path="/choose_master" element={<StudentChooseMasterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/teacher" element={<TeacherPage />} />
    </Routes>
  );
};
export default Main;
