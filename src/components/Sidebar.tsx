import Link from "next/link";

export function Sidebar() {
  return (
    <aside id="logo-sidebar" className="sticky top-0 w-72" aria-label="Sidebar">
      <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 shadow-md dark:bg-gray-800">
        <div className="flex flex-col gap-1">
          <Link href="/" className=" flex items-center ">
            <img src="/centralab.png" className=" w-full " />
          </Link>
          <div className="flex justify-center text-sm font-semibold text-cyan-800">
            Clínica Drº Hugo Azancot de Menezes
          </div>
        </div>

        <hr className="p-1" />
        <ul className="mt-10 space-y-2 font-medium">
          <li className="max-h-10 overflow-hidden transition-all duration-300  hover:max-h-32">
            <button
              className="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              type="button"
            >
              <img src="/building.png" className="h-6 w-6" />
              <span className="ml-3  text-sm text-emerald-600">Empresas</span>
            </button>
            <button
              className="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              type="button"
            >
              <span className="ml-12  text-sm text-emerald-600">
                Criar empresa
              </span>
            </button>
            <button
              className="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              type="button"
            >
              <span className="ml-12  text-sm text-emerald-600">Ver lista</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="flex w-full items-center rounded-lg p-2 text-base text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <img src="/user.png" className="h-6 w-6" />
              <span className="ml-3  text-sm text-emerald-600">Utentes</span>
            </button>
          </li>
          <li className="max-h-10 overflow-hidden transition-all duration-300 hover:max-h-32">
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <img src="/appointment.png" className="h-6 w-6" />
              <span className="ml-3  text-sm text-emerald-600">Consultas</span>
            </a>
            <Link
              className="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              href="/appointments/create"
            >
              <span className="ml-12 text-sm  text-emerald-600">
                Carregar planilha
              </span>
            </Link>
            <Link
              className="flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              href="/appointments/list"
            >
              <span className="ml-12  text-sm text-emerald-600">Ver lista</span>
            </Link>
          </li>
          <li className="max-h-10 overflow-hidden transition-all duration-300 hover:max-h-48">
            <a
              href="#"
              className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <img src="/emergency.png" className="h-6 w-6" />
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
              href="/emergencys/history"
            >
              <span className="ml-12 text-sm text-emerald-600">Histórico</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
