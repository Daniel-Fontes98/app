import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const useAdmission = () => {
  const formSchema = z.object({
    entryDate: z.string({
      required_error: "É necessário indicar uma data de realização",
    }),
    entryTime: z.string({
      required_error: "É necessário indicar uma hora de realização",
    }),
    bedNumber: z.string({
      required_error: "É necessário indicar o número da cama",
    }),
    description: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return { register, handleSubmit, errors, formSchema };
};

export default useAdmission;
