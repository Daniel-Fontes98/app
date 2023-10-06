import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface SelectProps {
  name: string;
  registerReturn: Partial<UseFormRegisterReturn> & { type?: string };
  error: FieldError | undefined;
  options: { label: React.ReactNode; value: string | number | string[] }[];
}

const Select = (props: SelectProps) => {
  return (
    <div className="w-full">
      <h2 className="mb-2 block text-sm font-bold text-gray-700">
        {props.name}
      </h2>
      <select
        {...props.registerReturn}
        className="focus:shadow-outline  w-full  appearance-none  rounded border py-2 pl-3 pr-6 text-sm leading-tight text-gray-700 focus:outline-none"
      >
        {props.options.map(({ label, value }, idx) => (
          <option key={idx} value={value}>
            {label}
          </option>
        ))}
      </select>
      {props.error && (
        <p className="mt-2 text-xs italic text-red-500">
          {" "}
          {props.error.message}
        </p>
      )}
    </div>
  );
};

export default Select;
