import { useMemo } from 'react'
import { useFinance } from '../context/FinanceContext';
import { TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

const DashBoard = () => {
  const { transactions } = useFinance();

  // 1. Logic (Income, Expense, Balance) - useMemo for performance
  const stats = useMemo(() => {
    const income = transactions
      .filter(item => item.type === 'income')
      .reduce((acc, item) => acc + item.amount, 0);
    
    const expense = transactions
      .filter(item => item.type === 'expense')
      .reduce((acc, item) => acc + item.amount, 0);

    return {
      totalIncome: income,
      totalExpense: expense,
      netBalance: income - expense
    };
  }, [transactions]);

  // 2. Pie Chart Data Logic (Categorical Expenses)
  const pieData = useMemo(() => {
    const categoryMap = transactions
      .filter(item => item.type === 'expense')
      .reduce((acc, item) => {
        const amt = Math.abs(item.amount);
        acc[item.category] = (acc[item.category] || 0) + amt;
        return acc;
      }, {});

    return Object.keys(categoryMap).map(name => ({
      name,
      value: categoryMap[name]
    }));
  }, [transactions]);

  // 3. Line Chart Data Logic (Monthly Trend)
  const monthlyData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((month, index) => {
      const monthlyBalance = transactions
        .filter(t => new Date(t.date).getMonth() <= index) 
        .reduce((acc, curr) => curr.type === 'income' ? acc + curr.amount : acc - curr.amount, 0);
      
      return { name: month, balance: monthlyBalance };
    });
  }, [transactions]);

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6', '#fbbf24', '#dc2626', '#a855f7', '#22d3ee', '#fcd34d', '#fb7185'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div className="p-6 border border-slate-800 rounded-3xl shadow-xl transition-all hover:border-indigo-500/50 group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 group-hover:bg-indigo-500 group-hover:  transition-all">
              <Wallet size={24} />
            </div>
          </div>
          <p className=" text-sm font-medium">Total Balance</p>
          <h2 className="text-3xl font-black mt-1">₹{stats.netBalance.toLocaleString()}</h2>
        </div>

        {/* Income Card */}
        <div className="p-6   border border-slate-800 rounded-3xl shadow-xl transition-all hover:border-emerald-500/50 group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 group-hover:bg-emerald-500 group-hover:  transition-all">
              <TrendingUp size={24} />
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium">Total Income</p>
          <h2 className="text-3xl font-black   mt-1">₹{stats.totalIncome.toLocaleString()}</h2>
        </div>

        {/* Expense Card */}
        <div className="p-6   border border-slate-800 rounded-3xl shadow-xl transition-all hover:border-rose-500/50 group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-400 group-hover:bg-rose-500 group-hover:  transition-all">
              <TrendingDown size={24} />
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium">Total Expenses</p>
          <h2 className="text-3xl font-black   mt-1">₹{stats.totalExpense.toLocaleString()}</h2>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Line Chart */}
        <div className="  p-6 rounded-3xl border border-slate-800 shadow-2xl h-[400px]">
          <h3 className="  font-bold mb-6 text-lg flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
            Balance Trend
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickMargin={10} axisLine={false} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', color: '#fff' }}
                itemStyle={{ color: '#818cf8' }}
              />
              <Line type="monotone" dataKey="balance" stroke="#6366f1" strokeWidth={4} dot={{ r: 4, fill: '#6366f1', strokeWidth: 2 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="  p-6 rounded-3xl border border-slate-800 shadow-2xl h-[400px]">
          <h3 className="  font-bold mb-6 text-lg flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            Expense Breakdown
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={80}
                outerRadius={110}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                 contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }}
              />
              <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default DashBoard;