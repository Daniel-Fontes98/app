import { useRouter } from "next/router";

interface nurseryActionsProps {
  isHistoryFilled?: boolean;
  isTriageFilled?: boolean;
}

const NurseryActions = (props: nurseryActionsProps) => {
  const router = useRouter();
  const id = router.query.id as string;
  return (
    <>
      <div className="grid h-72 grid-cols-2 items-center justify-center gap-x-8 gap-y-2">
        <button
          onClick={() => router.push(`/nursery/certificateForm/${id}`)}
          className=" float-right mt-4 rounded-xl  bg-gradient-to-t from-teal-700 to-emerald-500 px-2 py-8 text-white disabled:from-slate-600 disabled:to-slate-400"
          disabled={props.isHistoryFilled}
        >
          Preencher Histórico
        </button>
        <button
          className="float-right mt-4 rounded-xl  bg-gradient-to-t from-teal-700 to-emerald-500 px-2 py-8 text-white disabled:from-slate-600 disabled:to-slate-400"
          onClick={() => router.push(`/nursery/addTriage/${id}`)}
          disabled={props.isTriageFilled}
        >
          Triagem
        </button>
        <button
          className=" float-right mt-4 rounded-xl  bg-gradient-to-t from-teal-700 to-emerald-500 px-2 py-8 text-white disabled:from-slate-600 disabled:to-slate-400"
          onClick={() => router.push(`/nursery/addExam/${id}`)}
        >
          Anexar Exame
        </button>
        <button
          disabled
          className=" float-right mt-4 rounded-xl  bg-gradient-to-t from-teal-700 to-emerald-500 px-2 py-8 text-white  disabled:from-slate-600 disabled:to-slate-400 "
        >
          Exames Complementares
        </button>
      </div>
    </>
  );
};

export default NurseryActions;
