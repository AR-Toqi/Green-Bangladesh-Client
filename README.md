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

1.  **AI Implementation & Vector Search**: Integrating an AI support agent required setting up vector embeddings and a vector database. Fine-tuning the agent to provide accurate, localized environmental advice while maintaining performance was a significant challenge.
2.  **Email Deliverability**: Faced issues with SMTP-based email delivery in production (Render). Successfully migrated to a robust API-based approach using **Brevo (formerly Sendinblue)** to ensure critical verification codes and alerts are delivered reliably.
3.  **Cross-Domain Authentication**: Resolving cookie synchronization and session persistence between different domains (Frontend on Vercel, Backend on Render) required a deep dive into CORS policies and secure cookie handling.
4.  **Complex Data Aggregations**: Calculating real-time environmental scores and leaderboards across thousands of reports while maintaining fast response times required optimized Prisma queries and efficient backend logic.

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
