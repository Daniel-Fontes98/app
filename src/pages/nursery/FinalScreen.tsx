import Image from "next/image";
import CIcon from "../../../public/C.svg";
import ADV from "../../../public/iconsSeguros/ADV.svg";
import Medicare from "../../../public/iconsSeguros/Medicare.svg";
import Unisaude from "../../../public/iconsSeguros/Unisaude.svg";
import Ensa from "../../../public/iconsSeguros/ENSA.svg";
import Sol from "../../../public/iconsSeguros/Sol.svg";
import Trevo from "../../../public/iconsSeguros/Trevo.svg";
import Tranquilidade from "../../../public/iconsSeguros/Tranquilidade.svg";
import BIC from "../../../public/iconsSeguros/BIC.svg";
import Protteja from "../../../public/iconsSeguros/protteja.svg";
import Nossa from "../../../public/iconsSeguros/Nossa.svg";
import Global from "../../../public/iconsSeguros/Global.svg";

const FinalScreen = () => {
  return (
    <div className="flex h-full min-h-screen flex-col  bg-slate-100 p-4">
      <div className="mt-24 flex flex-col items-center justify-center">
        <Image src={CIcon} alt="C icon" className="h-56 w-56" />
        <h1 className="mt-8 text-3xl font-bold">Obrigado!</h1>
        <h2 className="mt-1 font-semibold">
          Por favor devolver este dispositivo na recepção
        </h2>
      </div>
      <div className="mt-28 grid grid-cols-3 place-items-center">
        <Image src={ADV} alt="ADV icon" className="h-8 w-24" />
        <Image src={Medicare} alt="Medicare icon" className="h-8 w-24" />
        <Image src={Unisaude} alt="Unisaude icon" className="h-8 w-24" />
      </div>
      <div className="-ml-6 mt-4 grid grid-cols-4 place-items-center gap-y-4">
        <Image src={Ensa} alt="Ensa icon" className="h-8 w-24" />
        <Image src={Sol} alt="Sol icon" className="h-8 w-24" />
        <Image src={Trevo} alt="Trevo icon" className="h-11 w-40" />
        <Image
          src={Tranquilidade}
          alt="Tranquilidade icon"
          className="w-30 h-16"
        />
        <Image src={BIC} alt="BIC icon" className="h-8 w-24" />
        <Image src={Protteja} alt="Protteja icon" className="h-11 w-40" />
        <Image src={Nossa} alt="Nossa icon" className="h-8 w-24" />
        <Image src={Global} alt="Global icon" className="h-8 w-24" />
      </div>
    </div>
  );
};

export default FinalScreen;
