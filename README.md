# 📘 Open Library Management System – Frontend

A clean and responsive frontend interface for a **Library Management System**, developed using modern web technologies:

- ⚛️ **React** with **TypeScript**
- 📦 **Redux Toolkit** and **RTK Query** for state management and data fetching
- 🎨 **Tailwind CSS** with **ShadCN UI** for component styling
- 🔔 **React Hot Toast** for real-time notifications
- 💡 Optimistic UI support _(upcoming feature)_

This application enables users to browse and manage a collection of books and handle borrowing functionalities efficiently.

---

## 🌐 Live Application

🔗 **Frontend**: [View Live Site](https://open-library-managment.vercel.app/)  
🔗 **Backend**: [Live API Endpoint](https://lmsbackendapi.vercel.app)

---

## 📂 Related Repository

- **Backend Source Code**: [GitHub – lms-backend](https://github.com/rashedul-dev/lms-backend)

---

## ✨ Core Features

### 📚 Book Management

- Create, update, delete and view books
- Filter by genre
- Responsive UI with loading and error handling
- custom pagination to load the books

### 📝 Borrowing System

- Specify quantity and due date when borrowing
- Validation for available quantity
- Auto-disable books with no copies available
- Redirects to a borrow summary upon successful borrow

### 📊 Borrow Summary

- Displays a summary of all borrowed books
- Shows ISBN, title, and total borrowed quantity
- disallow duplicate ISBNs

> ✅ This project is **publicly accessible** and does not require authentication.

---

## 🛠 Technology Stack

| Layer       | Tools                                      |
| ----------- | ------------------------------------------ |
| **UI**      | React, TypeScript, Tailwind CSS, ShadCN UI |
| **State**   | Redux Toolkit, RTK Query                   |
| **Forms**   | React Hook Form                            |
| **UX**      | React Hot Toast                            |
| **Routing** | React Router v7                            |
| **Bundler** | Vite                                       |

---

## 📦 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/rashedul-dev/library-frontend.git
cd library-frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run build
```

> ⚠️ Ensure your backend API is running at `http://localhost:5000` for local development.

---

## 🗂 Project Structure

```bash
src/
├── components/        # Shared UI components
├── pages/             # Application views (Books, Add Book, Borrow Summary)
├── redux/             # RTK slices, API configurations
├── routes/            # Route definitions
├── types/             # Shared TypeScript interfaces/types
└── lib/               # Utility functions and helpers
```

---

## 🔭 Planned Enhancements

- 🔄 **Optimistic UI** updates during borrowing and editing
- 🔍 **Search functionality** by title or author
- 📅 **Due date tracker** to flag overdue books
- 🔐 **Authentication & Authorization** for admin-level access
- 📘 **Borrow history** with timestamp logs
- 📈 **Dashboard view** for metrics (e.g., most borrowed books)
- 🚫 **Custom 404 Page**
