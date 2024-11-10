import { useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import { Button, Input } from 'rsuite';

import Logo from '../assets/logoipsum.svg';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function Login() {
  const navigate = useNavigate();
  const [, setActiveKey] = useLocalStorage('activeKey', '1');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setActiveKey('1');
    navigate('/');
  }

  return (
    <div className="flex h-screen">
      <div className="m-auto bg-[#1a1d24] w-[550px] p-10 rounded-lg">
        <img src={Logo} alt="Logo" className="m-auto" />

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-6 mt-20"
        >
          <Input type="text" placeholder="Matrícula" className="!p-3" />
          <Input type="password" placeholder="Senha" className="!p-3" />

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
