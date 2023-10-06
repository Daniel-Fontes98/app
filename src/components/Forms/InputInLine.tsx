import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  name: string;
  registerReturn: Partial<UseFormRegisterReturn> & { type?: string };
  error: FieldError | undefined;
  type: string;
  disabled?: boolean;
}

const InputInLine = (props: InputProps) => {
  return (
    <>
      <label
        htmlFor={props.registerReturn.name}
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        {props.name}
      </label>
      <input
        id={props.registerReturn.name}
        type={props.type}
        disabled={props.disabled ? props.disabled : false}
        className="focus:shadow-outline  w-full  appearance-none  rounded border py-2 pl-3 pr-6 text-sm leading-tight text-gray-700 focus:outline-none"
        {...props.registerReturn}
      />
      {props.error && (
        <p className="mt-2 text-xs italic text-red-500">
          {" "}
          {props.error.message}
        </p>
      )}
    </>
  );
};

export default InputInLine;
