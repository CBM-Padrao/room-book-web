import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Notification, useToaster } from 'rsuite';

import Logo from '../assets/logoipsum.svg';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const toaster = useToaster();

  const [registration, setRegistration] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      await logIn(registration, password);
      navigate('/');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toaster.push(
        <Notification type="error" header="Erro ao fazer login" closable>
          {error.response?.data.message ||
            'Houve um erro ao fazer login. Tente novamente.'}
        </Notification>,
        { placement: 'bottomCenter', duration: 5000 }
      );
    }
  }

  return (
    <div className="flex h-screen">
      <div className="m-auto bg-[#1a1d24] w-[550px] p-10 rounded-lg">
        <img src={Logo} alt="Logo" className="m-auto" />

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-6 mt-20"
        >
          <Input
            onChange={setRegistration}
            type="text"
            placeholder="Matrícula"
            className="!p-3"
          />
          <Input
            onChange={setPassword}
            type="password"
            placeholder="Senha"
            className="!p-3"
          />

          <Button
            appearance="primary"
            type="submit"
            className="bg-slate-500 rounded-md !py-3 text-white mt-3 !font-bold"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
