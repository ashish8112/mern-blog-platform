# MERN Blog Platform

A full-stack blogging platform designed using MongoDB, Express.js, React.js and Node.js.  
Users can register, login, write posts, like, comment and manage their content.

Built as part of my internship at **Main Flow Services and Technologies Pvt. Ltd.**

---

## Tech Stack

- **Frontend:** React (Vite), React Router v6, Axios
- **Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose
- **Auth:** JWT + bcryptjs
- **API Testing:** Postman

---

## Features

- Register / Login with JWT authentication
- Create, read, update, delete blog posts
- Like / Unlike toggle on posts
- Comment on posts
- Dashboard — view your own posts
- Protected routes — only logged in users can create/edit/delete
- Author name via populate (not just IDs)
- Axios interceptor — auto token attachment on every request

---

## Folder Structure

```
project1-blog/
├── backend/
│   ├── config/db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Comment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   └── commentRoutes.js
│   ├── middleware/authMiddleware.js
│   ├── server.js
│   └── .env
├── blog-frontend/
│   ├── src/
│   │   ├── api/axios.js
│   │   ├── context/AuthContext.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   ├── PostDetail.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
```

---

## How to Run

**Backend:**
```bash
cd project1-blog/backend
npm install
npm run dev
```

**Frontend:**
```bash
cd project1-blog/blog-frontend
npm install
npm run dev
```

Backend runs on `http://localhost:3000`  
Frontend runs on `http://localhost:5000`

---

## API Endpoints

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login + get JWT |
| GET | /api/auth/users | Get all users (protected) |
| GET | /api/auth/user/:id | Get user by ID |
| PUT | /api/auth/user/:id | Update bio/avatar (protected) |
| DELETE | /api/auth/user/:id | Delete account (protected) |

### Posts
| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/posts | Get all posts |
| POST | /api/posts | Create post (protected) |
| GET | /api/posts/my/posts | Get my posts (protected) |
| GET | /api/posts/:id | Get single post |
| PUT | /api/posts/:id | Update post (protected, author only) |
| DELETE | /api/posts/:id | Delete post (protected, author only) |
| POST | /api/posts/:id/like | Toggle like (protected) |

### Comments
| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/comments/:postId | Get comments for a post |
| POST | /api/comments/:postId | Add comment (protected) |
| DELETE | /api/comments/:id | Delete comment (protected, author only) |

---

## What I Learned During Development

- Connecting React frontend to Express backend
- JWT auth flow register, login, token storage, protected routes
- Mongoose populate for replacing ObjectIds with actual data for author name
- Axios interceptors for automatic token attachment of jwt as header
- MongoDB operators  $addToSet, $pull for array operations like Magic Array
- AuthContext for global state management across components 
- Ownership checks  only authors can edit/delete their own content in backend routes

---

## Developer

**Ashish Kumar Shukla**  
MCA — Kristu Jayanti University, Bengaluru  
BCA Gold Medalist | MERN Stack Developer

- GitHub: [ashish8112](https://github.com/ashish8112)
- LinkedIn: [ashish-shukla81](https://www.linkedin.com/in/ashish-shukla81/)
- LeetCode: [ashish-shukla81](https://leetcode.com/u/ashish-shukla81/)
