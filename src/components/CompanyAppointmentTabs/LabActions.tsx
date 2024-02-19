import { useRouter } from "next/router";

const LabActions = () => {
  const router = useRouter();
  const id = router.query.id as string;
  return (
    <>
      <div className="grid h-72 grid-cols-2 items-center justify-center gap-x-8 gap-y-2">
        <button
          onClick={() => router.push(`/lab/addHematologia/${id}`)}
          className=" float-right mt-4 rounded-xl  bg-gradient-to-t from-teal-700 to-emerald-500 px-2 py-8 text-white disabled:from-slate-600 disabled:to-slate-400"
        >
          Hematologia
        </button>
        <button
          className="float-right mt-4 rounded-xl  bg-gradient-to-t from-teal-700 to-emerald-500 px-2 py-8 text-white disabled:from-slate-600 disabled:to-slate-400"
          onClick={() => router.push(`/lab/addBioquimica/${id}`)}
        >
          Bioquimica
        </button>
        <button
          className=" float-right mt-4 rounded-xl  bg-gradient-to-t from-teal-700 to-emerald-500 px-2 py-8 text-white disabled:from-slate-600 disabled:to-slate-400"
          onClick={() => router.push(`/lab/addTestesSerologicos/${id}`)}
        >
          Testes Serologicos
        </button>
        <button
          className=" float-right mt-4 rounded-xl  bg-gradient-to-t from-teal-700 to-emerald-500 px-2 py-8 text-white  disabled:from-slate-600 disabled:to-slate-400 "
          onClick={() => router.push(`/lab/addUrinaFisico/${id}`)}
        >
          Urina Fisico
        </button>
        <button
          className=" float-right mt-4 rounded-xl  bg-gradient-to-t from-teal-700 to-emerald-500 px-2 py-8 text-white  disabled:from-slate-600 disabled:to-slate-400 "
          onClick={() => router.push(`/lab/addUrinaBioquimica/${id}`)}
        >
          Urina Bioquimica
        </button>
        <button
          className=" float-right mt-4 rounded-xl  bg-gradient-to-t from-teal-700 to-emerald-500 px-2 py-8 text-white  disabled:from-slate-600 disabled:to-slate-400 "
          onClick={() => router.push(`/lab/addUrinaExameMicroscopio/${id}`)}
        >
          Urina Exame Microscopio
        </button>
      </div>
    </>
  );
};

export default LabActions;
