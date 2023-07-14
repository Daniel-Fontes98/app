import { useRouter } from "next/router";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import useEmergency from "~/components/Forms/useEmergency";
import { api } from "~/utils/api";
import { convertDateString } from "~/utils/dates";
import { insuranceList } from "~/utils/insurancesList";

const CreateUrgencyForm = () => {
  const mutation = api.emergencyConsults.createConsult.useMutation();
  const router = useRouter();
  const { register, handleSubmit, errors, formSchema, watch } = useEmergency();
  const insurance = watch("insuranceName");

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    mutation.mutate({
      ...data,
      birthDate: convertDateString(data.birthDate),
      entryDate: convertDateString(data.entryDate),
    });
    router.push("/emergencys/triage/awaiting");
  };

  return (
    <>
      <div className="bg-slate-100">
        <div className="ml-40 mr-40 min-h-screen items-center justify-center ">
          <div className="flex w-full  flex-col ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center justify-center ">
                <div className="flex w-full justify-center rounded-b-2xl bg-emerald-600  py-6 text-2xl text-white">
                  Formulário de Admissão Urgências
                </div>
              </div>
              <div className="ml-12 mr-12 mt-14 grid grid-cols-2 gap-12">
                <div className="w-full">
                  <label
                    className="mb-2 block text-lg text-emerald-600"
                    htmlFor="entryDate"
                  >
                    Data *
                  </label>
                  <input
                    id="entryDate"
                    className="w-full rounded-md p-2 shadow-md"
                    type="date"
                    {...register("entryDate")}
                    required
                  />
                  {errors.entryDate && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {" "}
                      {errors.entryDate?.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <label
                    className="mb-2 block text-lg text-emerald-600"
                    htmlFor="entryTime"
                  >
                    Hora *
                  </label>
                  <input
                    className="w-full rounded-md p-2 shadow-md"
                    id="entryTime"
                    type="time"
                    {...register("entryTime")}
                    required
                  />
                  {errors.entryTime && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {" "}
                      {errors.entryTime?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mx-8 mt-16">
                <div className="w-full rounded-b-2xl bg-emerald-600 p-4 text-center">
                  <h1 className="text-2xl text-white">Informação Geral</h1>
                </div>
                <div className="mx-8">
                  <div className="mt-8">
                    <label
                      className="mb-2 block text-lg text-emerald-600"
                      htmlFor="name"
                    >
                      Nome *
                    </label>
                    <input
                      id="name"
                      className=" w-full rounded-md p-2 shadow-md"
                      type="text"
                      {...register("name")}
                      required
                    />
                    {errors.name && (
                      <p className="mt-2 text-xs italic text-red-500">
                        {" "}
                        {errors.name?.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-8 flex flex-row gap-12 ">
                    <div className="w-full">
                      <label
                        className="mb-2 block text-lg text-emerald-600"
                        htmlFor="idNumber"
                      >
                        Número Identificação *
                      </label>
                      <input
                        className="w-full rounded-md p-2 shadow-md"
                        id="idNumber"
                        type="text"
                        {...register("idNumber")}
                        required
                      />
                      {errors.idNumber && (
                        <p className="mt-2 text-xs italic text-red-500">
                          {" "}
                          {errors.idNumber?.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full">
                      <label
                        className="mb-2 block text-lg text-emerald-600"
                        htmlFor="birthDate"
                      >
                        Data de Nascimento *
                      </label>
                      <input
                        className=" w-full rounded-md p-2 shadow-md"
                        type="date"
                        id="birthDate"
                        {...register("birthDate")}
                      />
                      {errors.birthDate && (
                        <p className="mt-2 text-xs italic text-red-500">
                          {" "}
                          {errors.birthDate?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-12">
                    <div>
                      <span className="mb-4  text-lg text-emerald-600">
                        Sexo *
                      </span>
                      <div className="mt-2 grid grid-cols-2 gap-12 ">
                        <label>
                          <input
                            className="mr-2 rounded-md shadow-md"
                            value="Masculino"
                            type="radio"
                            {...register("gender")}
                          />
                          Masculino
                        </label>
                        <label>
                          <input
                            className=" mr-2 rounded-md shadow-md"
                            value="Feminino"
                            type="radio"
                            {...register("gender")}
                          />
                          Feminino
                        </label>
                        {errors.gender && (
                          <p className="mt-2 text-xs italic text-red-500">
                            {" "}
                            {errors.gender?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="w-full">
                      <label
                        className="mb-2 block text-lg text-emerald-600"
                        htmlFor="nacionality"
                      >
                        Nacionalidade *
                      </label>
                      <input
                        className="w-full rounded-md p-2 shadow-md"
                        id="nacionality"
                        type="text"
                        {...register("nacionality")}
                      />
                      {errors.nacionality && (
                        <p className="mt-2 text-xs italic text-red-500">
                          {" "}
                          {errors.nacionality?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-8 flex flex-row gap-12 ">
                    <div className="w-full">
                      <label
                        className="mb-2 block text-lg text-emerald-600"
                        htmlFor="number"
                      >
                        Contacto *
                      </label>
                      <input
                        className="w-full rounded-md p-2 shadow-md"
                        id="number"
                        type="number"
                        {...register("number")}
                      />
                      {errors.number && (
                        <p className="mt-2 text-xs italic text-red-500">
                          {" "}
                          {errors.number?.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full">
                      <label
                        className="mb-2 block text-lg text-emerald-600"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        className=" w-full rounded-md p-2 shadow-md"
                        type="email"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="mt-2 text-xs italic text-red-500">
                          {" "}
                          {errors.email?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-8">
                    <label
                      className="mb-2 block text-lg text-emerald-600"
                      htmlFor="address"
                    >
                      Morada
                    </label>
                    <input
                      className="w-full rounded-md p-2 shadow-md"
                      type="text"
                      id="address"
                      {...register("address")}
                    />
                    {errors.address && (
                      <p className="mt-2 text-xs italic text-red-500">
                        {" "}
                        {errors.address?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mx-8">
                <div className="mt-24 rounded-b-2xl bg-emerald-600 p-4 text-center">
                  <h1 className="text-2xl text-white">Informação seguradora</h1>
                </div>
                <div className="mx-8 mt-16">
                  <select
                    className=" w-full rounded-md p-2 shadow-md"
                    {...register("insuranceName")}
                  >
                    {insuranceList.map((i) => (
                      <option key={i.id} value={i.name}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                  {errors.insuranceName && (
                    <p className="mt-2 text-xs italic text-red-500">
                      {" "}
                      {errors.insuranceName?.message}
                    </p>
                  )}
                </div>
                {insurance !== "Particular" && (
                  <div className="mx-8 mt-8">
                    <label className="mb-2 block text-lg text-blue-900">
                      Numero
                    </label>
                    <input
                      className="w-full rounded-md border border-blue-600 p-2"
                      type="text"
                      {...register("insuranceNumber")}
                    />
                  </div>
                )}
              </div>
              <hr className="mt-12 h-0.5 bg-blue-400" />
              <div className=" mt-4 pb-5">
                <div className=" text-sm text-red-500">
                  Campos marcados com (*) são de carácter obrigatório
                </div>
                <div className="float-right ">
                  <button
                    type="submit"
                    className=" mb-16 rounded-full bg-blue-900 px-8 py-4 text-white"
                  >
                    Submeter <span>→</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUrgencyForm;
