# 🚀 Project Dapy Backend

A **NestJS + Prisma + PostgreSQL** backend API for managing Employers, Employees, and Admin operations.

---

## 📌 Features
- ✅ **NestJS Framework** with modular architecture
- ✅ **PostgreSQL** database with Prisma ORM
- ✅ **Swagger API Documentation**
- ✅ **Docker support** for easy deployment
- ✅ **Unit & Integration Testing** using Jest
- ✅ **Prettier & ESLint** for code formatting and linting

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/netguru/project-dapy-backend.git
cd project-dapy-backend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file from `.env.sample`:
```sh
cp .env.sample .env
```
Edit the `.env` file and configure:
```ini
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/dapydb
JWT_SECRET=your-secret-key
```

### 4️⃣ Run Database Migrations
```sh
npx prisma migrate dev --name init
```

### 5️⃣ Start the Server
```sh
npm run start:dev
```
The server will be available at `http://localhost:3000/`.

### 6️⃣ Access Swagger API Docs
Once running, access **Swagger API Docs** at:
```
http://localhost:3000/api
```

---

## 📦 Running with Docker
To run the **NestJS backend and PostgreSQL** in Docker:
```sh
docker-compose up --build -d
```
This starts:
- **NestJS App** on `http://localhost:3000`
- **PostgreSQL Database** on `localhost:5432`

---

## 🧪 Running Tests
### **Unit Tests**
```sh
npm run test:unit
```

### **Integration Tests**
```sh
npm run test:integration
```

### **Test Coverage**
```sh
npm run test:cov
```

---

## 🚀 Deployment
### **Build for Production**
```sh
npm run build
```
### **Run in Production**
```sh
npm run start:prod
```

---

## 📜 License
This project is **UNLICENSED**.

---

### **🔥 Developed with NestJS, Prisma & PostgreSQL**
🚀 **Happy coding!**
