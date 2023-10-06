import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface RadioProps {
  name: string;
  registerReturn: Partial<UseFormRegisterReturn> & { type?: string };
  error: FieldError | undefined;
  options: { label: React.ReactNode; value: string | number | string[] }[];
}

const Radio = (props: RadioProps) => {
  return (
    <div className="w-full">
      <span className="mb-2 block text-sm font-bold text-gray-700">
        {props.name}
      </span>
      <div className="mt-2 flex gap-4">
        {props.options.map(({ label, value }, idx) => (
          <label key={idx}>
            <input
              className="mr-2 rounded-md accent-emerald-600 shadow-md"
              value={value}
              type="radio"
              {...props.registerReturn}
            />
            <span className="font-light text-gray-700">{label}</span>
          </label>
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

export default Radio;
