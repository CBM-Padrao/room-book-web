import { useState } from 'react';
import { Modal, Button, Input } from 'rsuite';

type TableModalProps = {
  open: boolean;
  handleClose: () => void;
};

export function TableModal({
  open,
  handleClose
}: Readonly<TableModalProps>) {
  const [register, setRegister] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit() {

  }

  return (
    <Modal open={open} onClose={handleClose} size="lg">
      <Modal.Header>
        <Modal.Title>Adicionar Usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-4 h-96">
          Matrícula
          <Input value={register} onChange={setRegister} />
          Nome
          <Input value={name} onChange={setName} />
          Email
          <Input type="email" value={email} onChange={setEmail} />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleSubmit}
          appearance="primary"
        >
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
