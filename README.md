# Quizzy AI-Powered Quiz Web App

An interactive quiz platform that generates personalized quizzes using **Google Gemini AI** and tracks your progress using **MongoDB**.  
Features modern UI with **Tailwind CSS v4, shadcn/ui, Framer Motion**, and full quiz analytics in the **Dashboard**.

---

## Live Demo  
 **link:** (https://quizzy-ai-powered-quizes.vercel.app/)



---

## Features

| Category | Highlights |
|---------|------------|
| Authentication | JWT login & signup using Passport.js |
| AI Quiz Generation | Gemini 2.5 Flash generates 5 MCQs per topic |
| AI Feedback | Personalized feedback based on score |
| Dashboard | History, charts, progress analytics |
| Database | Stores all quiz attempts |
| UI/UX | shadcn/ui + Tailwind v4 + Framer Motion |
| Notifications | Toast alerts for all actions |
| Responsive | Mobile-friendly with hamburger navigation |

---

## Tech Stack

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

## Project Structure

```
AI-Powered-Quiz/
├── backend/
│   ├── src/
│   ├── package.json
│   ├── .env.example
├── frontend/
│   ├── src/
│   ├── package.json
├── README.md
```
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

---

## Screenshots

### Dashboard Example

<img width="1920" height="1080" alt="{E4A017CB-E5F4-4395-8456-130BA333ABA0}" src="https://github.com/user-attachments/assets/0464909c-351c-4074-a7c1-1b02d43494d4" />

<img width="1883" height="602" alt="{1EBE134B-47B7-4B2C-986C-2D35C1003596}" src="https://github.com/user-attachments/assets/a96ff52a-57ec-4a49-ac08-d79d09e11a73" />



### Quiz Generation Example

<img width="1920" height="1080" alt="{39BECEF2-D2B3-442F-84DB-FC829C61B45E}" src="https://github.com/user-attachments/assets/36b662f2-42fb-4b01-9eb1-32b596c7b321" />
<img width="1920" height="1080" alt="{5EBA5AE3-5918-424E-B281-B25364874009}" src="https://github.com/user-attachments/assets/6761039c-8dae-43ab-94f9-7428db1d9e62" />
<img width="1920" height="1080" alt="{D3A88FDA-8ED6-43C1-8708-166D522C31F9}" src="https://github.com/user-attachments/assets/c0e2235f-ad95-4e40-98b5-032bb885e54f" />
<img width="1920" height="1080" alt="{C93D74E3-6969-408C-B450-A37D7823E8AF}" src="https://github.com/user-attachments/assets/922f895f-d470-4690-bacd-e4d7425935d4" />




### API Response

<img width="1920" height="1080" alt="{F20745C7-6F20-407D-91BF-84056C31D53B}" src="https://github.com/user-attachments/assets/398479b9-8453-4afb-a1d6-ac8d39b4217b" />


---





