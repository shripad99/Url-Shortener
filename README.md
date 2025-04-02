# URL Shortener

## Overview
This is a full-stack URL Shortener application that allows users to shorten long URLs, generate QR codes, and track visit statistics. The project includes authentication, a dashboard, and a user-friendly interface.

## Features
- **User Authentication** (JWT-based login/signup)
- **URL Shortening**
- **QR Code Generation**
- **Visit Tracking & Analytics**
- **Responsive Dashboard** with usage statistics

## Tech Stack
### Frontend
- React (with TypeScript)
- Tailwind CSS
- ShadCN UI
- React Router

### Backend
- Node.js with Express
- MongoDB (via Mongoose)
- JSON Web Tokens (JWT) for authentication

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v18+ recommended)
- **MongoDB** (Local or Atlas)

## Usage
1. **Sign up** for an account.
2. **Log in** to access the dashboard.
3. **Shorten a URL** by pasting it into the input field.
4. **Generate a QR Code** for easy sharing.
5. **Track visits** and analytics for each shortened URL.

## API Routes
### Auth Routes
- `POST /create-account` → Create a new user
- `POST /auth/login` → Log in and get JWT token

### URL Routes
- `POST /shorten` → Shorten a URL
- `GET /:shortId` → Redirect to original URL
- `GET /stats/:shortId` → Get visit stats

## License
This project is open-source and available under the **MIT License**.

## Contact
For any queries, reach out to:
- **Email**: your-email@example.com
- **GitHub**: [your-username](https://github.com/your-username)

