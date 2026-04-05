import React from 'react'
import {User , Shield} from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

const RoleToggle = () => {
  const { role, setRole } = useFinance();


  return (
    <>
    <div className='flex items-center gap-2'>
        {role === 'admin'?(
            <Shield className='w-5 h-5 text-blue-500' />
        ):(<User className='w-5 h-5 text-blue-500' />)}

        <select 
        value={role}
        onChange={(e)=>setRole(e.target.value)}
            className=' border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
        >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
        </select>
    </div>
    </>
  )
}

export default RoleToggle