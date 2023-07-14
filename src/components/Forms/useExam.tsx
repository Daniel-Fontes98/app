import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const useExam = () => {
  const formSchema = z.object({
    date: z.string({
      required_error: "É necessário indicar uma data de realização",
    }),
    hour: z.string({
      required_error: "É necessário indicar uma hora de realização",
    }),
    name: z.string({
      required_error: "É necessário indicar um nome",
    }),
    description: z.string({
      required_error: "É necessário indicar uma descrição",
    }),
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

export default useExam;
