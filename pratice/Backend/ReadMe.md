
# Backend API Project

## Overview
A social media backend API built with Node.js and MongoDB featuring user authentication, posts, likes, follows, and friend management.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (via auth middleware)

## Project Structure
```
src/
├── config/       # Database configuration
├── controllers/  # Business logic
├── middlewares/  # Auth & validation
├── models/       # MongoDB schemas
└── routes/       # API endpoints
```

## Features
- User Authentication (Register, Login)
- Create & manage Posts
- Like/Unlike Posts
- Follow/Unfollow Users
- Friend Requests & Management

## Key NPM Packages
*(Check package.json for versions)*
- express
- mongoose
- dotenv
- jsonwebtoken
- bcryptjs

## MongoDB Models
- User
- Post
- Like
- Follow
- Friend
- FriendRequest

## API Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /post` - Create post
- `GET /post` - Get posts
- `POST /like` - Like post
- `POST /follow` - Follow user
- `POST /friend` - Friend request

## Setup
1. Configure `.env` file
2. `npm install`
3. `npm start`
