# 🚀 Challenge-Project-Ecommerce

A **NestJS + Prisma + PostgreSQL** backend API for managing **products**, **orders**, and **admin operations** in an e-commerce system.

## 📌 Features
- ✅ **NestJS Framework** with modular architecture
- ✅ **PostgreSQL** database with Prisma ORM
- ✅ **Swagger API Documentation**
- ✅ **Docker support** for easy deployment
- ✅ **Unit & Integration Testing** using Jest
- ✅ **Prettier & ESLint** for code formatting and linting

---

## 🌱 Database Seeding

### **Run Seed Script**
To populate the database with initial data (such as creating an admin user), run:

```sh
npm run prisma:seed
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Generate Prisma schema
```sh
npx prisma generate
```

### 3️⃣ Setup Environment Variables
Create a `.env` file from `.env.sample`:
```sh
cp .env.sample .env
```
And then fill the `.env` file with appropriate values. Env file is available in 1password project valut.

### 4️⃣ Run locally with Docker
To run the **NestJS backend and PostgreSQL** in Docker:
```sh
docker-compose -f docker-compose.local.yml up --build -d
```
This starts:
- **NestJS App** on `http://localhost:3000`
- **PostgreSQL Database** on `localhost:5432`

For local development, the NestJS application container will pick up any changes within your local `./src` directory and restart teh server.
If you change any values outside of that directory, you need to rebuild the container with the command above.

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
