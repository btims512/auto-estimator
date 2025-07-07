import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FormProvider } from "./FormContext";

import Header from "./components/Header";
import Step1 from "./pages/Step1_DamageType";
import Step2 from "./pages/Step2_CarInfo";
import Step3 from "./pages/Step3_PhotoUpload";
import Step4_CustomerInfo from "./pages/Step4_CustomerInfo";
import Step5_Payment from "./pages/Step4_Payment";
import ThankYou from "./pages/ThankYou";

export default function App() {
  return (
    <FormProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Step1 />} />
          <Route path="/car-info" element={<Step2 />} />
          <Route path="/upload" element={<Step3 />} />
          <Route path="/customer-info" element={<Step4_CustomerInfo />} />
          <Route path="/payment" element={<Step5_Payment />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  );
}
