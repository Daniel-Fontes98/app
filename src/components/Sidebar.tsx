import Image from "next/image";
import Link from "next/link";
import CentralabLogo from "../../public/centralab.png";
import RequestIcon from "../../public/request.png";
import AppointmentIcon from "../../public/appointment.png";
import EmergencyIcon from "../../public/emergency.png";

export function Sidebar() {
  return (
    <aside
      id="logo-sidebar"
      className="sticky top-0 h-screen w-72"
      aria-label="Sidebar"
    >
      <div className=" h-full overflow-y-auto bg-gray-50 px-3 py-4 shadow-md dark:bg-gray-800">
        <div className="flex flex-col gap-1">
          <Link href="/" className=" flex items-center ">
            <Image src={CentralabLogo} alt="Centralab Logo" />
          </Link>
          <div className="flex justify-center text-sm font-semibold text-cyan-800">
            Clínica Drº Hugo Azancot de Menezes
          </div>
        </div>

        <hr className="p-1" />
        <ul className="mt-10 space-y-2 font-medium">
          <li className="max-h-10 overflow-hidden transition-all duration-300 hover:max-h-32">
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <Image src={RequestIcon} className="h-6 w-6" alt="Request icon" />
              <span className="ml-3  text-sm text-emerald-600">Requisição</span>
            </a>
            <Link
              className="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              href="#"
            >
              <span className="ml-12 text-sm  text-emerald-600">Raio-X</span>
            </Link>
            <Link
              className="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              href="#"
            >
              <span className="ml-12  text-sm text-emerald-600">
                Laboratório
              </span>
            </Link>
          </li>
          <li className="max-h-10 overflow-hidden transition-all duration-300 hover:max-h-32">
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <Image
                src={AppointmentIcon}
                className="h-6 w-6"
                alt="appointment icon"
              />
              <span className="ml-3  text-sm text-emerald-600">
                Agendamentos
              </span>
            </a>
            <Link
              className="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              href="/appointments/create"
            >
              <span className="ml-12 text-sm  text-emerald-600">Criar</span>
            </Link>
            <Link
              className="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              href="/appointments/"
            >
              <span className="ml-12  text-sm text-emerald-600">Ver lista</span>
            </Link>
          </li>
          <li className="max-h-10 overflow-hidden transition-all duration-300 hover:max-h-80">
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <Image
                src={EmergencyIcon}
                className="h-6 w-6"
                alt="emergency icon"
              />
              <span className="ml-3  text-sm text-emerald-600">Urgências</span>
            </a>
            <Link
              className="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              href="/emergencys/create"
            >
              <span className="ml-12  text-sm text-emerald-600">
                Criar urgência
              </span>
            </Link>
            <Link
              className="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              href="/emergencys/triage/awaiting"
            >
              <span className="ml-12  text-sm text-emerald-600">
                À espera de triagem
              </span>
            </Link>
            <Link
              className="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              href="/emergencys/triage"
            >
              <span className="ml-12  text-sm text-emerald-600">
                Lista de espera
              </span>
            </Link>
            <Link
              className="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              href="/emergencys/payment"
            >
              <span className="ml-12  text-sm text-emerald-600">Por Pagar</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
