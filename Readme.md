 # Portfolio Application

A full-stack portfolio website built with React (Frontend) and Express.js (Backend). This application showcases personal projects, skills, experience, and testimonials with beautiful animations and a modern design.

## 🏗️ Project Structure

```
PORTFOLIO APP/
├── backend/                    # Express.js Backend API
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controllers/           # Route controllers
│   │   ├── contact.controller.js
│   │   ├── profile.controller.js
│   │   ├── project.controller.js
│   │   ├── skill.controller.js
│   │   └── testimonial.controller.js
│   ├── middleware/            # Custom middleware
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   ├── models/                # Mongoose models
│   │   ├── Contact.model.js
│   │   ├── Profile.model.js
│   │   ├── Project.model.js
│   │   ├── Skill.model.js
│   │   └── Testimonial.model.js
│   ├── routes/                # API routes
│   │   ├── contact.routes.js
│   │   ├── profile.routes.js
│   │   ├── project.routes.js
│   │   ├── skill.routes.js
│   │   └── testimonial.routes.js
│   ├── utils/
│   │   └── sendEmail.js       # Email utility
│   ├── package.json
│   └── server.js              # Entry point
│
└── frontend/                   # React Frontend (Vite)
    ├── public/                 # Static assets
    ├── src/
    │   ├── assets/             # Images and media
    │   ├── components/         # Reusable components
    │   │   ├── CustomCursor.jsx
    │   │   ├── IntroAnimation.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── OverlayMenu.jsx
    │   │   └── ParticlesBackground.jsx
    │   ├── pages/              # Page components
    │   │   ├── About.jsx
    │   │   ├── Contact.jsx
    │   │   ├── Experience.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Home.jsx
    │   │   ├── Projects.jsx
    │   │   ├── Skills.jsx
    │   │   └── Testimonial.jsx
    │   ├── App.jsx             # Main app component
    │   ├── index.css           # Global styles
    │   └── main.jsx            # React entry point
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## 🚀 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer + Cloudinary
- **Email**: Nodemailer
- **CORS**: CORS middleware

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Icons**: React Icons
- **Email Service**: EmailJS

## 📋 Features

### Frontend Features
- **Custom Cursor**: Personalized mouse cursor effect
- **Intro Animation**: Engaging loading animation
- **Particles Background**: Interactive particle effects
- **Responsive Design**: Mobile-friendly layout
- **Smooth Scrolling**: Seamless navigation between sections
- **Contact Form**: Functional contact form with EmailJS
- **Project Showcase**: Display portfolio projects
- **Skills Display**: Visual skills representation
- **Experience Timeline**: Work experience display

### Backend Features
- **RESTful API**: Standard REST API design
- **CRUD Operations**: Full CRUD for all entities
- **Authentication**: Protected routes with JWT
- **Error Handling**: Centralized error middleware
- **Email Integration**: Send emails via Nodemailer

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```
bash
cd backend
```

2. Install dependencies:
```
bash
npm install
```

3. Create `.env` file in backend root:
```
env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

4. Start the backend server:
```
bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```
bash
cd frontend
```

2. Install dependencies:
```
bash
npm install
```

3. Start the development server:
```
bash
npm run dev
```

The frontend will run on `http://localhost:5173`

4. Build for production:
```
bash
npm run build
```

## 📡 API Endpoints

### Contact
- `POST /api/contact` - Submit contact form

### Profile
- `GET /api/profile` - Get profile data
- `POST /api/profile` - Create/update profile (protected)

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Add skill (protected)
- `DELETE /api/skills/:id` - Delete skill (protected)

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Add testimonial (protected)
- `DELETE /api/testimonials/:id` - Delete testimonial (protected)

## 🎨 Customization

### Adding Your Content
1. Update the MongoDB database with your profile, projects, skills, and testimonials
2. Modify the frontend components in `frontend/src/pages/` to reflect your information
3. Replace images in `frontend/src/assets/` with your own

### Styling
- Tailwind CSS is used for styling - modify `frontend/src/index.css` for custom styles
- Tailwind configuration is in `frontend/vite.config.js`

## 📄 License

ISC License

## 👤 Author

Your Name

## 🙏 Acknowledgments

- React Team
- Vite Team
- Tailwind CSS
- Framer Motion
