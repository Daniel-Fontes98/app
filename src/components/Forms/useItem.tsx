import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const useItem = () => {
  const formSchema = z.object({
    name: z.string({
      required_error: "É necessário indicar uma data de realização",
    }),
    quantity: z.string({
      required_error: "É necessário indicar uma hora de realização",
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

export default useItem;
