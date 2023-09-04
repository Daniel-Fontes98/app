import { ViewXRayRequisition } from "~/components/Requisitions/ViewXRayRequisition";
import { api } from "~/utils/api";

const View_list = () => {
  const ViewXRayRequisitionsQuery = api.xRayRequisition.getAll.useQuery();

  if (ViewXRayRequisitionsQuery.data) {
    return (
      <div className="min-h-screen bg-slate-100">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center ">
            <div className="rounded-b-2xl bg-emerald-600 px-6 py-2 text-white">
              Lista de requisições Raio X
            </div>
          </div>
          <div>
            <div className="mt-2 flex gap-4 pl-14">
              <div className="w-1/12 font-semibold text-emerald-600">DATA</div>
              <div className=" border-l-2 border-emerald-600 opacity-20"></div>
              <div className="w-2/6 font-semibold text-emerald-600">NOME</div>
              <div className="border-l-2 border-emerald-600 opacity-20"></div>
              <div className="w-1/6 font-semibold text-emerald-600">EXAME</div>
              <div className="border-l-2 border-emerald-600 opacity-20"></div>
              <div className="w-1/6 font-semibold text-emerald-600">
                EMPRESA
              </div>
              <div className="border-l-2 border-emerald-600 opacity-20"></div>
              <div className="w-1/12 font-semibold text-emerald-600">
                IMPRIMIR
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-4 px-10">
              {ViewXRayRequisitionsQuery.data.map((requisition) => (
                <ViewXRayRequisition
                  company={requisition.company}
                  date={requisition.createdAt}
                  name={requisition.user.name}
                  exam={requisition.examDescription}
                  id={requisition.id}
                  isPrinted={requisition.isPrinted}
                  key={requisition.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="animate-pulse">A carregar pagina...</div>;
  }
};

export default View_list;
