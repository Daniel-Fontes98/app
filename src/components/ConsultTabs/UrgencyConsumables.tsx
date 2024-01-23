import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { MedicalExams, MedicalItems } from "@prisma/client";
import { useRouter } from "next/router";

interface UrgencyConsumablesProps {
  items?: MedicalItems[];
  exams?: MedicalExams[];
  emergencyConsultId: string;
}

export function processString(inputString: string) {
  const baseUrl = "http://192.168.21.63:8080";
  const splitString = inputString.split("/uploads");

  if (splitString.length > 1 && splitString[1]) {
    return `${baseUrl}${splitString[1]}`;
  } else {
    return baseUrl + inputString;
  }
}

export function orderByDateAndTime(array: MedicalExams[]) {
  array.sort((a, b) => {
    // Compare the dates
    const dateComparison = b.date.localeCompare(a.date);
    if (dateComparison !== 0) {
      return dateComparison; // Dates are different, return the comparison result
    }

    // Dates are the same, compare the times
    return b.hour.localeCompare(a.hour);
  });

  return array;
}

const UrgencyConsumables = (urgency: UrgencyConsumablesProps) => {
  const router = useRouter();
  return (
    <div className="mx-4 grid grid-cols-2 gap-8">
      <div className="">
        <h2 className="text-xl font-bold">Exames realizados:</h2>
        <div className="mt-2 rounded-b-md bg-white p-4 shadow-md">
          {urgency.exams?.length !== 0 ? (
            orderByDateAndTime(urgency.exams!).map((exam) => {
              return (
                <div key={exam.id} className="border-b-2 pb-1">
                  <Popover>
                    <PopoverTrigger>
                      <div className="flex gap-8">
                        <div>
                          {exam.date} {exam.hour}
                        </div>
                        <div>{exam.name}</div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="bg-white">
                      {exam.description}
                      <p className="mt-4">
                        {exam.fileLocation && (
                          <a
                            href={processString(exam.fileLocation)}
                            className="rounded-xl bg-gradient-to-t from-teal-700 to-emerald-500 px-2 py-2 text-white"
                            target="_blank"
                            download
                          >
                            Download pdf
                          </a>
                        )}
                      </p>
                    </PopoverContent>
                  </Popover>
                </div>
              );
            })
          ) : (
            <div className="text-black">Sem exames registados</div>
          )}
          <div className="flex justify-end">
            <button
              className=" rounded-xl bg-gradient-to-t from-teal-700 to-emerald-500 px-2 py-2 text-white"
              onClick={() =>
                void router.push(
                  `/emergencys/exams/create/${urgency.emergencyConsultId}`
                )
              }
            >
              + Exame
            </button>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold">Material utilizado:</h2>
        <div className="mt-2 rounded-b-md bg-white p-4 shadow-md">
          {urgency.items?.length !== 0 ? (
            urgency.items?.map((item) => {
              return (
                <p key={item.id}>
                  {item.quantity}x {item.name}
                </p>
              );
            })
          ) : (
            <div className="text-black">Sem material registado</div>
          )}
          <div className="flex justify-end">
            <button
              className=" rounded-xl bg-gradient-to-t from-teal-700 to-emerald-500 px-2 py-2 text-white"
              onClick={() =>
                void router.push(
                  `/emergencys/items/create/${urgency.emergencyConsultId}`
                )
              }
            >
              + Material
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrgencyConsumables;
