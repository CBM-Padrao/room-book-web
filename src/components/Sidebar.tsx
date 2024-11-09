import { Sidenav, Nav } from 'rsuite';
import { Admin, Dashboard, Gear, Peoples } from '@rsuite/icons';
import { JSXElementConstructor, ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconProps } from '@rsuite/icons/esm/Icon';
import { useLocalStorage } from '../hooks/useLocalStorage';

const navItems: NavItemProps[] = [
  {
    eventKey: '1',
    title: 'Dashboard',
    icon: <Dashboard />,
    path: '/'
  },
  {
    eventKey: '2',
    title: 'User Group',
    icon: <Peoples />,
    path: '/'
  },
  {
    eventKey: '3',
    title: 'Settings',
    icon: <Gear />,
    path: '/',
    children: [
      {
        eventKey: '3-1',
        title: 'Applications',
        path: '/'
      },
      {
        eventKey: '3-2',
        title: 'Channels',
        path: '/'
      },
      {
        eventKey: '3-3',
        title: 'Versions',
        path: '/'
      }
    ]
  },
  {
    eventKey: '4',
    title: 'Administração',
    icon: <Admin />,
    path: '/',
    children: [
      {
        eventKey: '4-1',
        title: 'Adicionar membros',
        path: '/admin'
      },
      {
        eventKey: '4-2',
        title: 'Adicionar salas',
        path: '/'
      }
    ]
  }
];

export function Sidebar() {
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(true);
  const [activeKey, setActiveKey] = useLocalStorage('activeKey', '1');

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
    <Sidenav expanded={expanded} className="max-w-[256px]">
      <Sidenav.Body>
        <Nav activeKey={activeKey}>
          {navItems.map(item =>
            item.children ? (
              <NavMenu key={item.eventKey} item={item} handleNav={handleNav} />
            ) : (
              <NavItem key={item.eventKey} item={item} handleNav={handleNav} />
            )
          )}
        </Nav>
      </Sidenav.Body>
      <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} />
    </Sidenav>
  );
}

type NavItemProps = {
  eventKey: string;
  title: string;
  icon?: ReactElement<IconProps, string | JSXElementConstructor<unknown>>;
  path: string;
  children?: NavItemProps[];
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
