import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { 
  Search, Plus, Pencil, Trash2, Download, 
  ChevronDown, LayoutGrid, Zap, Filter, X 
} from 'lucide-react';

const Transaction = () => {
  const { role, transactions, addTransaction, deleteTransaction, updateTransaction } = useFinance();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Form states
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');
  const [type, setType] = useState('expense');
  
  // Edit state
  const [editingId, setEditingId] = useState(null);

  const handleSave = () => {
    if (!amount || !description|| !category|| !type) return alert("Please fill all fields");

    const entryData = {
      id: editingId || Date.now(),
      date: new Date().toISOString().split('T')[0],
      description,
      category,
      amount: parseFloat(amount),
      type
    };

    if (editingId) {
      updateTransaction(entryData);
      setEditingId(null);
    } else {
      addTransaction(entryData);
    }
    
    // Reset fields
    resetForm();
  };

  const resetForm = () => {
    setAmount('');
    setDescription('');
    setCategory('Food');
    setType('expense');
    setEditingId(null);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setAmount(item.amount.toString());
    setDescription(item.description);
    setCategory(item.category);
    setType(item.type);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      deleteTransaction(id);
    }
  };

  const filteredData = (transactions || []).filter((item) => {
    const matchesSearch = item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const isAdmin = role === 'admin';

  const handleDownload = () => {
    const headers = "Date,Description,Category,Amount,Type\n";
    const rows = filteredData.map(t => `${t.date},${t.description},${t.category},${t.amount},${t.type}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions_report.csv';
    a.click();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* 1. QUICK ADD / EDIT BOX */}
      {isAdmin && (
        <div className={`  border ${editingId ? 'border-blue-500' : 'border-slate-800'} rounded-3xl p-6 shadow-xl relative overflow-hidden transition-all`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-2 ${editingId ? 'bg-blue-500' : 'bg-blue-600/20'} rounded-lg text-blue-400`}>
                <Zap size={20} fill={editingId ? "white" : "currentColor"} className={editingId ? "text-white" : ""} />
              </div>
              <h3 className="text-lg font-bold ">
                {editingId ? "Edit Transaction" : "Quick Add Transaction"}
              </h3>
            </div>
            {editingId && (
              <button onClick={resetForm} className="text-slate-400 hover:text-white flex items-center gap-1 text-xs">
                <X size={14} /> Cancel Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-slate-500 font-bold ml-1">Amount (₹)</label>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00" 
                className="w-full   border border-slate-700 rounded-xl py-2.5 px-4 text-sm  focus:outline-none focus:border-blue-500" 
              />
            </div>

            <div className="space-y-1.5 lg:col-span-1.5">
              <label className="text-[11px] uppercase tracking-wider text-slate-500 font-bold ml-1">Description</label>
              <input 
                type="text" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Monthly Rent" 
                className="w-full   border border-slate-700 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-blue-500" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-slate-500 font-bold ml-1">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full   border border-slate-700 rounded-xl py-2.5 px-4 text-sm  focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
              >
                <option value="Food">Food</option>
                <option value="Salary">Salary</option>
                <option value="Utilities">Utilities</option>
                <option value="Rent">Rent</option>
                <option value="Shopping">Shopping</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-slate-500 font-bold ml-1">Type</label>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full   border border-slate-700 rounded-xl py-2.5 px-4 text-sm  focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div className="flex items-end">
              <button 
                onClick={handleSave}
                className={`w-full ${editingId ? 'bg-amber-500 hover:bg-amber-400' : 'bg-blue-600 hover:bg-blue-500'} text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2`}
              >
                {editingId ? <Pencil size={18} /> : <Plus size={18} />}
                {editingId ? "Update Entry" : "Save Entry"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. TABLE SECTION */}
      <div className="  border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
             <div className="p-2   rounded-lg ">
                <LayoutGrid size={20} />
             </div>
             <div>
                <h2 className="text-xl font-bold leading-tight">Transaction History</h2>
                <p className="text-xs mt-0.5">Showing {filteredData.length} records</p>
             </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 " size={16} />
              <input 
                type="text"
                placeholder="Search..."
                className="  border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-sm  focus:outline-none focus:border-blue-500 w-full md:w-60"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 " size={14} />
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="appearance-none   border border-slate-700 rounded-xl py-2 pl-9 pr-10 text-sm focus:outline-none cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" size={14} />
            </div>

            <button onClick={handleDownload} className="p-2.5   border border-slate-700 rounded-xl hover:text-white transition-all">
              <Download size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#1e293b]/30 text-[11px] uppercase tracking-[0.15em] font-bold">
              <tr>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Description</th>
                <th className="px-8 py-5 text-center">Category</th>
                <th className="px-8 py-5">Amount</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredData.map((t) => (
                <tr key={t.id} className="hover:bg-slate-800/30 transition-all group">
                  <td className="px-8 py-6 text-sm font-medium">{t.date}</td>
                  <td className="px-8 py-6 text-sm font-semibold">{t.description}</td>
                  <td className="px-8 py-6 text-center">
                    <span className="   px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-slate-700/50">
                      {t.category}
                    </span>
                  </td>
                  <td className={`px-8 py-6 text-sm font-bold ${t.type === 'income' ? 'text-emerald-400' : 'text-rose-500'}`}>
                    {t.type === 'income' ? `+₹${t.amount.toLocaleString()}` : `-₹${Math.abs(t.amount).toLocaleString()}`}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-end gap-2">
                      {isAdmin ? (
                        <>
                          <button 
                            onClick={() => handleEdit(t)}
                            className="p-2 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                          >
                            <Pencil size={18} />
                          </button>
                          <button 
                            onClick={() => onDelete(t.id)}
                            className="p-2 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      ) : (
                        <span className="text-[10px] uppercase font-bold text-slate-600 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-800">Locked</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transaction;