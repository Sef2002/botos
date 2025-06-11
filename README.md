# Botos Shop Demo

This project is a React application using Vite, Supabase and Stripe. It includes a simple shopping cart with checkout flow.

## Setup

1. Copy `.env.example` to `.env` and provide your Supabase and Stripe keys.
2. Install dependencies and run development server:

```bash
npm install
npm run dev
```

## Supabase Functions

A Supabase Edge Function named `create-checkout` is used to create Stripe Checkout sessions. Ensure you deploy it before testing the checkout flow.

