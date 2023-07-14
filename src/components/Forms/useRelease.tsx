import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const useRelease = () => {
  const formSchema = z.object({
    exitDate: z
      .string({
        required_error: "É necessário escolher a data de saida",
      })
      .min(4, {
        message: "Mínimo de quatro caracteres",
      }),
    exitTime: z
      .string({
        required_error: "É necessário definir a hora de saida",
      })
      .min(4, {
        message: "Mínimo de quatro caracteres",
      }),
    addInfo: z.string().optional(),
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

export default useRelease;
