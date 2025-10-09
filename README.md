# Portfolio Builder

A secure, dynamic, and user-friendly Portfolio Frontend built with **Next.js, TypeScript and Tailwind CSS**.  
This project enables the portfolio owner to showcase blogs, projects, and personal information while providing a private dashboard for content management.

---

## Project Overview

The Portfolio Frontend enables:

- **Public Landing Pages**: Home, About Me, Projects Showcase, Blog Listing, and Contact sections.
- **Authentication & Role-based Access**: JWT-based login for portfolio owner (admin) to access the dashboard.
- **Dashboard**: Admin-only interface to create, edit, and delete blogs and projects.
- **Blog Management**: Dynamic blog listing with ISR for public viewing and detailed blog pages.
- **Project Showcase**: Display personal projects with images, descriptions, and live links.
- **Modern UI/UX**: Responsive design with Tailwind CSS, skeleton loaders, cards, smooth transitions, and toast notifications.
- **Notifications**: Success and error messages using **sweetalert2**.

---

## Technology Stack

### Frontend
- **Next.js** – Server-side rendering & static generation  
- **TypeScript** – Type-safe code  
- **Tailwind CSS** – Responsive and modern styling  
- **React.js** – Component-based UI  
- **react-hot-toast** – Notifications  
 
- **JWT** – Authentication handling  

### Backend (API)
- Node.js + Express.js – REST API  
- PostgreSQL + Prisma – Database  
- JWT + bcrypt – Authentication & security  
- **Backend Documentation:** [Portfolio Backend API Docs](https://github.com/mdmasharafilhossain/Portfolio-Builder-Server)  

 

---

## Features

✅ Public Pages: Home, About Me, Projects, Blog Listing, Blog Detail  
✅ Admin Dashboard: Create, update, delete blogs and projects  
✅ Incremental Static Regeneration (ISR) for dynamic content   
✅ Toast notifications for success/error messages  
✅ Responsive UI for all devices  
✅ Skeleton loaders and smooth UI transitions  

---

## Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/mdmasharafilhossain/Portfolio-Builder-Client.git
cd Portfolio-Builder-Client
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Create .env.local File
```bash
NEXT_PUBLIC_API_BASE_URL="backend api"
```
### 4️⃣ Start the Development Server
```bash
npm run dev
```
## Live URLs

- **Frontend:** [Portfolio Builder Live](https://portfolio-builder-client-rosy.vercel.app/)  
- **Backend:** [Portfolio Builder API](https://builder-portfolio-eta.vercel.app/)  

##  Author

**Mohammad Mashrafil Hossain Mahi**  
MERN Stack Developer

Email: mashrafilmahi007@gmail.com  

