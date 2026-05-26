# Task 1- Basic React Application 
**Folder:** `mainflow-frontend/`


## Setup
Build using vite bundler 

## File Structure

```
mern-tasks/
├── mainflow-frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── component/
│   │   │   └── StudentProfile.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
├── .gitignore
└── readme.md
```

# What I Built
A StudentProfileCard component that displays the student name, branch and college with follow and unfollow button using 
use state and displays multiple profile of student using props 

### What I covered and Learned
- Component based rendering 
- Props for passing data from parent to child 
- useState for controlling the state of UI like follow and unfollow button 
- Hot Reloading using vite dev server , command use npm run dev
- Understood File Structure 

### How to Run 
cd mainflow-frontend
npm install 
npm run dev