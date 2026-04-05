import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import RoleToggle from './RoleToggle'

const Sidebar = ({ isOpen, onClose, isStatic }) => {
  return (
    <>
      {/* Mobile me blur effect ke liye jab sidebar open hoga  */}
      {!isStatic && (
        <div 
          className={`lg:hidden fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          onClick={onClose} 
        />
      )}

      {/* Sidebar Box */}
      <div className={`
        bg-white dark:bg-gray-900 h-full flex flex-col border-r dark:border-gray-800
        ${isStatic 
          ? 'w-full' 
          : `fixed top-0 left-0 w-64 z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
        }
      `}>
        {/* laptop screen  */}
        <div className="p-4 font-bold text-xl  dark:border-gray-800 dark:text-white flex justify-between items-center">
          <span>Finance Dashboard</span>
          {!isStatic && (
            <button onClick={onClose} className="lg:hidden">
              <X size={24} />
            </button>
          )}
        </div>
        
        <nav className="p-4 flex flex-col gap-2">
           <Link to="/" onClick={!isStatic ? onClose : undefined} className="p-2 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">Dashboard</Link>
           <Link to="/transaction" onClick={!isStatic ? onClose : undefined} className="p-2 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">Transactions</Link>
           <Link to="/Insights" onClick={!isStatic ? onClose : undefined} className="p-2 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">Insights</Link>
           
           {/* Mobile pe RoleToggle sidebar ke andar dikhega */}
           <div className="sm:hidden mt-4 pt-4 border-t dark:border-gray-800 text-white">
              <RoleToggle />
           </div>
        </nav>
      </div>
    </>
  )
}

export default Sidebar