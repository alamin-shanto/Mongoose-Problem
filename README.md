# 📚 Express + Mongoose Assignment

A simple library management backend built with **Express**, **TypeScript**, and **Mongoose**.  
This project demonstrates API design, database modeling, and error handling using modern Node.js best practices.

---

## 🚀 Features
- 📖 Manage books (add, list, update, delete)
- 👤 Borrow & return system
- 🗄 MongoDB integration with Mongoose
- 🛡 Error handling middleware
- 🌱 Environment variable support via `.env`

---

## 📂 Project Structure

```
┣ 📂.qodo
┣ 📂dist
┣ 📂src
┃ ┣ 📂controllers
┃ ┃ ┣ 📜bookController.ts
┃ ┃ ┗ 📜borrowController.ts
┃ ┣ 📂middleware
┃ ┃ ┗ 📜errorHandler.ts
┃ ┣ 📂models
┃ ┃ ┣ 📜Book.ts
┃ ┃ ┗ 📜Borrow.ts
┃ ┣ 📂routes
┃ ┃ ┣ 📜bookRoutes.ts
┃ ┃ ┗ 📜borrowRoutes.ts
┃ ┗ 📜index.ts
┣ 📜.env
┣ 📜.gitignore
┣ 📜package.json
┗ 📜tsconfig.json
```


---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```
git clone https://github.com/your-username/express-mongoose-assignment.git
cd express-mongoose-assignment
```
### 2️⃣ Install dependencies
```
npm install
```
### 3️⃣ Create a .env file in the project root
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/libraryDB
```

### 4️⃣ Run the project

For development (with auto-reload):
```
npm run dev
```
For production (build & run compiled JS):
```
npm run build
npm start
```

📡 API Endpoints
Books

- GET /api/books → List all books

- POST /api/books → Add new book

- PUT /api/books/:id → Update book

- DELETE /api/books/:id → Delete book

Borrow

- GET /api/borrow → List all borrow records

- POST /api/borrow → Borrow a book

- PUT /api/borrow/:id/return → Return a borrowed book

🛠 Tech Stack

- Node.js + Express – Web framework

- TypeScript – Type safety

- Mongoose – ODM for MongoDB

- dotenv – Environment variable management

📜 License

This project is licensed under the ISC License – feel free to use it for learning or extend it for your own projects.

👨‍💻 Author

Made by [Mohammad Al Amin](https://www.linkedin.com/in/mash02/)
