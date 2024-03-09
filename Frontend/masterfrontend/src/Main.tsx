import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./Screens/LoginPage";
import { RegistrationPage } from "./Screens/RegistrationPage";
import { StudentChooseMasterPage } from "./Screens/StudentChooseMasterPage";

const Main = () => {
  return (
    <Routes>
      <Route path="/choose_master" element={<StudentChooseMasterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
    </Routes>
  );
};
export default Main;
