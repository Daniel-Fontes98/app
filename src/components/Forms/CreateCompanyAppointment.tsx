import { type FormEvent, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import * as XLSX from "xlsx";

const excelAppointmentsColumns = [
  "date",
  "name",
  "gender",
  "nacionality",
  "birthDate",
  "idNumber",
  "phoneNumber",
  "role",
  "companyName",
  "companyIndustry",
  "companyService",
  "typeOfExam",
  "placeOfExam",
  "planType",
  "addInfo",
];

const CreateCompanyAppointment = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
  };

  const handleFileUpload = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      if (data) {
        const workbook = XLSX.read(data, { type: "binary", cellDates: true });
        const firstSheetName = workbook.SheetNames[0];
        if (!firstSheetName) {
          toast("Erro ao carregar planilha");
          return;
        }
        const worksheet = workbook.Sheets[firstSheetName];
        if (!worksheet) {
          toast("Erro ao carregar planilha");
          return;
        }
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          range: 3,
          header: excelAppointmentsColumns,
          defval: "",
        });
        console.log(jsonData);
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
        >
          Submeter
        </button>
      </div>
    </form>
  );
};

export default CreateCompanyAppointment;
