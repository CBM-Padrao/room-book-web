import { FormEvent, useState } from 'react';
import { Modal, Button, Input, Checkbox, InputGroup } from 'rsuite';
import { useUser } from '../contexts/UserContext';

import type { User } from '../contexts/UserContext';
import { EyeClose, EyeRound } from '@rsuite/icons';

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
  const { createUser, updateUser } = useUser();

  const [registration, setRegistration] = useState(
    () => user?.registration ?? ''
  );
  const [name, setName] = useState(() => user?.name ?? '');
  const [email, setEmail] = useState(() => user?.email ?? '');
  const [isAdmin, setIsAdmin] = useState(() => {
    return user?.role === 'ADMIN' || user?.role === 'GESTOR';
  });
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const defaultRole = isAdmin ? 'GESTOR' : 'MEMBRO';
    const role = user?.role === 'ADMIN' ? user.role : defaultRole;

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
    setIsAdmin(false);
    handleClose();
  }

  const actionText = user ? 'Editar' : 'Adicionar';

  return (
    <Modal open={open} onClose={handleClose} size="lg" overflow={false}>
      <Modal.Header>
        <Modal.Title>{actionText} Usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-4 h-96">
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
          <Checkbox
            checked={isAdmin}
            disabled={user?.role === 'ADMIN'}
            onChange={(_v, checked) => setIsAdmin(checked)}
          >
            Administrador
          </Checkbox>
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
