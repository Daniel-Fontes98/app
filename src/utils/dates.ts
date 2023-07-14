export const convertDateString = (date: string) => {
  return new Date(date).toLocaleDateString("en-GB");
};

export const convertDate = (date: Date) => {
  return (
    date.toLocaleDateString("en-GB") + " " + date.toLocaleTimeString("en-GB")
  );
};

interface calculateTotalHoursProps {
  dateString: string;
  timeString: string;
}

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
