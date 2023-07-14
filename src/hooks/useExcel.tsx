import { useState } from "react";
import * as xlsx from "xlsx";
import {
  OldDataEntry,
  NewDataEntry,
  oldExcelData,
  newExcelData,
} from "~/types/excelTypes";
import { api } from "~/utils/api";

const addDays = (date: Date, days: number) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toLocaleDateString("en-GB");
};

export default function useExcel() {
  const [userList, setUserList] = useState<OldDataEntry[] | NewDataEntry[]>([]);
  const mutation = api.user.insertEntry.useMutation();

  const readUploadFile = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.currentTarget.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = xlsx.read(data, { type: "array", cellDates: true });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName!];
        const json = xlsx.utils.sheet_to_json(worksheet!);
        if (Object.keys(json[1] as oldExcelData).length === 13)
          loadOldData(json.slice(1) as oldExcelData[]);
        else loadNewData(json.slice(1) as newExcelData[]);
      };
      reader.readAsArrayBuffer(e.currentTarget.files[0]!);
    }
  };

  const loadOldData = (data: oldExcelData[]) => {
    let tempUserList: OldDataEntry[] = [];

    for (let row in data) {
      const newUser: OldDataEntry = {
        companyName: data[row]!.ENTIDADE.toUpperCase(),
        location: data[row]!.SERVIÇOS.toUpperCase(),
        nome: data[row]!.PACIENTE.toUpperCase(),
        date: addDays(data[row]!.__EMPTY, 1),
        gender: data[row]!.__EMPTY_1.toUpperCase(),
        nacionality: data[row]!.__EMPTY_2.toUpperCase(),
        birthDate: addDays(data[row]!.__EMPTY_3, 1),
        idnumber: data[row]!.__EMPTY_4.toUpperCase(),
        number: data[row]?.__EMPTY_5 ? data[row]!.__EMPTY_5 : "NAO DEFINIDO",
        role: data[row]?.__EMPTY_6
          ? data[row]!.__EMPTY_6.toUpperCase()
          : "NAO DEFINIDO",
        industry: data[row]!.__EMPTY_7.toUpperCase(),
        examType: data[row]!.__EMPTY_8.toUpperCase(),
        covid: data[row]!.__EMPTY_9.toUpperCase(),
      };
      tempUserList.push(newUser);
    }

    setUserList(tempUserList);
  };

  const loadNewData = (data: newExcelData[]) => {
    let tempUserList: NewDataEntry[] = [];
    for (let row in data) {
      const newUser: NewDataEntry = {
        date: addDays(data[row]!["DADOS DO PACIENTE"], 1),
        companyName: data[row]!.ENTIDADE.toUpperCase(),
        examType: data[row]!["MEDICINA DO TRABALHO"].toUpperCase(),
        nome: data[row]!.__EMPTY.toUpperCase(),
        gender: data[row]!.__EMPTY_1.toUpperCase(),
        nacionality: data[row]!.__EMPTY_2.toUpperCase(),
        birthDate: addDays(data[row]!.__EMPTY_3, 1),
        idnumber: data[row]!.__EMPTY_4.toString().toUpperCase(),
        number: data[row]!.__EMPTY_5.toString(),
        role: data[row]!.__EMPTY_6.toUpperCase(),
        industry: data[row]!.__EMPTY_7.toUpperCase(),
        location: data[row]!.__EMPTY_8.toUpperCase(),
        local: data[row]!.__EMPTY_9.toUpperCase(),
        planType: data[row]!.__EMPTY_10.toUpperCase(),
        adicionalInfo: data[row]!.__EMPTY_11,
      };
      tempUserList.push(newUser);
    }

    setUserList(tempUserList);
  };

  const handleSubmit = () => {
    userList.map((entry) => {
      mutation.mutate(entry);
    });
  };

  const isNewDataEntry = (
    data: NewDataEntry[] | OldDataEntry[]
  ): data is NewDataEntry[] => {
    return (data as NewDataEntry[])[0]?.local !== undefined;
  };

  return {
    readUploadFile,
    userList,
    handleSubmit,
    isNewDataEntry,
    setUserList,
  };
}
