# 🌱 Green Bangladesh - Client

![Project Banner](https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=2000)

**Green Bangladesh** is a comprehensive environmental monitoring and tree plantation platform. It provides a data-driven visualization of tree density across all 64 districts of Bangladesh and encourages community-led reforestation efforts.

## 🚀 Features

### 🗺️ Environmental Visualization
- **Interactive Map**: A custom D3-powered SVG map of Bangladesh highlighting zones by environmental health (Green, Orange, Red).
- **District Directory**: Detailed statistics for every district, including estimated tree counts, land area, and environmental scores.
- **Micro-animations**: Smooth, professional page transitions and interactive elements powered by Framer Motion.

### 🏆 Community Engagement
- **Leaderboard**: Real-time rankings of top districts and individual contributors based on verified plantation reports.
- **Plantation Reporting**: Secure authenticated flow for users to report new tree plantations with location data.

### 🛡️ Administrative Dashboard
- **District Management**: Admins can update land area, tree estimates, and environmental scores.
- **User Moderation**: Manage user roles (User/Admin) and account statuses (Active/Blocked).
- **Plantation Moderation**: Verify and approve community plantation reports.
- **Statistics**: Global overview of platform impact and growth.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Auth**: [Better Auth](https://better-auth.com/) (Custom Integration)

## 📦 Getting Started

### Prerequisites
- Node.js 20+ 
- pnpm (Recommended) or npm/yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AR-Toqi/Green-Bangladesh-Client.git
   cd green-bangladesh-client
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://green-bangladesh-api.vercel.app/api/v1
   NEXT_PUBLIC_APP_URL=http://localhost:3000/
   ```

4. **Run the development server**:
   ```bash
   pnpm dev
   ```

5. **Build for production**:
   ```bash
   pnpm build
   pnpm start
   ```

## 📂 Project Structure

```text
src/
├── app/             # Next.js App Router (Pages & API)
├── components/      # UI Components (shared, home, districts, admin)
├── lib/             # Utility functions (auth, cookies, utils)
├── services/        # API Service layer (Axios/Fetch logic)
├── types/           # TypeScript Interfaces & Types
└── hooks/           # Custom React Hooks
```

## 👨‍💻 Developed By

**[Abdullah Ragib Toqi](https://www.linkedin.com/in/abdullah-ragib-toqi-b5154a297/)**  
Full-Stack Developer | Environmental Enthusiast

---
Built with ❤️ for a Greener Bangladesh.
