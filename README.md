\# Pluto 💸



Pluto is a full-stack personal expense tracker designed to help users

understand where their money goes and keep track of their income,

expenses, savings, and spending patterns.



\## ✨ Features



\- 🔐 User registration and login

\- 🔑 JWT-based authentication

\- 💰 Add and track income

\- 💸 Add and track expenses

\- 📊 Spending overview

\- 🏷️ Category-wise spending

\- 🧾 Recent transactions

\- 💵 Automatic savings calculation

\- 🔔 Success notifications

\- 📱 Responsive dashboard



\## 🛠️ Tech Stack



\### Frontend



\- React

\- Vite

\- React Router

\- CSS



\### Backend



\- Node.js

\- Express.js

\- JWT

\- bcrypt



\### Database



\- PostgreSQL

\- Prisma ORM



\## 🏗️ Project Structure



```text

pluto-expense-tracker/

│

├── backend/

│   ├── middleware/

│   ├── prisma/

│   │   ├── migrations/

│   │   └── schema.prisma

│   ├── server.js

│   └── package.json

│

├── frontend/

│   ├── public/

│   ├── src/

│   │   ├── components/

│   │   ├── pages/

│   │   ├── App.jsx

│   │   └── index.css

│   └── package.json

│

├── .gitignore

└── README.md

🔐 Authentication



Pluto uses JWT-based authentication.



When a user logs in successfully, the backend generates a JWT.

The frontend stores the token and sends it with protected API requests.



Protected routes verify the token before allowing access to user data.



🗄️ Database



Pluto uses PostgreSQL with Prisma ORM.



The current database includes:



Users

Expenses

Income



Expenses and income are associated with the authenticated user.



🚀 Running Locally

1\. Clone the repository

git clone https://github.com/raabiya2025/pluto-expense-tracker.git

cd pluto-expense-tracker

2\. Start the backend

cd backend

npm install



Create a .env file containing your local database connection

and JWT secret.



Then run:



node --experimental-strip-types server.js



The backend runs on:



http://localhost:5000

3\. Start the frontend



Open another terminal:



cd frontend

npm install

npm run dev



The frontend runs on:



http://localhost:5173

📌 Current Status



Pluto is actively being developed as a learning and portfolio project.



The project is being built incrementally with a focus on understanding

full-stack development, authentication, databases, APIs, and frontend

architecture.



🔮 Future Improvements

Expense editing and deletion

Income editing and deletion

More detailed analytics

Budget tracking

Monthly financial reports

Improved mobile experience

Deployment

Additional financial insights

👩‍💻 Author



Rabiya Nida



Built as a full-stack learning and portfolio project.





Save the file and close Notepad.



\### Step 2 — Check Git



Now run:



```powershell

git status

