import Image from "next/image";
import Link from "next/link";
import CentralabLogo from "../../public/centralab.png";
import RequestIcon from "../../public/request.png";
import DoctorIcon from "../../public/doctor.png";
import AppointmentIcon from "../../public/appointment.png";
import StatsIcon from "../../public/trend.png";
import XrayIcon from "../../public/x-ray.png";
import LabIcon from "../../public/lab.png";
import NursingIcon from "../../public/nurse.png";

export function Sidebar() {
  return (
    <aside
      id="logo-sidebar"
      className="sticky top-0 hidden h-screen w-72 lg:flex lg:flex-col"
      aria-label="Sidebar"
    >
      <div className=" h-full overflow-y-auto bg-gray-50 px-3 py-4 shadow-md dark:bg-gray-800 ">
        <div className="flex flex-col gap-1">
          <Link href="/" className=" flex items-center">
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
          <li className="max-h-10 overflow-hidden transition-all duration-300 hover:max-h-64">
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <Image src={NursingIcon} className="h-6 w-6" alt="Request icon" />
              <span className="ml-3  text-sm text-emerald-600">Enfermagem</span>
            </a>
            <Link
              className="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              href="/nursery/completed/"
            >
              <span className="ml-12 text-sm  text-emerald-600">
                Exames Feitos
              </span>
            </Link>
            <Link
              className="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              href="/nursery/awaiting"
            >
              <span className="ml-12 text-sm  text-emerald-600">
                Pessoas Em Espera
              </span>
            </Link>
          </li>
          <li className="max-h-10 overflow-hidden transition-all duration-300 hover:max-h-64">
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <Image src={LabIcon} className="h-6 w-6" alt="Request icon" />
              <span className="ml-3  text-sm text-emerald-600">
                Laboratório
              </span>
            </a>
            <Link
              className="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              href="/lab/completed/"
            >
              <span className="ml-12 text-sm  text-emerald-600">
                Análises Feitas{" "}
              </span>
            </Link>
            <Link
              className="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              href="/lab/awaiting"
            >
              <span className="ml-12 text-sm  text-emerald-600">
                Pessoas Em Espera
              </span>
            </Link>
          </li>
          <li className="max-h-10 overflow-hidden transition-all duration-300 hover:max-h-64">
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <Image src={DoctorIcon} className="h-6 w-6" alt="X Ray Icon" />
              <span className="ml-3  text-sm text-emerald-600">Médicos</span>
            </a>
            <Link
              className="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              href="/doctors/awaiting"
            >
              <span className="ml-12 text-sm  text-emerald-600">
                A Aguardar
              </span>
            </Link>
            <Link
              className="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              href="/doctors/history"
            >
              <span className="ml-12 text-sm  text-emerald-600">Histórico</span>
            </Link>
          </li>
          <li className="max-h-10 overflow-hidden transition-all duration-300 hover:max-h-64">
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <Image src={XrayIcon} className="h-6 w-6" alt="X Ray Icon" />
              <span className="ml-3  text-sm text-emerald-600">Raio-X</span>
            </a>
            <Link
              className="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              href="/xray/completed"
            >
              <span className="ml-12 text-sm  text-emerald-600">Feitos</span>
            </Link>
            <Link
              className="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              href="/xray/pending"
            >
              <span className="ml-12 text-sm  text-emerald-600">Pendentes</span>
            </Link>
          </li>
          <li className="max-h-10 overflow-hidden transition-all duration-300 hover:max-h-64">
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <Image src={RequestIcon} className="h-6 w-6" alt="X Ray Icon" />
              <span className="ml-3  text-sm text-emerald-600">Requisição</span>
            </a>
            <Link
              className="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              href="/requisition/lab"
            >
              <span className="ml-12 text-sm  text-emerald-600">
                Laboratório
              </span>
            </Link>
            <Link
              className="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              href="/requisition/xray"
            >
              <span className="ml-12 text-sm  text-emerald-600">Raio-X</span>
            </Link>
          </li>
          <li className="max-h-10 overflow-hidden transition-all duration-300 hover:max-h-64">
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <Image src={StatsIcon} className="h-6 w-6" alt="X Ray Icon" />
              <span className="ml-3  text-sm text-emerald-600">
                Estatisticas
              </span>
            </a>
            <Link
              className="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              href="/stats/presentAt"
            >
              <span className="ml-12 text-sm  text-emerald-600">Tabela</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
