export const convertDateString = (date: string) => {
  return new Date(date).toLocaleDateString("en-GB");
};

export function formatarHora(data: Date): string {
  const horas: string = String(data.getHours()).padStart(2, "0");
  const minutos: string = String(data.getMinutes()).padStart(2, "0");
  const segundos: string = String(data.getSeconds()).padStart(2, "0");

  return `${horas}:${minutos}:${segundos}`;
}

export const customDateSort = (a: Date, b: Date) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

export const customTimeSort = (a: Date, b: Date) => {
  const timeA =
    a.getHours() * 3600000 +
    a.getMinutes() * 60000 +
    a.getSeconds() * 1000 +
    a.getMilliseconds();
  const timeB =
    b.getHours() * 3600000 +
    b.getMinutes() * 60000 +
    b.getSeconds() * 1000 +
    b.getMilliseconds();

  if (timeA < timeB) {
    return -1;
  }
  if (timeA > timeB) {
    return 1;
  }
  return 0;
};

export const convertDate = (date: Date) => {
  return (
    date.toLocaleDateString("en-GB") + " " + date.toLocaleTimeString("en-GB")
  );
};

export function calculateTotalHoursElapsed(
  dateString: string,
  timeString: string
): number {
  const dateRegex = /(\d{2})\-(\d{2})\-(\d{4})/;
  const timeRegex = /(\d{2}):(\d{2})/;
  const dateMatch = dateString.match(dateRegex);
  const timeMatch = timeString.match(timeRegex);

  if (!dateMatch || !timeMatch) {
    throw new Error("Invalid date or time format.");
  }

  const day: number = parseInt(dateMatch[1]!, 10);
  const month: number = parseInt(dateMatch[2]!, 10);
  const year: number = parseInt(dateMatch[3]!, 10);
  const hour: number = parseInt(timeMatch[1]!, 10);
  const minute: number = parseInt(timeMatch[2]!, 10);
  // Create a new Date object with the given date and time
  const startDate: Date = new Date(year, month - 1, day, hour, minute);

  // Calculate the time difference in milliseconds
  const currentTime: Date = new Date();
  const timeDifferenceMs: number = currentTime.getTime() - startDate.getTime();

  // Convert milliseconds to hours
  const totalHoursElapsed: number = timeDifferenceMs / (1000 * 60 * 60);

  // Return the total hours elapsed
  return Math.floor(totalHoursElapsed);
}

export function calculateTotalHoursElapsedBetweenTwoDates(
  startDateStr: string,
  startTimeStr: string,
  endDateStr: string,
  endTimeStr: string
): number {
  // Extract start and end dates
  const startDateParts: string[] = startDateStr.split("/");
  const endDateParts: string[] = endDateStr.split("/");
  const startDay: number = parseInt(startDateParts[0]!, 10);
  const startMonth: number = parseInt(startDateParts[1]!, 10);
  const startYear: number = parseInt(startDateParts[2]!, 10);
  const endDay: number = parseInt(endDateParts[0]!, 10);
  const endMonth: number = parseInt(endDateParts[1]!, 10);
  const endYear: number = parseInt(endDateParts[2]!, 10);
  console.log(startDay, startMonth, startYear);
  console.log(endDay, endMonth, endYear);
  // Extract start and end times
  const startTimeParts: string[] = startTimeStr.split(":");
  const endTimeParts: string[] = endTimeStr.split(":");
  const startHour: number = parseInt(startTimeParts[0]!, 10);
  const startMinute: number = parseInt(startTimeParts[1]!, 10);
  const endHour: number = parseInt(endTimeParts[0]!, 10);
  const endMinute: number = parseInt(endTimeParts[1]!, 10);

  // Create start and end Date objects
  const startDate: Date = new Date(
    startYear,
    startMonth - 1,
    startDay,
    startHour,
    startMinute
  );
  const endDate: Date = new Date(
    endYear,
    endMonth - 1,
    endDay,
    endHour,
    endMinute
  );

  // Calculate the time difference in milliseconds
  const timeDifferenceMs: number = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to hours and round down to remove decimal values
  const totalHoursElapsed: number = Math.floor(
    timeDifferenceMs / (1000 * 60 * 60)
  );

  // Return the total hours elapsed
  return totalHoursElapsed;
}

export function calculateTotalHoursElapsedBetweenDateAndString(
  startDateStr: string,
  startTimeStr: string,
  endDate: Date
): number {
  // Extract start date and time
  const startDateParts: string[] = startDateStr.split("/");
  const startDay: number = parseInt(startDateParts[0]!, 10);
  const startMonth: number = parseInt(startDateParts[1]!, 10);
  const startYear: number = parseInt(startDateParts[2]!, 10);

  // Extract start time
  const startTimeParts: string[] = startTimeStr.split(":");
  const startHour: number = parseInt(startTimeParts[0]!, 10);
  const startMinute: number = parseInt(startTimeParts[1]!, 10);

  // Create start and end Date objects
  const startDate: Date = new Date(
    startYear,
    startMonth - 1,
    startDay,
    startHour,
    startMinute
  );

  // Calculate the time difference in milliseconds
  const timeDifferenceMs: number = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to hours and round down to remove decimal values
  const totalHoursElapsed: number = Math.floor(
    timeDifferenceMs / (1000 * 60 * 60)
  );

  // Return the total hours elapsed
  return totalHoursElapsed;
}

export function calculateTotalHoursElapsedDateObjects(
  startDate: Date,
  endDate: Date
): number {
  const millisecondsPerHour = 1000 * 60 * 60;

  const elapsedMilliseconds = Math.abs(endDate.getTime() - startDate.getTime());
  const totalHoursElapsed = elapsedMilliseconds / millisecondsPerHour;

  return totalHoursElapsed;
}

export function parseDate(dateString: string): Date | null {
  const dateParts = dateString.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (!dateParts) {
    console.error("Invalid date format. Please use dd-mm-yyyy or dd/mm/yyyy.");
    return null;
  }

  const day = parseInt(dateParts[1]!, 10);
  const month = parseInt(dateParts[2]!, 10) - 1; // Months are zero-based in Date object
  const year = parseInt(dateParts[3]!, 10);

  // Validate month and day
  if (month < 0 || month > 11 || day < 1 || day > 31) {
    console.error("Invalid month or day.");
    return null;
  }

  return new Date(year, month, day);
}

export function convertDateFormat(inputDate: string): string {
  // Parse the input date string into a Date object
  const parts = inputDate.split("-");
  if (parts.length !== 3) {
    throw new Error("Invalid date format. Expected yyyy-mm-dd.");
  }

  if (!parts[0] || !parts[1] || !parts[2]) {
    throw new Error("Invalid date");
  }

  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1; // Months are 0-based (0 = January)
  const day = parseInt(parts[2]);

  const originalDate = new Date(year, month, day);

  // Create a new date string in the dd-mm-yyyy format
  const newDay = originalDate.getDate();
  const newMonth = originalDate.getMonth() + 1; // Months are 1-based (1 = January)
  const newYear = originalDate.getFullYear();

  const newDateStr = `${newDay.toString().padStart(2, "0")}-${newMonth
    .toString()
    .padStart(2, "0")}-${newYear}`;

  return newDateStr;
}
