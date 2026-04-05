Finance DashBoard 

Ye ek React-based project hai jo  income aur kharchon (expenses) ko track karne mein help karta hai. Maine ise kaafi clean aur modern banane ki koshish ki hai taaki koi bhi ise aasaani se use kar sake.

Main Features
Dashboard: Saara data ek jagah dikhta hai (Total Balance, Income, Expense).

Cool Charts: Maine Recharts use kiya hai monthly trends aur spending categories ko graph mein dekhne ke liye.

Easy Management: Aap naye transactions add kar sakte hain, purane delete kar sakte hain, aur unhe edit bhi kar sakte hain.

Admin Role: Maine ek simple logic lagaya hai jisme sirf "Admin" hi data change kar sakta hai.

CSV Download: Aap apni poori transaction list ko Excel/CSV file mein download kar sakte hain.

LocalStorage: Iska sabse bada fayda ye hai ki agar aap page refresh karenge, toh aapka data delete nahi hoga.

Tech I Used
React (Vite): Fast performance ke liye.

Tailwind CSS: Poori styling aur dark theme ke liye.

Context API: Taaki saara data components ke beech mein bina kisi problem ke flow kare.

Lucide-React: Sunder icons ke liye.

 How I Built This (My Logic)
State Management: Maine useContext ka use kiya taaki mujhe baar-baar data pass na karna pade.

Data Saving: Maine useEffect lagaya hai jo har change par data ko localStorage mein save kar deta hai.

Optimization: Dashboard par heavy calculations ke liye maine useMemo use kiya hai taaki app slow na ho.

Responsive: Maine ise mobile aur desktop dono ke liye adjust kiya hai.
