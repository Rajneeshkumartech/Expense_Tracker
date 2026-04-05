import  { useState } from 'react'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'
import DashBoard from './components/DashBoard'
import { Routes , Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Transaction from './components/Transaction'
import Insights from './components/Insights'

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      
      {/* Sidebar Section */}
      <aside className="hidden lg:block w-64 border-r border-slate-800 h-screen sticky top-0 shrink-0">
        <Sidebar isStatic={true} />
      </aside>

      <Sidebar 
        isStatic={false} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* 2. Main Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
      
        {/* Navbar*/}
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        
        {/* 3. SCROLLABLE AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path='/' element={<DashBoard/>} />
              <Route path='/transaction' element={<Transaction/>} />
              <Route path='/Insights' element = {<Insights/>} />
              <Route path='*' element={<NotFound/>} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App