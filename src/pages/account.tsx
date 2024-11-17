import { FormEvent, useState } from 'react';
import { Button, Input, InputGroup, Notification, useToaster } from 'rsuite';
import { EyeClose, EyeRound } from '@rsuite/icons';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';

export function Account() {
  const { user, signOut } = useAuth();
  const { updateUser } = useUser();
  const toaster = useToaster();

  const userName = user!.name.split(' ');
  const lastNames = userName.slice(1).join(' ');

  const [name, setName] = useState(userName[0]);
  const [surname, setSurname] = useState(lastNames);
  const [email, setEmail] = useState(user!.email);
  const [password, setPassword] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const newUser = {
      name: `${name} ${surname}`,
      email,
      password,
      registration: user!.registration,
      role: user!.role
    };

    try {
      await updateUser({ ...user!, password }, newUser);
      setPassword('');

      toaster.push(
        <Notification type="success" header="Operação sucedida" closable>
          O usuário foi atualizado com sucesso.
        </Notification>,
        { placement: 'bottomEnd', duration: 5000 }
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toaster.push(
        <Notification type="error" header="Erro ao atualizar usuário" closable>
          {error.response?.data.message ||
            'Houve um erro ao atualizar o usuário. Tente novamente.'}
        </Notification>,
        { placement: 'bottomEnd', duration: 5000 }
      );
    }
  }

  return (
    <div className="mx-auto w-[980px] gap-10 p-20 flex flex-col">
      <h1 className="text-3xl">Olá, {user!.name}</h1>

      <div className="border-b-[1px] border-[#292d33]"></div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        Matrícula
        <Input disabled value={user!.registration} />
        <div className="flex justify-between gap-4">
          <div className="w-[calc(100%/2)]">
            Nome
            <Input value={name} onChange={setName} />
          </div>
          <div className="w-[calc(100%/2)]">
            Sobrenome
            <Input value={surname} onChange={setSurname} />
          </div>
        </div>
        Email
        <Input type="email" value={email} onChange={setEmail} />
        Senha
        <InputGroup inside>
          <Input
            type={passwordVisible ? 'text' : 'password'}
            value={password}
            onChange={setPassword}
          />
          <InputGroup.Button
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <EyeRound /> : <EyeClose />}
          </InputGroup.Button>
        </InputGroup>
        <div className="flex items-center gap-4 mt-4">
          <Button
            type="submit"
            appearance="primary"
            className="self-start w-24"
          >
            Atualizar
          </Button>

          <Button appearance="ghost" color="red" onClick={signOut}>
            Sair da conta
          </Button>
        </div>
      </form>
    </div>
  );
}
