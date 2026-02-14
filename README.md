# Fredium

A blog platform similar to Medium or Substack, built with Next.js, Prisma, and NextAuth.

## Features

- **Google OAuth**: Secure sign-in using Google.
- **Publish Stories**: Easy-to-use editor to publish your blogs.
- **Profile Management**: Customize your name, profile picture, and bio.
- **Owner-Only Publishing**: Restrict publishing to a specific email using `ALLOWED_EMAIL`.
- **Responsive Design**: Built with Tailwind CSS.

## Getting Started

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Setup Database**:
   - Provide a `DATABASE_URL` in `.env`.
   - Run migrations: `npx prisma db push`
4. **Setup Auth**:
   - Create a project on [Google Cloud Console](https://console.cloud.google.com/).
   - Configure OAuth consent screen and create credentials.
   - Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to `.env`.
5. **Setup Owner**:
   - Add `ALLOWED_EMAIL=your-email@gmail.com` to `.env`.
6. **Run the app**: `npm run dev`

## Deployment on Render

This project is ready to be deployed on Render using the included `render.yaml`.

1. Connect your GitHub repository to Render.
2. Render will automatically detect the `render.yaml` and setup the Web Service and PostgreSQL database.
3. **Important**:
   - Update `NEXTAUTH_URL` in the Render dashboard to your actual domain.
   - Add `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `ALLOWED_EMAIL` in the Render environment variables.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma](https://www.prisma.io/)
- **Auth**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
