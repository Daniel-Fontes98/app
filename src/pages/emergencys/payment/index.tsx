import { useRouter } from "next/router";
import { api } from "~/utils/api";

const PaymentList = () => {
  const data = api.emergencyConsults.getAllNotPayed.useQuery().data;

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex flex-col gap-6 pb-6">
        <div className="flex items-center justify-center ">
          <div className="rounded-b-2xl bg-emerald-600 px-6 py-2 text-white">
            Lista de utentes por pagar
          </div>
        </div>
        <div className="mt-5 flex gap-4 pl-14">
          <div className="w-1/3 font-semibold text-emerald-600">NOME</div>
          <div className=" border-l-2 border-emerald-600 opacity-20"></div>
          <div className="w-1/3 font-semibold text-emerald-600">BI</div>
          <div className="border-l-2 border-emerald-600 opacity-20"></div>
          <div className="w-1/3 font-semibold text-emerald-600">NUMERO</div>
          <div className="border-l-2 border-emerald-600 opacity-20"></div>
        </div>
        <div className="flex flex-col gap-4 px-10">
          {data ? (
            data.map((consulta) => (
              <UserInfo
                key={consulta.id}
                name={consulta.user.name}
                number={consulta.user.number}
                bi={consulta.user.idNumber}
                emergencyConsultId={consulta.id}
              />
            ))
          ) : (
            <div className="animate-pulse">A carregar dados</div>
          )}
        </div>
      </div>
    </div>
  );
};

interface UserInfoProps {
  name: string;
  bi: string | null;
  number: string | null;
  emergencyConsultId: string;
}

const UserInfo = (props: UserInfoProps) => {
  const router = useRouter();

  return (
    <div
      className="flex h-10 w-full items-center gap-4 rounded-lg bg-white shadow-md hover:cursor-pointer"
      onClick={() =>
        router.push("/emergencys/analytics/" + props.emergencyConsultId)
      }
    >
      <div className="ml-3 w-1/3">
        <span>{props.name}</span>
      </div>
      <div className="w-1/3">
        <span>{props.bi}</span>
      </div>
      <div className=" w-14 whitespace-nowrap">{props.number}</div>
    </div>
  );
};

export default PaymentList;
