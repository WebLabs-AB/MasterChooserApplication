import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./Screens/LoginPage";
import { RegistrationPage } from "./Screens/RegistrationPage";
import { CreateMasterPage } from "./Screens/CreateMasterPage";

const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<CreateMasterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
    </Routes>
  );
};
export default Main;
