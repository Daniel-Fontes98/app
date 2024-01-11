import { useRouter } from "next/router";
import { type FormEvent, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import * as XLSX from "xlsx";
import { api } from "~/utils/api";

const excelAppointmentsColumns = [
  "consultDate",
  "name",
  "gender",
  "nacionality",
  "birthDate",
  "idNumber",
  "phoneNumber",
  "companyRole",
  "companyName",
  "companyIndustry",
  "companyLocation",
  "examType",
  "planType",
  "addInfo",
];

type jsonExtracted = {
  name: string;
  birthDate: Date;
  examType: string;
  companyRole: string;
  planType: string;
  consultDate: Date;
  phoneNumber: string;
  companyName: string;
  companyIndustry: string;
  companyLocation: string;
  gender?: string;
  nacionality?: string;
  idNumber?: string;
  addInfo?: string;
};

export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear().toString();

  return `${day}/${month}/${year}`;
}

const CreateCompanyAppointmentExcel = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const createAppointmentMutation =
    api.companyAppointment.insertOne.useMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
  };

  async function processChunk(chunk: jsonExtracted[]) {
    const promises = chunk.map(async (data) => {
      try {
        await createAppointmentMutation.mutateAsync({
          ...data,
          consultDate: new Date(
            data.consultDate.setDate(data.consultDate.getDate() + 1)
          ),
          birthDate: formatDate(data.birthDate),
          phoneNumber: data.phoneNumber.toString(),
          idNumber: data.idNumber?.toString(),
        });
      } catch (error) {
        console.error("Error processing chunk:", error);
      }
    });

    await Promise.all(promises);
  }

  const handleFileUpload = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!selectedFile) return;
    const chunkSize = 1;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = event.target?.result;
      if (data) {
        const workbook = XLSX.read(data, { type: "binary", cellDates: true });
        const firstSheetName = workbook.SheetNames[0];
        if (!firstSheetName) {
          toast("Erro ao carregar planilha");
          setIsLoading(false);
          return;
        }
        const worksheet = workbook.Sheets[firstSheetName];
        if (!worksheet) {
          toast("Erro ao carregar planilha");
          setIsLoading(false);
          return;
        }
        const jsonData = XLSX.utils.sheet_to_json<jsonExtracted>(worksheet, {
          range: 3,
          header: excelAppointmentsColumns,
          defval: "",
        });

        const chunkedData: jsonExtracted[][] = [];
        for (let i = 0; i < jsonData.length; i += chunkSize) {
          chunkedData.push(jsonData.slice(i, i + chunkSize));
        }

        async function processChunks() {
          for (const chunk of chunkedData) {
            await processChunk(chunk);
          }
        }

        toast
          .promise(processChunks(), {
            loading: "A carregar...",
            success: "Planilha carregada com sucesso !!",
            error: (err) => `Ocorreu um erro: ${err}`,
          })
          .then(() => router.push("/appointments"))
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      }
    };
    reader.readAsBinaryString(selectedFile);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={(e) => handleFileUpload(e)}>
      <Toaster />
      <div>
        <label className="mb-2 block text-sm font-bold text-gray-700">
          Planilha
        </label>
        <input
          accept=".xls,.xlsx, .xlsm"
          onChange={handleFileChange}
          className="appearance-none"
          type="file"
        />
      </div>
      <div className="mb-10 mt-6 text-center">
        <button
          className="focus:shadow-outline w-full rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          type="submit"
          disabled={isLoading}
        >
          Submeter
        </button>
      </div>
    </form>
  );
};

export default CreateCompanyAppointmentExcel;
