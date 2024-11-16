import { useState } from 'react';
import { Button, Input, InputGroup } from 'rsuite';
import { EyeClose, EyeRound } from '@rsuite/icons';
import { useAuth } from '../contexts/AuthContext';

export function Account() {
  const { user, signOut } = useAuth();

  const userName = user!.name.split(' ');
  const lastNames = userName.slice(1).join(' ');

  const [name, setName] = useState(userName[0]);
  const [surname, setSurname] = useState(lastNames);
  const [email, setEmail] = useState(user!.email);
  const [password, setPassword] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="mx-auto w-[980px] gap-10 p-20 flex flex-col">
      <h1 className="text-3xl">Olá, {user!.name}</h1>

      <div className="border-b-[1px] border-[#292d33]"></div>

      <form className="flex flex-col gap-4">
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
