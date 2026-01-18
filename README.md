# 🎟️ EventHorizon Backend

EventHorizon is a **ticketing and event management platform**.  
The backend is built with **Express.js** and provides APIs for authentication, event creation, ticket sales, payments, and refunds.  

It powers the frontend (React + Vite) and handles all core business logic securely and efficiently.

---

## ✨ Features

- 👤 **User Accounts**
  - User registration with email + password
  - Role-based access (User / Admin)
  - Organizer role can be assigned manually by admins for future use
  - OTP verification for security

- 🔐 **Authentication**
  - JWT-based login & protected routes
  - Password reset with OTP
****
- 🎟️ **Event Management**
  - Organizers can create, update, and manage events
  - Tickets with types (General, VIP, Premium)
  - - Automatic event status tracking (isOutdated flag for past events)
  - Refund system (no refunds within 14 days of an event)

- 💳 **Payments**
  - Paystack integration (test mode ready)
  - Payment verification
  - Support for ticket purchase transactions
  -  Automatic prevention of ticket purchases for outdated events

- ☁️ **Media Handling**
  - Multer for file uploads
  - Cloudinary for image storage (event banners, profile images)
  - Support for multiple event images (up to 5 per event)

- 📧 **Email & Notifications**
  - Nodemailer for sending OTPs
  - Handlebars templates for email content

- 🕒 **Automations**
  - Node-cron for scheduled tasks (reminders, cleanups, etc.)
  - Automatic event status updates based on event dates

---

## 🛠 Tech Stack

- **Server**: [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)  
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)  
- **Authentication**: [JWT](https://jwt.io/) + [bcrypt](https://www.npmjs.com/package/bcrypt)  
- **File Uploads**: [Multer](https://github.com/expressjs/multer) + [Cloudinary](https://cloudinary.com/)  
- **Payments**: [Paystack](https://paystack.com/) API  
- **Email Service**: [Nodemailer](https://nodemailer.com/) + Handlebars templates  
- **Scheduling**: [Node-cron](https://github.com/node-cron/node-cron)  

---

## 📂 Project Structure

## 📂 Project Structure

```bash
.
├── .vercel/              # Vercel deployment files
├── api/                  # Vercel serverless functions
├── node_modules/         # Dependencies
├── src/
│   ├── config/           # DB, Cloudinary, Paystack, etc.
│   ├── lib/              # Reusable libraries
│   ├── middlewares/      # Custom Express middlewares
│   ├── templates/        # Email templates (handlebars)
│   ├── utils/            # Helpers (email, token, error handling, etc.)
│   └── v1/
│       ├── controllers/  # Business logic for routes
│       ├── models/       # Mongoose schemas (User, Event, Ticket, etc.)
│       ├── routes/       # Express routes
│       ├── services/     # Service layer (auth, payment, etc.)
│       ├── tests/        # Unit/integration tests
│       └── validators/   # Request validation schemas
├── uploads/              # Uploaded files (temp storage before Cloudinary)
├── .env                  # Environment variables
├── .gitignore            # Git ignore rules
├── app.js                # Main Express app
├── babel.config.cjs      # Babel config
├── migration.js          # Database migrations/seeding
├── package.json          # Dependencies & scripts
├── package-lock.json     # Dependency lock file
├── README.md             # Documentation
├── test-db.js            # DB connection test script
└── vercel.json           # Vercel deployment config
          # Documentation

```

## ⚙️ Installation & Setup

### 🔽 Clone the repository
```bash
git clone https://github.com/tmeechh/Ticketing-App-BE.git
```

### 📦 Install dependencies
```bash
npm install
```


## ⚙️ Environment Variables

Create a `.env` file in the root of your project and add the following variables:

| **Variable**             | **Description**                                          | **Example**                           |
|---------------------------|----------------------------------------------------------|---------------------------------------|
| `NODE_ENV`                | Environment mode (`development` or `production`)         | `development`                         |
| `JWT_SECRET`              | Secret key for signing JWT tokens                        | `supersecretkey`                      |
| `JWT_LIFETIME`            | Duration for JWT validity                                | `7d`                                  |
| `DB_URI`                  | MongoDB connection string                                | `mongodb://localhost:27017/event-db`  |
| `MAIL_HOST`               | SMTP host for sending emails                             | `smtp.gmail.com`                      |
| `MAIL_PORT`               | SMTP port (usually 465 for SSL or 587 for TLS)           | `465`                                 |
| `MAIL_SECURE`             | Whether to use SSL/TLS (`true` or `false`)               | `true`                                |
| `MAIL_FROM`               | Default sender email address                             | `noreply@eventhorizon.com`            |
| `BREVO_EMAIL`             | Brevo (Sendinblue) email account                         | `you@example.com`                     |
| `BREVO_PASSWORD`          | Brevo (Sendinblue) account password or API key           | `your-brevo-password`                 |
| `CLOUDINARY_NAME`         | Cloudinary account name                                  | `your-cloud-name`                     |
| `CLOUDINARY_API_KEY`      | Cloudinary API key                                       | `1234567890abcdef`                    |
| `CLOUDINARY_API_SECRET`   | Cloudinary API secret                                    | `abcdef1234567890`                    |
| `PAYSTACK_SECRET_KEY`     | Paystack secret key for payments                         | `sk_test_xxxxxxxxxxxxxx`              |
| `PAYSTACK_PUBLIC_KEY`     | Paystack public key for frontend transactions            | `pk_test_xxxxxxxxxxxxxx`              |



### 🛠 Run in Development
```bash
npm run dev
```


- Server will start locally at:
👉 http://localhost:5000/api/v1

👉 In production (deployment), the base URL will depend on your hosting provider (e.g., Vercel or Render).





## 🚀 Deployment

This backend is deployable on:

- Vercel (serverless) with serverless-http

- Render / Railway / Heroku for full Express hosting

- MongoDB Atlas for cloud DB

## 👨‍💻 Contributing

1. Fork repo

2. Create feature branch (git checkout -b feature/amazing-feature)

3. Commit changes (git commit -m 'Add amazing feature')

4. Push branch (git push origin feature/amazing-feature)

5. Open PR 🎉

## 📜 License

This project is licensed under the MIT License.

🔥 EventHorizon Backend – Secure, Scalable, and Built for the Future.