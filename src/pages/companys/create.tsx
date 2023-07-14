import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useField } from "~/hooks/useField";
import { api } from "~/utils/api";

const createCompany: NextPage = () => {
  const name = useField("name");
  const number = useField("number");
  const email = useField("email");
  const createCompany = api.company.insertOne.useMutation();
  const router = useRouter();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createCompany.mutate({
      name: name.value,
      number: number.value,
      email: email.value,
    });

    router.push("/companys/listCompanys");
  };

  return (
    <>
      <div className="container m-3">
        <Heading className="my-5">Criar Empresa</Heading>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <FormControl isRequired>
              <FormLabel>Nome da Empresa</FormLabel>
              <Input type="text" placeholder="Nome da Empresa" {...name} />
            </FormControl>
          </div>
          <div className="mb-3">
            <FormControl>
              <FormLabel>Numero</FormLabel>
              <Input type="tel" placeholder="Numero da Empresa" {...number} />
            </FormControl>
          </div>
          <div className="mb-5">
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Email" {...email} />
            </FormControl>
          </div>
          <div>
            <Button colorScheme="teal" size="md" type="submit">
              Criar
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default createCompany;
