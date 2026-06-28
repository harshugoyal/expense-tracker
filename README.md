# 💰 Expense Tracker

A full-stack web application to track your daily expenses, built with Node.js, Express, MongoDB and EJS.

## 🌐 Live Demo
[Live Demo](https://expense-tracker-zvfs.onrender.com)

## ✨ Features

- 🔐 User authentication (Register/Login/Logout)
- ➕ Add, Edit and Delete expenses
- 📊 Pie chart showing spending by category
- 🔍 Search expenses by title
- 📅 Sort expenses by date
- 💾 Data stored per user — no one sees your expenses
- ⚡ Flash messages for success and error feedback
- 📱 Responsive design with Bootstrap

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Backend runtime |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| EJS | Templating engine |
| Bootstrap 5 | UI styling |
| Chart.js | Pie chart visualization |
| bcrypt | Password hashing |
| express-session | User sessions |
| connect-flash | Flash messages |
| dotenv | Environment variables |

## 📁 Project Structure
expense-tracker/

├── config/

│   └── db.js              # MongoDB connection

├── controllers/

│   ├── authController.js  # Register, Login, Logout

│   └── expenseController.js # CRUD operations

├── middleware/

│   └── auth.js            # Protected route middleware

├── models/

│   ├── user.js            # User schema

│   └── Expense.js         # Expense schema

├── routes/

│   ├── authRoutes.js      # Auth routes

│   └── expenseRoutes.js   # Expense routes

├── views/

│   ├── home.ejs           # Landing page

│   ├── register.ejs       # Register page

│   ├── login.ejs          # Login page

│   ├── index.ejs          # Dashboard

│   ├── addExpense.ejs     # Add expense form

│   └── editExpense.ejs    # Edit expense form

├── .env                   # Environment variables

├── .gitignore

├── app.js                 # Entry point

└── package.json

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account

### Installation

1. Clone the repository
```bash
git clone https://github.com/harshugoyal/expense-tracker.git
cd expense-tracker
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
PORT=3000
```

4. Run the app
```bash
node app.js
```

5. Open your browser and go to
http://localhost:3000

## 🔒 Security Features
- Passwords hashed with bcrypt
- Session-based authentication
- Protected routes with middleware
- Environment variables for sensitive data
- User-specific data — users can only see their own expenses

## 📝 API Routes

### Auth Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | /register | Show register form |
| POST | /register | Register new user |
| GET | /login | Show login form |
| POST | /login | Login user |
| GET | /logout | Logout user |

### Expense Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | /expenses/dashboard | Show all expenses |
| GET | /expenses/add | Show add form |
| POST | /expenses/add | Add new expense |
| GET | /expenses/edit/:id | Show edit form |
| POST | /expenses/edit/:id | Update expense |
| POST | /expenses/delete/:id | Delete expense |
| GET | /expenses/search | Search expenses |

## 👩‍💻 Author
**Harshita Goyal**
- GitHub: [@harshugoyal](https://github.com/harshugoyal)

## 📄 License
This project is open source and available under the MIT License.
