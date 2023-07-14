import {
  Heading,
  FormControl,
  FormLabel,
  Button,
  Input,
  Select,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useField } from "~/hooks/useField";
import { api } from "~/utils/api";

const createUser: NextPage = () => {
  const name = useField("name");
  const birthDate = useField("birthDate");
  const number = useField("number");
  const nacionality = useField("nacionality");
  const idNumber = useField("idNumber");

  const [gender, setGender] = useState("");
  const createUser = api.user.insertOne.useMutation();
  const router = useRouter();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const user = createUser.mutate({
      name: name.value,
      birthDate: birthDate.value,
      number: number.value,
      gender: gender,
      nacionality: nacionality.value,
      idnumber: idNumber.value,
    });

    router.push("/users/listUsers");
  };

  return (
    <>
      <div className="m-3">
        <div className="flex items-center justify-center">
          <Heading className="my-5">Criar Utente</Heading>
        </div>
        <div className="flex items-center justify-center">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <FormControl isRequired>
                <FormLabel>Nome do Utente</FormLabel>
                <Input type="text" placeholder="Nome do Utente" {...name} />
              </FormControl>
            </div>
            <div className="mb-3">
              <FormControl>
                <FormLabel>Numero do BI</FormLabel>
                <Input type="text" placeholder="Numero do BI" {...idNumber} />
              </FormControl>
            </div>
            <div className="mb-3">
              <FormControl>
                <FormLabel>Nacionalidade</FormLabel>
                <Input
                  type="text"
                  placeholder="Nacionalidade"
                  {...nacionality}
                />
              </FormControl>
            </div>
            <div className="mb-3 grid grid-cols-2 gap-3">
              <FormControl>
                <FormLabel>Data de Nascimento</FormLabel>
                <Input type="date" {...birthDate} />
              </FormControl>
              <FormControl>
                <FormLabel>Genero</FormLabel>
                <Select
                  placeholder="Selecionar genero"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  isRequired
                >
                  <option>Masculino</option>
                  <option>Feminino</option>
                </Select>
              </FormControl>
            </div>
            <div className="mb-5 grid grid-cols-2 gap-3">
              <FormControl>
                <FormLabel>Contacto</FormLabel>
                <Input type="text" {...number} />
              </FormControl>
            </div>
            <div>
              <Button colorScheme="teal" size="md" type="submit">
                Criar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default createUser;
