import { Sidenav, Nav } from 'rsuite';
import { Dashboard, Gear, Peoples, Rate } from '@rsuite/icons';
import { useState } from 'react';

export function Sidebar() {
  const [expanded, setExpanded] = useState(true);

  return (
    <Sidenav expanded={expanded} className="max-w-[256px]">
      <Sidenav.Body>
        <Nav activeKey="1">
          <Nav.Item eventKey="1" icon={<Dashboard />}>
            Dashboard
          </Nav.Item>
          <Nav.Item eventKey="2" icon={<Peoples />}>
            User Group
          </Nav.Item>
          <Nav.Menu eventKey="3" title="Advanced" icon={<Rate />}>
            <Nav.Item eventKey="3-1">Geo</Nav.Item>
            <Nav.Item eventKey="3-2">Devices</Nav.Item>
            <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
            <Nav.Item eventKey="3-4">Visit Depth</Nav.Item>
          </Nav.Menu>
          <Nav.Menu eventKey="4" title="Settings" icon={<Gear />}>
            <Nav.Item eventKey="4-1">Applications</Nav.Item>
            <Nav.Item eventKey="4-2">Channels</Nav.Item>
            <Nav.Item eventKey="4-3">Versions</Nav.Item>
            <Nav.Menu eventKey="4-5" title="Custom Action">
              <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
              <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
            </Nav.Menu>
          </Nav.Menu>
        </Nav>
      </Sidenav.Body>
      <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} />
    </Sidenav>
  );
}
