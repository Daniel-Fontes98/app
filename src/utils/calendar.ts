export const getCurrentMonthIndex = (): number => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  return currentMonth;
};

export const getCurrentMonthFromIndex = (
  index: number
): { id: number; name: string; days: number } | undefined => {
  const month = months.find((m) => m.id === index);
  return month;
};

export const getCurrentMonth = (): string | undefined => {
  const index = getCurrentMonthIndex();
  const month = months.find((m) => m.id === index);
  return month?.name;
};

export const getCurrentYear = (): number => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return currentYear;
};

export const AnoBissexto = (ano: number): boolean => {
  if (ano % 4 !== 0) {
    return false;
  } else if (ano % 100 !== 0) {
    return true;
  } else if (ano % 400 !== 0) {
    return false;
  } else {
    return true;
  }
};

export const months = [
  { id: 0, name: "Janeiro", days: 31 },
  {
    id: 1,
    name: "Fevereiro",
    days: AnoBissexto(getCurrentYear()) === true ? 29 : 28,
  },
  { id: 2, name: "Março", days: 31 },
  { id: 3, name: "Abril", days: 30 },
  { id: 4, name: "Maio", days: 31 },
  { id: 5, name: "Junho", days: 30 },
  { id: 6, name: "Julho", days: 31 },
  { id: 7, name: "Agosto", days: 31 },
  { id: 8, name: "Setembro", days: 30 },
  { id: 9, name: "Outubro", days: 31 },
  { id: 10, name: "Novembro", days: 30 },
  { id: 11, name: "Dezembro", days: 31 },
];

export const daysOfTheWeek = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

export const obterDiaSemanaInicioMes = (mes: number, ano: number): number => {
  if (mes < 0 || mes > 11) {
    throw new Error("O mês deve estar entre 0 (Janeiro) e 11 (Dezembro).");
  }

  if (ano < 1) {
    throw new Error("O ano deve ser maior que 0.");
  }

  // Janeiro e Fevereiro são considerados os meses 13 e 14 do ano anterior.
  if (mes < 2) {
    mes += 12;
    ano--;
  }

  const k = ano % 100;
  const j = Math.floor(ano / 100);

  // Fórmula de Zeller
  const diaSemana =
    (1 +
      Math.floor((13 * (mes + 1)) / 5) +
      k +
      Math.floor(k / 4) +
      Math.floor(j / 4) +
      5 * j) %
    7;

  // Ajustar o resultado para a representação desejada (0 - Segunda-feira, ..., 6 - Domingo)
  return (diaSemana + 5) % 7;
};
