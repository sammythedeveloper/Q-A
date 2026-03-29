# 🚀 Stacky

Stacky is a robust, full-stack web application built with **Javascript**, **Express**, and **MySQL**. It features a modern architecture designed for scalability, leveraging **Aiven Cloud** for database management and **Railway** for seamless backend deployment.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)
![PRs-Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

## 🌟 Features

- **Full-Stack Integration:** Seamless communication between a Javascript frontend and an Express.js backend.
- **Cloud Database:** Powered by Aiven MySQL with SSL encryption and optimized connection pooling.
- **Secure Authentication:** JWT-based user sessions and secure password hashing.
- **Modern UI/UX:** Responsive design built for a smooth user experience.
- **Automated Deployment:** CI/CD pipeline integrated with Railway and Vercel.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React, Tailwind CSS & Framer libraries  |
| **Backend** | [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/) |
| **Database** | [MySQL](https://www.mysql.com/) via [Aiven](https://aiven.io/) |
| **Deployment** | [Railway](https://railway.app/) (Backend), [Vercel](https://vercel.com/) (Frontend) |
| **ORM/Query** | `mysql2` with Promise-based pooling |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- Aiven Cloud Account (MySQL Service)
- Git

### 2. Installation
Clone the repository and install dependencies for both client and server.

```bash
git clone [https://github.com/sammythedeveloper/stacky.git](https://github.com/sammythedeveloper/stacky.git)
cd stacky

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
