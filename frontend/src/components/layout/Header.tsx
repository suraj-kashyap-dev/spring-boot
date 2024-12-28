import React from // useEffect // useState,
'react';
import {
  // Home,
  // Ticket,
  // Settings,
  // Users,
  // Building2,
  Bell,
  ChevronDown,
  Plus,
  Search,
  User,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Link,
  // useNavigate,
  // useLocation
} from 'react-router-dom';
import Dropdown from '../ui/Dropdown';
import logo from '../../assets/logo.svg';
// import { MenuItem } from '../../types/menu.types';

const Header: React.FC = () => {
  const { t } = useTranslation();
  // const [activeMenu, setActiveMenu] = useState<string | null>(null);
  // const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  // const navigate = useNavigate();
  // const location = useLocation();

  // const mainMenus: MenuItem[] = [
  //   {
  //     label: 'Tickets',
  //     path: '/tickets',
  //     icon: <Ticket />,
  //   },
  //   {
  //     label: 'Organizations',
  //     path: '/organizations',
  //     icon: <Building2 />,
  //   },
  //   {
  //     label: 'Analytics',
  //     path: '/analytics',
  //     icon: <Home />,
  //   },
  //   {
  //     label: 'Team',
  //     path: '/team',
  //     icon: <Users />,
  //   },
  //   {
  //     label: 'Settings',
  //     path: '/settings',
  //     icon: <Settings />,
  //   },
  // ];

  // useEffect(() => {
  //   const activeItem = mainMenus.find(
  //     (item) => item.path && location.pathname.startsWith(item.path),
  //   );
  //   if (activeItem) {
  //     setActiveMenu(activeItem.label);
  //   }
  // }, [location, mainMenus]);

  // const handleNavigation = (item: any) => {
  //   setActiveMenu(item.label === activeMenu ? null : item.label);
  //   if (item.path) {
  //     navigate(item.path);
  //   }
  // };

  // const toggleSubMenu = (label: string) => {
  //   setOpenSubMenu(openSubMenu === label ? null : label);
  // };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-51 border-b border-gray-300 bg-gray-800 shadow-lg">
        <div className="h-14 px-6 flex items-center justify-between element-highlight">
          <div className="flex items-center space-x-6">
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="items-center gap-2 text-white flex ml-14 lg:ml-0"
              >
                <img src={logo} alt="Logo" className="h-8 w-auto" />
                HelpDeskHQ
              </Link>
            </div>

            {/* <div className="flex space-x-1">
              {mainMenus.map((item) => (
                <div key={item.label} className="relative">
                  <button
                    onClick={() =>
                      item.subMenus
                        ? toggleSubMenu(item.label)
                        : handleNavigation(item)
                    }
                    className={`
                        flex items-center gap-2  px-4 py-2 text-sm font-medium hover:border-b-2
                        transition-all duration-300 ease-in-out
                        ${
                          activeMenu === item.label
                            ? 'text-white border-b-2 border-white'
                            : 'text-gray-300 hover:text-white hover:border-b-2 hover:border-gray-300'
                        }
                      `}
                  >
                    {item.icon}
                    {item.label}
                  </button>

                  {item.subMenus && openSubMenu === item.label && (
                    <div className="absolute left-0 mt-2 w-48 rounded-lg border z-50 bg-gray-800 shadow-lg">
                      {item.subMenus.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.path || '#'}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          {item.icon && null}
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div> */}
          </div>

          <div className="flex items-center gap-6">
            <div className="flex ">
              <button className="relative rounded-l-md bg-blue-500 p-2 hover:bg-blue-600">
                <Plus className="h-4 w-4 text-bold text-gray-300" />
              </button>
              <button className="relative rounded-r-md border-l-[.5px] bg-blue-500 p-2 hover:bg-blue-600">
                <ChevronDown className="h-4 w-4 text-gray-300" />
              </button>
            </div>

            <button className="relative rounded-full p-2 hover:bg-gray-700">
              <Search className="h-5 w-5 text-gray-300" />
            </button>

            <button className="relative rounded-full p-2 hover:bg-gray-700">
              <Bell className="h-5 w-5 text-gray-300" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <Dropdown position="bottom-right">
              <Dropdown.Toggle>
                <button className="relative rounded-full p-2 hover:bg-gray-700">
                  <User className="h-5 w-5 text-gray-300" />
                </button>
              </Dropdown.Toggle>
              <Dropdown.Content>
                <div className="w-64 rounded-lg shadow-lg">
                  <div className="border-b p-4">
                    <p className="font-medium text-gray-900">{t('John Doe')}</p>
                    <p className="text-sm text-gray-500">john@example.com</p>
                  </div>
                  <div className="p-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <User className="h-4 w-4" />
                      {t('Profile')}
                    </Link>
                    <button
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      onClick={() => {}}
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      {t('Logout')}
                    </button>
                  </div>
                </div>
              </Dropdown.Content>
            </Dropdown>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
