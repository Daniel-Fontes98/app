import type { Company, Triage, User } from "@prisma/client";
import { calculateAgeFormatYYYY } from "../ConsultTabs/UserInfo";

interface userInfoProps {
  user?: User;
  triage?: Triage | null;
  company?: Company;
  role?: string | null;
  planType?: string | null;
}

export function calculateAge(birthdate: string): string {
  const today: Date = new Date();
  const parts: string[] = birthdate.split("/");

  const birthDay: number = parseInt(parts[0] as string);
  const birthMonth: number = parseInt(parts[1] as string);
  const birthYear: number = parseInt(parts[2] as string);

  let ageYears: number = today.getFullYear() - birthYear;
  const ageMonths: number = today.getMonth() + 1 - birthMonth;
  const ageDays: number = today.getDate() - birthDay;

  // Adjust age based on current month and day
  if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
    ageYears--;
  }

  const age: string = ageYears.toString();

  return age;
}

const UserInfo = (props: userInfoProps) => {
  if (props.user?.birthDate) {
    return (
      <div>
        <div className="flex gap-8">
          <div className="flex w-full flex-col">
            <h2 className="text-xl font-bold">Informação Paciente</h2>
            <div className="mr-4 mt-2 w-full rounded-b-md bg-white p-4 shadow-md">
              <div className="flex flex-col items-start justify-center gap-2">
                <p>Data de Nascimento: {props.user?.birthDate}</p>
                <p>Idade: {calculateAgeFormatYYYY(props.user.birthDate)}</p>
                <p>Gênero: {props.user?.gender}</p>
                <p>Nacionalidade: {props.user?.nacionality}</p>
                <p>Telemóvel: {props.user?.number}</p>
                <p>Empresa: {props.company?.name}</p>
                <p>Tipo de plano: {props.planType}</p>
                <p>Função:{props.role}</p>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col">
            <h2 className="text-xl font-bold">Informação Triagem</h2>
            <div className="mr-4 mt-2 w-full rounded-b-md bg-white p-4 shadow-md">
              <div className="flex flex-col items-start justify-center gap-2">
                <p>Peso (kg): {props.triage?.weight}</p>
                <p>Altura (m): {props.triage?.height}</p>
                <p>Temperatura (ºC): {props.triage?.temperature}</p>
                <p>Tensão Arterial (mmHg): {props.triage?.arterialTension}</p>
                <p>Frequência Cardíaca (bpm): {props.triage?.pulse}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="animate-pulse">Loading...</div>;
  }
};

export default UserInfo;
