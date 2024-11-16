import { Sidenav, Nav } from 'rsuite';
import { Tools, Dashboard, Peoples } from '@rsuite/icons';
import { JSXElementConstructor, ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconProps } from '@rsuite/icons/esm/Icon';
import { useAuth } from '../contexts/AuthContext';

const navItems: NavItemProps[] = [
  {
    eventKey: '1',
    title: 'Dashboard',
    icon: <Dashboard />,
    path: '/'
  },
  {
    eventKey: '2',
    title: 'Conta',
    icon: <Peoples />,
    path: '/account'
  },
  {
    eventKey: '3',
    title: 'Administração',
    icon: <Tools />,
    path: '/',
    auth: ['ADMIN', 'GESTOR'],
    children: [
      {
        eventKey: '3-1',
        title: 'Adicionar membros',
        path: '/admin'
      },
      {
        eventKey: '3-2',
        title: 'Adicionar salas',
        path: '/rooms'
      }
    ]
  }
];

export function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeKey, setActiveKey] = useState('1');

  function handleNav(eventKey: string) {
    const items = [
      ...navItems,
      ...navItems.flatMap(item => item.children || [])
    ];

    const item = items.find(item => item.eventKey === eventKey);

    if (item?.eventKey) {
      setActiveKey(item.eventKey);
      return navigate(item.path);
    }
  }

  return (
    <Sidenav expanded={false} appearance="subtle" className="max-w-[256px]">
      <Sidenav.Body>
        <Nav activeKey={activeKey}>
          {navItems.map(item => {
            if (item.auth && !item.auth.includes(user!.role)) return null;

            if (item.children) {
              return (
                <NavMenu
                  key={item.eventKey}
                  handleNav={handleNav}
                  item={item}
                />
              );
            }

            return (
              <NavItem key={item.eventKey} handleNav={handleNav} item={item} />
            );
          })}
        </Nav>
      </Sidenav.Body>
    </Sidenav>
  );
}

type NavItemProps = {
  eventKey: string;
  title: string;
  icon?: ReactElement<IconProps, string | JSXElementConstructor<unknown>>;
  path: string;
  children?: NavItemProps[];
  auth?: string[];
};

type HandleNav = (eventKey: string) => void;

function NavItem({
  handleNav,
  item
}: Readonly<{
  handleNav: HandleNav;
  item: NavItemProps;
}>) {
  return (
    <Nav.Item
      className="hover:bg-[#292d33]"
      key={item.eventKey}
      eventKey={item.eventKey}
      onSelect={() => handleNav(item.eventKey)}
      icon={item.icon}
    >
      {item.title}
    </Nav.Item>
  );
}

function NavMenu({
  handleNav,
  item
}: Readonly<{
  handleNav: HandleNav;
  item: NavItemProps;
}>) {
  return (
    <Nav.Menu
      key={item.eventKey}
      eventKey={item.eventKey}
      title={item.title}
      icon={item.icon}
    >
      {item.children?.map(child => (
        <NavItem key={child.eventKey} handleNav={handleNav} item={child} />
      ))}
    </Nav.Menu>
  );
}
