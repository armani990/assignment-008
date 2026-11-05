# SevaConnect – Community Service Platform

SevaConnect is a community service platform designed to bring people together through volunteering and meaningful social activities. The main idea behind this project is to make it easier for people to discover community events, participate in activities, and create opportunities to make a positive difference.

Users can explore upcoming events, join activities that interest them, and organize their own community events. The platform also allows users to manage the events they create and keep track of the events they have joined.

## Live Website

**Frontend:** https://communitycare-ten.vercel.app/

**Backend API:** https://assignment-008-server.vercel.app/

## Features

- **User Authentication:** Users can register and log in using email and password. Google authentication is also available.
- **Create Community Events:** Logged-in users can create events by providing a title, description, event category, image URL, location, and future date.
- **Explore Upcoming Events:** Everyone can browse upcoming community events and view their details without logging in.
- **Join Events:** Authenticated users can join events. The platform prevents users from joining the same event more than once.
- **Manage Personal Events:** Users can view, update, and delete only the events they have created.
- **Joined Events:** Users can see all the events they have joined, arranged by event date.
- **Profile Management:** Users can view and update their profile name and profile picture.
- **JWT Protected APIs:** Protected backend routes use JWT verification to authenticate users and control access to personal data.
- **Dark and Light Theme:** Users can switch between dark and light themes throughout the website.
- **Responsive Design:** The platform is designed to work on desktop, tablet, and mobile devices.

## Technologies Used

**Frontend**
- Next.js
- React
- Tailwind CSS
- Framer Motion
- Better Auth
- Lucide React
- React Hot Toast

**Backend**
- Node.js
- Express.js
- MongoDB Atlas
- MongoDB Native Driver
- Better Auth JWT Plugin
- JOSE
- CORS

## Getting Started

To run the frontend project locally:

1. Clone the repository.
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Configure the required environment variables in a `.env.local` file.
4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000` in your browser.

## Project Purpose

This project was built as part of an assignment to practice full-stack web development. Through SevaConnect, I worked with authentication, database operations, REST APIs, protected routes, JWT verification, and responsive UI development.

Building this project helped me understand how frontend and backend applications work together in a real-world application. It also gave me practical experience with managing user-specific data and implementing basic security for protected operations.

---

**SevaConnect – Small Actions, Big Community Impact.**