import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./Screens/LoginPage";
import { RegistrationPage } from "./Screens/RegistrationPage";
import { StudentChooseMasterPage } from "./Screens/StudentChooseMasterPage";
import { TeacherLandingPage } from "./Screens/TeacherLandingPage";
import { TeacherCreateUpdateProfilePage } from "./Screens/TeacherMasterProfilePage";

const Main = () => {
  return (
    <Routes>
      <Route path="/choose_master" element={<StudentChooseMasterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/teacher" element={<TeacherLandingPage />} />
      <Route path="/teachermasterprofile" element={<TeacherCreateUpdateProfilePage />} />
    </Routes>
  );
};
export default Main;
