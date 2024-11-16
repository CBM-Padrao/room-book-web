import { useState } from 'react';
import { Modal, Button, Input, Checkbox } from 'rsuite';
import { User, useUser } from '../contexts/UserContext';

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
  const [isAdmin, setIsAdmin] = useState(() => user?.isAdmin ?? false);

  function handleSubmit() {
    const newUser = { registration, name, email, isAdmin };

    if (user) updateUser(user, newUser);
    else createUser(newUser);

    setRegistration('');
    setName('');
    setEmail('');
    setIsAdmin(false);
    handleClose();
  }

  const actionText = user ? 'Editar' : 'Adicionar';

  return (
    <Modal open={open} onClose={handleClose} size="lg">
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
          <Checkbox
            checked={isAdmin}
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
