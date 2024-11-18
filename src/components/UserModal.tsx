import { FormEvent, useState } from 'react';
import { Modal, Button, Input, InputGroup, RadioGroup, Radio } from 'rsuite';
import { useUser } from '../contexts/UserContext';

import type { User } from '../contexts/UserContext';
import { EyeClose, EyeRound } from '@rsuite/icons';
import { useAuth } from '../contexts/AuthContext';

type TableModalProps = {
  open: boolean;
  handleClose: () => void;
  user: User | null;
};

export function UserModal({
  open,
  handleClose,
  user
}: Readonly<TableModalProps>) {
  const { user: currentUser } = useAuth();
  const { createUser, updateUser } = useUser();

  const [registration, setRegistration] = useState(
    () => user?.registration ?? ''
  );
  const [name, setName] = useState(() => user?.name ?? '');
  const [email, setEmail] = useState(() => user?.email ?? '');
  const [role, setRole] = useState(() => user?.role ?? 'MEMBRO');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const newUser = {
      registration,
      name,
      email,
      password,
      role
    };

    if (user) await updateUser(user, newUser);
    else await createUser(newUser);

    setRegistration('');
    setName('');
    setEmail('');
    setPassword('');
    setRole('');
    handleClose();
  }

  const actionText = user ? 'Editar' : 'Adicionar';
  const isCurrentAdmin = currentUser?.role === 'ADMIN';

  return (
    <Modal open={open} onClose={handleClose} size="lg">
      <Modal.Header>
        <Modal.Title>{actionText} Usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-4">
          <RadioGroup
            name="radio-group-inline"
            inline
            appearance="picker"
            value={role}
            disabled={!isCurrentAdmin}
            className="self-start flex items-center"
            onChange={value => setRole(value as string)}
          >
            <label className="p-2 text-md text-zinc-400">Cargo</label>
            <Radio value="ADMIN">Admin</Radio>
            <Radio value="GESTOR">Gestor</Radio>
            <Radio value="MEMBRO">Membro</Radio>
          </RadioGroup>
          Matrícula
          <Input value={registration} onChange={setRegistration} />
          Nome
          <Input value={name} onChange={setName} />
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
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit} appearance="primary">
          {actionText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
