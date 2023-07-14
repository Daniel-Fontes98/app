import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const useEmergency = () => {
  const formSchema = z.object({
    entryDate: z.string({
      required_error: "É necessário indicar uma data de entrada",
    }),
    entryTime: z.string({
      required_error: "É necessário indicar uma hora de entrada",
    }),
    name: z.string({
      required_error: "É necessário indicar um nome",
    }),
    idNumber: z.string().optional(),
    birthDate: z.string({
      required_error: "É necessário indicar uma data de nascimento",
    }),
    gender: z.string({
      required_error: "É necessário indicar um genero",
    }),
    nacionality: z.string({
      required_error: "É necessário indicar uma nacionalidade",
    }),
    number: z.string({
      required_error: "É necessário indicar um contacto",
    }),
    email: z.string().optional(),
    address: z.string().optional(),
    insuranceName: z.enum([
      "Particular",
      "ADV Angola",
      "Bic Seguros",
      "ENSA",
      "Global Seguros",
      "Medicare Angola",
      "Nossa Seguros",
      "Protteja Seguros",
      "Sol Seguros",
      "Trevo Seguros",
      "Tranquilidade",
      "Unisaude",
    ]),
    insuranceNumber: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      insuranceName: "Particular",
    },
  });

  return { register, handleSubmit, errors, formSchema, watch };
};

export default useEmergency;
