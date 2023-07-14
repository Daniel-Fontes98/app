import { useRouter } from "next/router";
import { api } from "~/utils/api";

const WaitingList = () => {
  const data = api.emergencyConsults.getAllWithTriage.useQuery().data;

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-center ">
          <div className="rounded-b-2xl bg-emerald-600 px-6 py-2 text-white">
            Triagem - Lista de Espera
          </div>
        </div>
        <div className="mt-5 flex gap-4 pl-14">
          <div className="w-2/6 font-semibold text-emerald-600">NOME</div>
          <div className=" border-l-2 border-emerald-600 opacity-20"></div>
          <div className="w-1/6 font-semibold text-emerald-600">
            DATA DE ADMISSÃO
          </div>
          <div className="border-l-2 border-emerald-600 opacity-20"></div>
          <div className="w-1/6 font-semibold text-emerald-600">TRIAGEM</div>
          <div className="border-l-2 border-emerald-600 opacity-20"></div>
          <div className="w-1/6 font-semibold text-emerald-600">
            TEMPO DE ESPERA
          </div>
        </div>
        <div className="flex flex-col gap-4 px-10">
          {data ? (
            data.map((consulta) => (
              <UserInfo
                key={consulta.id}
                name={consulta.user.name}
                date={consulta.entryDate}
                time={consulta.entryTime}
                degree={consulta.emergencyTriage?.manchesterDegree as string}
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
  date: string;
  time: string;
  degree: string;
  emergencyConsultId: string;
}

const UserInfo = (props: UserInfoProps) => {
  const router = useRouter();

  function calculateMinutesPassed(dateString: string, timeString: string) {
    const [day, month, year] = dateString.split("/");
    const [hours, minutes] = timeString.split(":");
    const targetDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hours),
      Number(minutes)
    );
    const timeDifferenceMs = Date.now() - targetDate.getTime();
    const minutesPassed = Math.floor(timeDifferenceMs / (1000 * 60));
    return minutesPassed;
  }

  const colorVariants = {
    red: "bg-red-600",
    orange: "bg-orange-600",
    green: "bg-green-600",
    yellow: "bg-yellow-400",
  };

  return (
    <div
      className="flex h-10 w-full items-center rounded-lg bg-white shadow-md hover:cursor-pointer"
      onClick={() =>
        router.push("/emergencys/consult/" + props.emergencyConsultId)
      }
    >
      <div className="ml-4 w-2/6">
        <span>{props.name}</span>
      </div>
      <div className="ml-11 w-1/6">
        <span>
          {props.date} {props.time}
        </span>
      </div>
      {(props.degree === "red" ||
        props.degree === "orange" ||
        props.degree === "green" ||
        props.degree === "yellow") && (
        <div
          className={`ml-10 w-14 rounded-md py-2 ${
            colorVariants[props.degree]
          }`}
        ></div>
      )}
      <div className="ml-40">
        {calculateMinutesPassed(props.date, props.time) < 10 ? (
          <div>&lt;10min</div>
        ) : calculateMinutesPassed(props.date, props.time) < 60 ? (
          <div>&lt;60min</div>
        ) : calculateMinutesPassed(props.date, props.time) < 120 ? (
          <div>&lt;120min</div>
        ) : calculateMinutesPassed(props.date, props.time) < 240 ? (
          <div>&lt;240min</div>
        ) : (
          <div>&gt;240min</div>
        )}
      </div>
    </div>
  );
};

export default WaitingList;
