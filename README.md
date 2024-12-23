# Blackbox Portfolio

Blackbox is a personal portfolio website that showcases my work, experience, and technical projects.
The site introduces the concept of "Blackbox," where I document my exploration and demystification of complex systems.

### Features
- **Homepage**: Entry point.
- **About Page**: A timeline of my work experience and technical background.
- **Blog Section**: A place to share posts with multiple media attachments (images, videos, audio files). Only superadmins can create, update, or delete content.
- **Login System**: Superadmin login functionality for admin access. No signup feature is implemented yet.

### Technologies
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js (Express)
- **Database**: MongoDB
- **Authentication**: JWT for admin access

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/0xzoowa/blackbox.git
   ```
2. Navigate to the project directory:
   ```bash
   cd blackbox
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up MongoDB:
   Ensure MongoDB is running locally or set up a cloud instance.
   Add your MongoDB URI to the .env file as MONGO_URI.
   Start the server:
   ```bash
   npm start
   ```
5. Open your browser and visit http://localhost:3000
