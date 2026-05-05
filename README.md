# 🌱 Green Bangladesh - Comprehensive Environmental Platform

![Project Banner](https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=2000)

**Green Bangladesh** is a state-of-the-art environmental monitoring and tree plantation platform. It combines data-driven visualization with community-led action to combat deforestation across all 64 districts of Bangladesh.

**Live App**: [green-bangladesh-client.vercel.app](https://green-bangladesh-client.vercel.app)
**API Documentation**: [green-bangladesh-api.vercel.app](https://green-bangladesh-api.vercel.app)

---

## 🚀 Key Features

### 🗺️ Data Visualization & Impact
- **Interactive D3 Map**: A custom SVG-based map of Bangladesh visualizing environmental zones (Green, Orange, Red) in real-time.
- **CO2 Impact Calculator**: An interactive tool that translates tree plantation numbers into tangible environmental benefits (CO2 kg offset, car mileage saved, smartphone charges equivalent).
- **Personal Impact Dashboard**: Authenticated users can track their individual contributions, total trees planted, and their current "Environmental Tier."
- **District Environmental Scores**: Dynamic scoring system based on tree density per square kilometer.

### 🏆 Community & Engagement
- **Global Leaderboard**: Competitive rankings of districts and individuals based on verified plantation reports.
- **AI Support Agent**: A proactive AI assistant powered by vector embeddings that provides localized environmental advice and platform support.
- **Automated Alerts**: Monthly email notifications (via Node-Cron) alerting users when their selected district falls into a "Red Zone."

### 🛡️ Administrative Control
- **Full Moderation**: Admins can verify plantation reports, manage user roles, and update district environmental metrics.
- **RBAC**: Secure Role-Based Access Control ensuring system integrity between Users and Administrators.

---

## 🧠 Challenges Faced

During the development of Green Bangladesh, several technical hurdles were overcome:

1.  **D3.js Map Integration**: Implementing the interactive SVG map of Bangladesh was a major challenge. Balancing the precision of geographic data (GeoJSON) with smooth interactivity and D3's complex API required careful engineering.
2.  **Next.js Optimization & RSC**: A core challenge was optimizing the application for speed and SEO. I successfully maintained almost all main pages as **Server Components**, moving heavy data fetching and logic to the server while strategically using Client Components only for interactivity.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Visualization**: [D3.js](https://d3js.org/)
- **Auth**: [Better Auth](https://better-auth.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Task Scheduling**: [Node-Cron](https://www.npmjs.com/package/node-cron)
- **Templating**: [EJS](https://ejs.co/)

---

## 🔮 Future Implementations

- **Gamification System**: Achievement badges (e.g., "Forest Guardian", "Seedling") and district-level competitions with rewards.
- **Historical Analysis**: Visualizing environmental health trends over 12-month periods using line charts.
- **AI Tree Identification**: Allow users to upload photos of their plantations for AI-powered species identification and health assessment.
- **PWA Support**: Offline capability for plantation reporting in remote areas with poor connectivity.

---

## 📦 Installation & Setup

1.  **Clone the Repo**: `git clone https://github.com/AR-Toqi/Green-Bangladesh-Client.git`
2.  **Install Deps**: `pnpm install`
3.  **Env Config**: Set up `NEXT_PUBLIC_API_BASE_URL` and `NEXT_PUBLIC_APP_URL` in `.env`.
4.  **Run Dev**: `pnpm dev`

---

## 👨‍💻 Developed By

**[Abdullah Ragib Toqi](https://www.linkedin.com/in/abdullah-ragib-toqi-b5154a297/)**  
Full-Stack Developer | Environmental Enthusiast
