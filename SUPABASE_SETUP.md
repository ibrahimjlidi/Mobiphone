# Supabase setup

## 1. Create the project

Create a project at [supabase.com](https://supabase.com), then open **Project Settings > API**.

## 2. Configure the application

Copy `.env.example` to `.env.local` and fill in the project URL and the publishable anon key:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-anon-key
```

The `.env.local` file is ignored by Git and must never be committed.

## 3. Create the tables

Open the Supabase SQL editor, paste the contents of `supabase/schema.sql`, and run it once.

## 4. Configure email confirmation

In **Authentication > Providers > Email**, enable email/password sign-up. For local development, add `http://localhost:3000` to **Authentication > URL Configuration > Redirect URLs**. Add the production URL there before deploying.

## 5. Run the application

```bash
npm install
npm run dev
```

The login and registration forms use Supabase Auth. If the environment variables are missing, the pages show a configuration error instead of pretending that a user was authenticated.
