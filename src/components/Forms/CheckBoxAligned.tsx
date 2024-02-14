import type { FieldError, Merge, UseFormRegisterReturn } from "react-hook-form";

interface CheckBoxAlignedProps {
  registerReturn: Partial<UseFormRegisterReturn> & { type?: string };
  error:
    | Merge<
        FieldError,
        [(FieldError | undefined)?, ...(FieldError | undefined)[]]
      >
    | undefined;
  options: { label: React.ReactNode; value: string | number | string[] }[];
  numberOfColumnsGrid: number;
}

const CheckBoxAligned = (props: CheckBoxAlignedProps) => {
  return (
    <div className="flex w-full justify-end gap-4">
      {props.options.map(({ label, value }, idx) => (
        <div key={idx}>
          <input
            id={value.toString()}
            className="mr-2 rounded-md accent-emerald-600"
            value={value}
            type="CheckBox"
            {...props.registerReturn}
          />
          <label
            htmlFor={value.toString()}
            className="font-medium text-gray-700"
          >
            {label}
          </label>
        </div>
      ))}
      {props.error && (
        <p className="mt-2 text-xs italic text-red-500">
          {" "}
          {props.error.message}
        </p>
      )}
    </div>
  );
};

export default CheckBoxAligned;
