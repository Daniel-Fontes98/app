import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const useTriage = () => {
  const formSchema = z.object({
    weight: z
      .string({
        required_error: "É necessário indicar o peso",
      })
      .min(2, {
        message: "Mínimo de dois caracteres",
      }),
    height: z
      .string({
        required_error: "É necessário indicar a altura",
      })
      .min(2, {
        message: "Mínimo de dois caracteres",
      }),
    bloodType: z.enum(["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"]),
    tMin: z
      .string({
        required_error: "É necessário indicar a tensão mínma",
      })
      .min(1, {
        message: "Mínimo de um digito",
      }),
    tMax: z
      .string({
        required_error: "É necessário indicar a tensão máxima",
      })
      .min(1, {
        message: "Mínimo de um digito",
      }),
    degrees: z
      .string({
        required_error: "É necessário indicar a temperatura",
      })
      .min(2, {
        message: "Mínimo de dois caracteres",
      }),
    oxygen: z
      .string({
        required_error:
          "É necessário indicar a percentagem de saturação de oxigénio",
      })
      .min(2, {
        message: "Mínimo de dois caracteres",
      }),
    complaint: z.string().optional(),
    sintoms: z
      .string({
        invalid_type_error: "Lista de sintomas não pode estar vazia ",
      })
      .array()
      .nonempty({
        message: "Lista de sintomas não pode estar vazia",
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

export default useTriage;
