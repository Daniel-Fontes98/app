export interface NewDataEntry {
  date: string;
  nome: string;
  gender: string;
  nacionality: string;
  birthDate: string;
  idnumber: string;
  number: string | null;
  role: string | null;
  companyName: string;
  industry: string;
  location: string;
  examType: string;
  local: string;
  planType: string;
  adicionalInfo: string;
}

export interface OldDataEntry {
  date: string;
  nome: string;
  gender: string;
  nacionality: string;
  birthDate: string;
  idnumber: string;
  number: string | null;
  role: string | null;
  companyName: string;
  industry: string;
  location: string;
  examType: string;
  covid: string;
}

export interface oldExcelData {
  ENTIDADE: string;
  PACIENTE: string;
  SERVIÇOS: string;
  __EMPTY: Date;
  __EMPTY_1: string;
  __EMPTY_2: string;
  __EMPTY_3: Date;
  __EMPTY_4: string;
  __EMPTY_5: string;
  __EMPTY_6: string;
  __EMPTY_7: string;
  __EMPTY_8: string;
  __EMPTY_9: string;
}

export interface newExcelData {
  "DADOS DO PACIENTE": Date;
  ENTIDADE: string;
  "MEDICINA DO TRABALHO": string;
  __EMPTY: string;
  __EMPTY_1: string;
  __EMPTY_2: string;
  __EMPTY_3: Date;
  __EMPTY_4: string;
  __EMPTY_5: string;
  __EMPTY_6: string;
  __EMPTY_7: string;
  __EMPTY_8: string;
  __EMPTY_9: string;
  __EMPTY_10: string;
  __EMPTY_11: string;
}
