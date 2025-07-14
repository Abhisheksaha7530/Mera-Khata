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

#Image
<img width="1919" height="971" alt="Screenshot 2025-07-08 174308" src="https://github.com/user-attachments/assets/eb93d810-9613-467d-b42c-debe68140cf1" />
<img width="1914" height="917" alt="Screenshot 2025-07-08 174340" src="https://github.com/user-attachments/assets/240c2f1e-ef1b-4e6b-ba2e-c8232ddd9cd3" />
<img width="1918" height="913" alt="Screenshot 2025-07-08 174357" src="https://github.com/user-attachments/assets/dc4bc73b-8829-4b4d-a547-6e1df9006403" />
<img width="1919" height="876" alt="Screenshot 2025-07-08 212743" src="https://github.com/user-attachments/assets/f6170d67-95b9-4652-86c1-54f1ba342877" />
<img width="1919" height="799" alt="Screenshot 2025-07-08 212705" src="https://github.com/user-attachments/assets/52f485fb-b81a-44f2-beb8-661a13dbebe5" />
<img width="1919" height="921" alt="Screenshot 2025-07-08 212956" src="https://github.com/user-attachments/assets/b181cbdc-ef77-4b82-af11-be3fd2cf9a1a" />
<img width="1033" height="466" alt="image" src="https://github.com/user-attachments/assets/17ec070c-d4ea-4935-af6c-aa2170887cd4" />


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
