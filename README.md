# 💼 Mera Khata - Digital Ledger Management System

**Mera Khata** is a MERN stack web application that helps individuals and small businesses manage digital ledgers. Inspired by traditional khata notebooks, this system provides an intuitive and secure platform to manage dues, transactions, and account records efficiently.

---

## 🚀 Features

- 🔐 Secure user registration and login (JWT Auth)
- 📊 Real-time dashboard to track entries
- 💸 Add, edit, and manage dues
- 🧾 Maintain and update ledger entries
- 📬 Email integration for password reset
- ⚡ Modern responsive UI built with Vite + React

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router
- CSS / Tailwind

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)

### Utilities & Auth
- JWT (JSON Web Token)
- Bcrypt.js (password hashing)
- Nodemailer (email service)

---

## 📁 Project Structure

Mera-Khata/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/ # Navbar, Login, Register, Dashboard, Dues
│ │ ├── pages/
│ │ ├── App.jsx, main.jsx
│ └── vite.config.js

├── server/ # Node.js backend
│ ├── models/ # User.js, Entry.js
│ ├── routes/ # auth.js, entries.js
│ ├── middleware/ # auth.js
│ ├── utils/ # sendEmail.js
│ ├── index.js
│ └── .env

---

## ⚙️ Getting Started

### ✅ Prerequisites

- Node.js v18+
- MongoDB (Local or Atlas)

### 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/Abhisheksaha7530/Mera-Khata.git
cd Mera-Khata

# Install Dependencies
# Frontend
cd client
npm install

# Backend
cd ../server
npm install

#Environment Setup
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000

#Run the Application
# Start backend server
cd server
npm start

# Start frontend in a separate terminal
cd client
npm run dev

# Contact
Created by Abhishek Saha – feel free to reach out or contribute..


## 📄 License

This project is licensed under the [MIT License](LICENSE).
