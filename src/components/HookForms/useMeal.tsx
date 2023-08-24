import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const useMeal = () => {
  const formSchema = z.object({
    date: z.string({
      required_error: "É necessário indicar uma data de realização",
    }),
    time: z.string({
      required_error: "É necessário indicar uma hora de realização",
    }),
    typeOfMeal: z.string({
      required_error: "É necessário indicar o tipo de refeição",
    }),
    description: z.string({
      required_error: "É ncessário indicar uma descrição da refeição",
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

export default useMeal;
