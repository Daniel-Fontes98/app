import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps {
  name: string;
  registerReturn: Partial<UseFormRegisterReturn> & { type?: string };
  error: FieldError | undefined;
  className: string;
}

const TextArea = (props: TextAreaProps) => {
  return (
    <div className="w-full">
      <label
        htmlFor={props.name}
        className="mb-2 block text-sm font-bold text-gray-700"
      >
        {props.name}
      </label>
      <textarea
        id={props.name}
        className={props.className}
        {...props.registerReturn}
      />
      {props.error && (
        <p className="mt-2 text-xs italic text-red-500">
          {" "}
          {props.error.message}
        </p>
      )}
    </div>
  );
};

export default TextArea;
