import { createContext, useContext, useEffect, useState } from "react";
import { mockTransactions } from "../data/Mockdata";

const FinanceContext = createContext();

export const useFinance = () => {
    const context = useContext(FinanceContext);
    if (!context) {
        throw new Error('useFinance must be used within a FinanceProvider');
    }
    return context;
};

export const FinanceProvider = ({ children }) => {
    //Dark Mode initialization from LocalStorage
    const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
        return savedMode ? JSON.parse(savedMode) : false;
    });

    const [role, setRole] = useState("admin");

    //Transactions initialization from LocalStorage or MockData
    const [transactions, setTransactions] = useState(() => {
        const savedTransactions = localStorage.getItem("transactions");
        return savedTransactions ? JSON.parse(savedTransactions) : mockTransactions;
    });


    // delete Function
    const deleteTransaction = (id) => {
        setTransactions((prev) => prev.filter(t => t.id !== id));
    };

    // update Function
    const updateTransaction = (updatedEntry) => {
        setTransactions((prev) => 
            prev.map(t => t.id === updatedEntry.id ? updatedEntry : t)
        );
    };

    // Naya transaction add karne ka function
    const addTransaction = (newEntry) => {
        setTransactions((prev) => [newEntry, ...prev]);
    };

    //to update transaction data in local storage 
    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    //Jab bhi darkMode badle, LocalStorage aur Class update karne ke liye 
    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <FinanceContext.Provider value={{ 
            darkMode, 
            setDarkMode, 
            role, 
            setRole, 
            transactions, 
            addTransaction 
        ,deleteTransaction, updateTransaction
        }}>
            {children}
        </FinanceContext.Provider>
    );
};