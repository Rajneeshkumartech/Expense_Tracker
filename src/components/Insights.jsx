import React, { useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { 
  TrendingUp, TrendingDown, AlertCircle, 
  Target, Award, Lightbulb, ArrowUpRight, ArrowDownRight 
} from 'lucide-react';

const Insights = () => {
  const { transactions } = useFinance();

  const analysis = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    // const income = transactions.filter(t => t.type === 'income');

    // 1. Highest Spending Category
    const categoryTotals = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});
    
    const topCategory = Object.entries(categoryTotals)
      .sort(([, a], [, b]) => b - a)[0] || ["None", 0];

    // 2. Monthly Comparison (Current vs Last Month)
    const currentMonth = new Date().getMonth();
    const currentMonthExp = expenses
      .filter(t => new Date(t.date).getMonth() === currentMonth)
      .reduce((acc, curr) => acc + curr.amount, 0);

    const lastMonthExp = expenses
      .filter(t => new Date(t.date).getMonth() === currentMonth - 1)
      .reduce((acc, curr) => acc + curr.amount, 0);

    const expChange = lastMonthExp === 0 ? 0 : ((currentMonthExp - lastMonthExp) / lastMonthExp) * 100;

    // 3. Average Transaction Value
    const avgExpense = expenses.length > 0 
      ? (expenses.reduce((acc, curr) => acc + curr.amount, 0) / expenses.length).toFixed(2)
      : 0;

    return { topCategory, currentMonthExp, lastMonthExp, expChange, avgExpense };
  }, [transactions]);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-amber-500/20 rounded-lg text-amber-500">
          <Lightbulb size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold  ">Smart Insights</h2>
          <p className="text-slate-500 text-sm">AI-powered analysis of your spending habits</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. HIGHEST SPENDING CATEGORY */}
        <div className="p-6   border border-slate-800 rounded-3xl shadow-xl hover:border-amber-500/30 transition-all">
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-400 font-medium text-sm uppercase tracking-wider">Top Spending</span>
            <Target className="text-amber-500" size={20} />
          </div>
          <h3 className="text-3xl font-black  ">{analysis.topCategory[0]}</h3>
          <p className="text-slate-500 mt-2">
            You've spent <span className="  font-bold">₹{analysis.topCategory[1].toLocaleString()}</span> in this category.
          </p>
          <div className="mt-4 h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 w-[70%]"></div>
          </div>
        </div>

        {/* 2. MONTHLY COMPARISON */}
        <div className="p-6   border border-slate-800 rounded-3xl shadow-xl hover:border-blue-500/30 transition-all">
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-400 font-medium text-sm uppercase tracking-wider">Monthly Trend</span>
            {analysis.expChange > 0 ? <TrendingUp className="text-rose-500" size={20} /> : <TrendingDown className="text-emerald-500" size={20} />}
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-black  ">{Math.abs(analysis.expChange).toFixed(1)}%</h3>
            <span className={analysis.expChange > 0 ? "text-rose-500" : "text-emerald-500"}>
              {analysis.expChange > 0 ? "higher" : "lower"} than last month
            </span>
          </div>
          <p className="text-slate-500 mt-2 font-medium">
             Current: ₹{analysis.currentMonthExp.toLocaleString()} | Previous: ₹{analysis.lastMonthExp.toLocaleString()}
          </p>
        </div>

      </div>

      {/* 3. OBSERVATIONS SECTION */}
      <div className="  border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
         <div className="absolute right-0 top-0 p-10 opacity-5">
            <Award size={150} />
         </div>
         
         <h3 className="  font-bold text-lg mb-6 flex items-center gap-2">
           <AlertCircle size={20} className="text-blue-400" />
           Useful Observations
         </h3>

         <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-2xl border border-slate-700/50">
               <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 mt-1">
                  <ArrowDownRight size={18} />
               </div>
               <div>
                  <p className="  font-semibold">Average Transaction</p>
                  <p className="text-slate-400 text-sm">Your typical expense is around <span className="text-emerald-400 font-bold">₹{analysis.avgExpense}</span>. Keep it below this to save more.</p>
               </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-2xl border border-slate-700/50">
               <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400 mt-1">
                  <ArrowUpRight size={18} />
               </div>
               <div>
                  <p className="  font-semibold">Savings Potential</p>
                  <p className="text-slate-400 text-sm">If you reduce your <span className="text-amber-500 font-bold">{analysis.topCategory[0]}</span> spending by 10%, you could save <span className=" ">₹{(analysis.topCategory[1] * 0.1).toFixed(0)}</span> next month.</p>
               </div>
            </div>
         </div>
      </div>

    </div>
  );
};

export default Insights;