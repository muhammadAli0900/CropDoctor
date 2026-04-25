import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import DiagnosePage from "./pages/DiagnosePage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/diagnose" element={<DiagnosePage />} />
      </Routes>
    </Layout>
  );
}
