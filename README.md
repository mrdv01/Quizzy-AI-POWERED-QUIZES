# Quizzy AI-Powered Quiz Web App

An interactive quiz platform that generates personalized quizzes using **Google Gemini AI** and tracks your progress using **MongoDB**.  
Features modern UI with **Tailwind CSS v4, shadcn/ui, Framer Motion**, and full quiz analytics in the **Dashboard**.

---

## 🌍 Live Demo  
🔗 **Frontend:** _add deployed link here_  
🔗 **Backend API:** _add deployed link here_


---

## ✨ Features

| Category | Highlights |
|---------|------------|
| 🔐 Authentication | JWT login & signup using Passport.js |
| 🤖 AI Quiz Generation | Gemini 2.5 Flash generates 5 MCQs per topic |
| 🧠 AI Feedback | Personalized feedback based on score |
| 📊 Dashboard | History, charts, progress analytics |
| 💾 Database | Stores all quiz attempts |
| 💎 UI/UX | shadcn/ui + Tailwind v4 + Framer Motion |
| 🔔 Notifications | Toast alerts for all actions |
| 📱 Responsive | Mobile-friendly with hamburger navigation |

---

## 🖥️ Tech Stack

### **Frontend**
- React + TypeScript  
- React Router  
- Tailwind CSS v4  
- shadcn/ui  
- Framer Motion  
- Recharts  
- Sonner Toast  

### **Backend**
- Node.js + Express  
- MongoDB + Mongoose  
- JWT Authentication (Passport.js)  
- Google Gemini AI SDK (`@google/genai`)  

---

## 📁 Project Structure


---

## ⚙️ Installation & Setup

### **Clone Repository**
```bash
git clone https://github.com/<your-username>/AI-Powered-Quiz.git
cd AI-Powered-Quiz
cd backend
npm install
cp .env.example .env   # update values manually
npm run dev
```
###  **.env**
```bash
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

---
## Backend runs on
```
http://localhost:5000
```

## ⚙️ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

## If your backend URL is different, update:
```
src/services/api.ts → BASE_URL
```





