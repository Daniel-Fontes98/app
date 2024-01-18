import { useState } from "react";
import { Toaster } from "react-hot-toast";
import PhaseFive from "~/components/CertificatesForm/PhaseFive";
import PhaseFour from "~/components/CertificatesForm/PhaseFour";
import PhaseOne from "~/components/CertificatesForm/PhaseOne";
import PhaseSix from "~/components/CertificatesForm/PhaseSix";
import PhaseThree from "~/components/CertificatesForm/PhaseThree";
import PhaseTwo from "~/components/CertificatesForm/PhaseTwo";

const CertificateForm = () => {
  const [phaseNumber, setPhaseNumber] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState("pt");

  return (
    <div>
      <div className="flex min-h-screen flex-col items-center  bg-slate-100 px-12 ">
        <Toaster />
        <div className="mb-12 flex items-center justify-center">
          <div className="w-56 rounded-b-2xl bg-emerald-600 py-2 text-center text-white">
            Formulário de Certificado
          </div>
        </div>
        <div className=" max-w-3xl rounded-2xl bg-white py-8  shadow-2xl">
          {phaseNumber === 0 && (
            <PhaseOne
              phaseNumber={phaseNumber}
              setPhaseNumber={setPhaseNumber}
              currentLanguage={currentLanguage}
              setCurrentLanguage={setCurrentLanguage}
            />
          )}
          {phaseNumber === 1 && (
            <PhaseTwo
              phaseNumber={phaseNumber}
              setPhaseNumber={setPhaseNumber}
              currentLanguage={currentLanguage}
              setCurrentLanguage={setCurrentLanguage}
            />
          )}
          {phaseNumber === 2 && (
            <PhaseThree
              phaseNumber={phaseNumber}
              setPhaseNumber={setPhaseNumber}
              currentLanguage={currentLanguage}
              setCurrentLanguage={setCurrentLanguage}
            />
          )}
          {phaseNumber === 3 && (
            <PhaseFour
              phaseNumber={phaseNumber}
              setPhaseNumber={setPhaseNumber}
              currentLanguage={currentLanguage}
              setCurrentLanguage={setCurrentLanguage}
            />
          )}
          {phaseNumber === 4 && (
            <PhaseFive
              phaseNumber={phaseNumber}
              setPhaseNumber={setPhaseNumber}
              currentLanguage={currentLanguage}
              setCurrentLanguage={setCurrentLanguage}
            />
          )}
          {phaseNumber === 5 && (
            <PhaseSix
              phaseNumber={phaseNumber}
              setPhaseNumber={setPhaseNumber}
              currentLanguage={currentLanguage}
              setCurrentLanguage={setCurrentLanguage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateForm;
