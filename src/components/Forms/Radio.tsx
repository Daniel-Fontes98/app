import { FieldError, Merge, UseFormRegisterReturn } from "react-hook-form";

interface RadioProps {
  name: string;
  registerReturn: Partial<UseFormRegisterReturn> & { type?: string };
  error:
    | Merge<
        FieldError,
        [(FieldError | undefined)?, ...(FieldError | undefined)[]]
      >
    | undefined;
  options: { label: React.ReactNode; value: string | number | string[] }[];
}

const Radio = (props: RadioProps) => {
  return (
    <div className="w-full">
      <span className="block text-sm font-bold text-gray-700">
        {props.name}
      </span>
      <div className="mt-2 flex gap-4">
        {props.options.map(({ label, value }, idx) => (
          <label key={idx}>
            <input
              className="mr-2 rounded-md  accent-emerald-600"
              value={value}
              type="radio"
              {...props.registerReturn}
            />
            <span className="font-medium text-gray-700">{label}</span>
          </label>
        ))}
        {props.error && (
          <p className="mt-2 whitespace-normal text-xs italic text-red-500">
            {" "}
            {props.error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Radio;
