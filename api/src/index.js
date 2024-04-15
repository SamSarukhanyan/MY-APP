import express from "express";
import cors from "cors";
import db from "./models/index.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import localStrategy from 'passport-local'; 
import bcrypt from 'bcryptjs';

import { authenticateToken, authorizeAdmin } from './middleware/authMiddleware.js';


import adminRoutes from './routes/admin.js'
import productsRoutes from './routes/products.js'
import authRoutes from './routes/auth.js'
import addAdmin from "./controllers/addAdmin.js";
// import addAdmin from "./controllers/addAdmin.js";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Инициализация и настройка сессий
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Инициализация Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport.js local strategy
passport.use(new localStrategy(async (username, password, done) => {
  try {
    const user = await db.Admin.findOne({ where: { username } });
    if (!user) return done(null, false);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return done(null, false);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.Admin.findByPk(id);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

// Настройка маршрутов
app.use('/api', authRoutes);
app.use('/api/admin', authenticateToken, authorizeAdmin, adminRoutes);
app.use('/api', productsRoutes);

// addAdmin();

const PORT = process.env.DB_PORT || 3000;
app.listen(PORT, async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log(`Server is running on port ${PORT} `);
    
  } catch (error) {
    console.log(error);
  }
});
