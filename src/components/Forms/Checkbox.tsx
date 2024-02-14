import type { FieldError, Merge, UseFormRegisterReturn } from "react-hook-form";

interface CheckBoxProps {
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

const CheckBox = (props: CheckBoxProps) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {props.options.map(({ label, value }, idx) => (
          <div key={idx}>
            <input
              id={value.toString()}
              className="mr-2 rounded-md accent-emerald-600"
              value={value}
              type="checkbox"
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
    </div>
  );
};

export default CheckBox;
