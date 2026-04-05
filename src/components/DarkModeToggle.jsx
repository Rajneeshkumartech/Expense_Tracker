import { useFinance } from '../context/FinanceContext';
import {Sun , Moon} from 'lucide-react'

const darkModeToggle = () => {

    const {darkMode, setDarkMode} = useFinance();
  return (
    <>
    <button 
    onClick={()=>setDarkMode(!darkMode)}
   
    title={darkMode?"Light Mode":"Dark Mode"}
    >
        {darkMode?<Sun/>:<Moon/>}
    </button>
    </>
  )
}

export default darkModeToggle