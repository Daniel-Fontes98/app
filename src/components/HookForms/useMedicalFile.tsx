import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const useMedicalFile = () => {
  const formSchema = z.object({
    app: z.string().optional(),
    apf: z.string().optional(),
    hda: z.string().optional(),
    hd: z.string().optional(),
    treatment: z.string().optional(),
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

export default useMedicalFile;
