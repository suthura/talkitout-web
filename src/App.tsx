import React, { Suspense } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Security from "./components/common/security";

const LoginPage = React.lazy(() => import("./pages/login/login"));
const RegisterPage = React.lazy(() => import("./pages/register/register"));
const DashboardPage = React.lazy(() => import("./pages/dashboard/dashboard"));
const ProfilePage = React.lazy(() => import("./pages/profile/ProfilePage"));
const SetupPage = React.lazy(() => import("./pages/setup/setup"));
const CounsellorsPage = React.lazy(
  () => import("./pages/consellors/counsellors")
);
const AppointmentsPage = React.lazy(
  () => import("./pages/appointments/appointments")
);
const WelcomePage = React.lazy(() => import("./pages/welcome/welcome"));
const PatientsPage = React.lazy(() => import("./pages/patients/patients"));

function App(): JSX.Element {
  return (
    <Suspense>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Security isNonSecure={true}>
                <WelcomePage />
              </Security>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <Security isNonSecure={true}>
                <LoginPage />
              </Security>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <Security isNonSecure={true}>
                <RegisterPage />
              </Security>
            }
          ></Route>
          <Route
            path="/dashboard"
            element={
              <Security>
                <DashboardPage />
              </Security>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Security>
                <ProfilePage />
              </Security>
            }
          ></Route>
          <Route
            path="/setup"
            element={
              <Security isNonSecure={true}>
                <SetupPage />
              </Security>
            }
          ></Route>
          <Route
            path="/counsellors"
            element={
              <Security>
                <CounsellorsPage />
              </Security>
            }
          ></Route>
          <Route
            path="/appointments"
            element={
              <Security>
                <AppointmentsPage />
              </Security>
            }
          ></Route>
          <Route
            path="/patients"
            element={
              <Security>
                <PatientsPage />
              </Security>
            }
          ></Route>
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </HashRouter>
      <ToastContainer />
    </Suspense>
  );
}

export default App;
