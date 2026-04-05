import DarkModeToggle from './DarkModeToggle'
import RoleToggle from './RoleToggle';
import { Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Navbar = ({ onMenuClick }) => {
    const location = useLocation();

    const pageTitles = {
    '/': 'Dashboard',
    '/transaction': 'Transactions',
    '/Insights': 'Insights',
  };

  const currentTitle = pageTitles[location.pathname] || 'Dashboard';

  return (
    <nav className="w-full border-b border-gray-200 ">
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4'>
          <div className='flex items-center gap-2'>
            {/* Hamburger button: Laptop (lg) pe hidden rahega */}
            <button 
              onClick={onMenuClick}
              className='lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500'
            >
              <Menu size={24} />
            </button>
            <div className='font-bold text-lg '>{currentTitle}</div>
          </div>
        
          <div className='flex gap-4 items-center'>
            <div className="hidden sm:block"><RoleToggle /></div>
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar