import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  HiOutlineLogout,
  HiOutlineHome, HiOutlineUser, HiOutlineUserGroup, HiOutlineIdentification, HiOutlineClipboardCheck, HiOutlineOfficeBuilding, HiOutlinePlusCircle, HiOutlineClipboardList, HiOutlineCog, HiOutlineViewGrid, HiOutlineShieldCheck, HiOutlineDocumentSearch, HiOutlineCurrencyDollar, HiOutlineCreditCard, HiOutlineReceiptTax, HiOutlineChartBar, HiOutlineServer, HiOutlineChartPie, HiOutlineBell, HiOutlineDatabase, HiChevronDown
} from 'react-icons/hi';
// import { HiOutlineMenuAlt2, HiX } from "react-icons/hi";
import { TbLayoutSidebarRightExpand } from "react-icons/tb";

import Loader from './ui/status/Loader';
import ConfirmationDialogueBox from './ui/status/Confirmation';

const ErpSidebar = (props) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});
  // const [logginOut, setLogginOut] = useState(false);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isActive = (path) => location.pathname === path;

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <HiOutlineHome /> },

    {
      name: 'User Management',
      icon: <HiOutlineUserGroup />,
      submenu: [
        { name: 'All Users', path: '/users', icon: <HiOutlineUser /> },
        { name: 'Business Admins', path: '/business-admins', icon: <HiOutlineIdentification /> },
        { name: 'Access Requests', path: '/users/access-requests', icon: <HiOutlineClipboardCheck /> },
      ],
    },

    {
      name: 'Biz Management',
      icon: <HiOutlineOfficeBuilding />,
      submenu: [
        { name: 'All Businesses', path: '/businesses', icon: <HiOutlineIdentification /> },
        { name: 'Create Business', path: '/businesses/create', icon: <HiOutlinePlusCircle /> },
        { name: 'Business Types', path: '/businesses/types', icon: <HiOutlineClipboardList /> },
        { name: 'Module Assignment', path: '/businesses/module-assignment', icon: <HiOutlinePlusCircle /> },
      ],
    },

    {
      name: 'Platform Config',
      icon: <HiOutlineCog />,
      submenu: [
        { name: 'Modules Management', path: '/platform/modules', icon: <HiOutlineViewGrid /> },
        { name: 'Role & Permissions', path: '/platform/roles-permissions', icon: <HiOutlineShieldCheck /> },
        { name: 'Audit Logs', path: '/platform/audit-logs', icon: <HiOutlineDocumentSearch /> },
      ],
    },

    {
      name: 'Finance & Billing',
      icon: <HiOutlineCurrencyDollar />,
      submenu: [
        { name: 'Subscription Plans', path: '/finance/subscriptions', icon: <HiOutlineCreditCard /> },
        { name: 'Transaction History', path: '/finance/transactions', icon: <HiOutlineReceiptTax /> },
        { name: 'Revenue Reports', path: '/finance/reports', icon: <HiOutlineChartBar /> },
      ],
    },

    {
      name: 'System Admin',
      icon: <HiOutlineServer />,
      submenu: [
        { name: 'System Status', path: '/system/status', icon: <HiOutlineChartPie /> },
        { name: 'Notifications', path: '/system/notifications', icon: <HiOutlineBell /> },
        { name: 'Backup & Restore', path: '/system/backup', icon: <HiOutlineDatabase /> },
      ],
    },
  ];


  useEffect(() => {
    const activeMenus = {};
    menuItems.forEach((item) => {
      if (item.submenu) {
        const isSubmenuActive = item.submenu.some((subItem) => isActive(subItem.path));
        if (isSubmenuActive) activeMenus[item.name] = true;
      }
    });
    setOpenMenus(activeMenus);
  }, [location.pathname]);

  return (
    <div  
      className={`text-[#ffff] w-80 h-full bg-background p-4 flex flex-col justify-between transition-transform duration-300 transform ${props.isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      <button
        className="p-2 rounded-full bg-accent text-primary-text-inverse hover:bg-accent/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 w-10 h-10 mb-4"
        onClick={() => {
          props.setIsSidebarOpen(!props.isSidebarOpen);
        }}
        aria-label="Toggle Sidebar"
      >
        {props.isSidebarOpen ? <TbLayoutSidebarRightExpand className="w-6 h-6" /> : null}
      </button>

      <div className="mb-8 p-4 rounded-xl bg-background shadow-md border border-border-color">
        {/* Logo and Name in One Row */}
        <div className="flex items-center gap-4 mb-2">
          <img
            src="/logo.png"
            alt="Badi Dukaan Logo"
            className="w-16 h-16 p-1 rounded-full border-4  border-accent shadow-md"
          />
          <p style={{
            fontSize: 'var(--text-2xl)', color: 'var(--color-primary-text)',
          }}
            className="font-bold text-primary-text ">
            Badi Eats
          </p>
        </div>

        {/* Description in Next Row */}
        <p style={{ fontSize: 'var(--text-sm)' }} className="text-center  text-secondary-text mt-4  ">
          From Local Hustle to Global Muscle
        </p>
      </div>


      {/* Menu Items */}
      <ul className="scrollbar flex-grow overflow-y-auto">
        {menuItems.map((item, index) => (
          <li key={index} className="mt-2">
            {item.submenu ? (
              <button
                onClick={() => toggleMenu(item.name)}
                style={{ width: '95%' }}
                className="text-primary-text flex items-center  p-3  rounded-lg justify-between hover:bg-accent hover:text-primary-text-inverse transition"
              >
                <span className="flex items-center font-semibold ">
                  {item.icon} <span className="ml-3  ">{item.name}</span>
                </span>
                <HiChevronDown
                  className={`transition-transform duration-200 ${openMenus[item.name] ? 'rotate-180' : ''
                    }`}
                />
              </button>
            ) : (
              <a
                href={item.path}
                className={`mr-5 text-primary-text font-semibold flex items-center p-3 rounded-lg cursor-pointer transition ${isActive(item.path) ? 'bg-accent  text-primary-text-inverse font-semibold' : 'hover:bg-accent hover:text-primary-text-inverse'
                  }`}
              >
                {item.icon} <span className="ml-3">{item.name}</span>
              </a>
            )}

            {item.submenu && openMenus[item.name] && (
              <ul className=" shadow-md p-4 rounded-xl ml-6 mt-2 mr-5 space-y-1 border-l-2 border-accent pl-4">
                {item.submenu.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <a
                      href={subItem.path}
                      className={`text-primary-text flex items-center gap-3 p-2 rounded-lg transition ${isActive(subItem.path) ? 'bg-accent text-primary-text-inverse font-semibold' : 'hover:bg-accent hover:text-primary-text-inverse'
                        }`}
                    >
                      {subItem.icon}
                      <span>{subItem.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* User Info Section */}

      <div className="p-4 mt-8 border-t border-border-color shadow-md rounded-lg">
        {/* User Info */}
        <div className="flex items-center mb-4">
          <img
            src="https://ui-avatars.com/api/?name=Nischal+Gupta"
            alt="User Avatar"
            className="rounded-full w-10 h-10 mr-3"
          />
          <div>
            <p className="text-sm text-primary-text font-bold" style={{ fontSize: 'var(--text-md)' }}>Nischal Gupta</p>
            <p className="text-xs text-secondary-text font-semibold" style={{ fontSize: 'var(--text-xs)' }}>Super Admin</p>
          </div>
        </div>



        {/* <ConfirmationDialogueBox /> */}


        {/* Logout Button */}
        <button
          className="flex items-center justify-center gap-2 w-full p-2 rounded-lg bg-error text-primary-text-inverse text-center border border-transparent  transition cursor-pointer"
          onClick={() => {

            props?.setLogginOut(true)
            // localStorage.removeItem('token')

            // Redirect to login page
            // navigate('/')
            // props?.setLogginOut(false)
          }
          }
        >
          <HiOutlineLogout className="w-5 h-5" />
          {props?.logginOut ? <Loader /> : "Logout"}
        </button>
      </div>
    </div >
  );
};

export default ErpSidebar;