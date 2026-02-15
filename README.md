# 📅 EVENTLY.
  
> Modern React event management platform with full CRUD functionality, token-based authentication, and premium UI design.

<p align="left">
  <img alt="React" title="React" height="32" style="margin-right:18px;" src="https://raw.githubusercontent.com/github/explore/main/topics/react/react.png" />
  <img alt="Vite" title="Vite" height="32" style="margin-right:18px;" src="https://raw.githubusercontent.com/github/explore/main/topics/vite/vite.png" />
  <img alt="Tailwind CSS" title="Tailwind CSS" height="32" style="margin-right:18px;" src="https://raw.githubusercontent.com/github/explore/main/topics/tailwind/tailwind.png" />
  <img alt="JavaScript" title="JavaScript" height="32" style="margin-right:18px;" src="https://raw.githubusercontent.com/github/explore/main/topics/javascript/javascript.png" />
</p>

---

## 📖 Overview

**EVENTLY.** is a professional event scheduling application that bridges the gap between community creators and explorers. 

The application integrates with a local REST API to provide persistent data management and demonstrates advanced React patterns including Context-based authentication, route protection guards, and a highly polished UI built with the cutting-edge Tailwind CSS v4 and daisyUI.

---

## 🖼 UI Preview

<table>
  <tr>
    <td><b>🏠 Discovery</b><br/><i>Hero & Event Lineup</i></td>
    <td><b>🔐 Security</b><br/><i>Authentication Flow</i></td>
    <td><b>✨ Logistics</b><br/><i>Event Detail View</i></td>
  </tr>
  <tr>
    <td>
      <img width="420"
           alt="Discovery - Side overview"
           src="https://github.com/user-attachments/assets/19076182-bce0-488f-a4ce-3ac916bc5d63" />
    </td>
    <td>
      <img width="420"
           alt="Authentication"
           src="https://github.com/user-attachments/assets/8fca35fc-5a14-45dc-9027-6f495bc38f89" />
    </td>
    <td>
      <img width="420"
           alt="Event Details"
           src="https://github.com/user-attachments/assets/e745f7c1-396c-4710-ad4b-cb272f9ad7d9" />
    </td>
  </tr>
</table>

---

## ✨ Features

### 📅 Event System
- **Dynamic Lineup**: Automated chronological sorting of upcoming events.
- **Full CRUD**: Authenticated users can create and delete their own events.
- **Deep Linking**: Dedicated detail pages for every event via dynamic React Router parameters.
- **Intelligent Feedback**: Comprehensive handling of API connectivity issues and empty states.

### 🔐 Authentication System
- **Registration & Login**: Secure user onboarding flow communicating with the backend API.
- **JWT Persistence**: Token-based authentication state persisted via LocalStorage.
- **Protected Layouts**: Structural route guards using React Router's `<Outlet />` and `<Navigate />` patterns to block unauthenticated access.
- **Session Continuity**: Automatic authentication check on application bootstrap.

### 🎨 Design & Experience
- **Tailwind v4 Workflow**: Leveraging the latest CSS-first engine for lightning-fast styling.
- **Premium Theming**: High-contrast "Nord" aesthetic with smooth transitions and bold typography.
- **Interactive Guide**: Built-in "How it works" modal to guide first-time users.
- **Micro-Animations**: Subtle layout shifts and hover states for a high-end feel.

---

## 🧠 Architecture

```
src/
│
├── components/       → Reusable UI & Layout components
├── context/          → AuthContext for global session management
├── pages/            → Routed views (Home, Auth, Event Creation, Details)
├── assets/           → Static resources
│
├── App.jsx           → Routing & Layer configuration
└── main.jsx          → Entry point & Global Styles
```

### Authentication Flow

```
User Action
  ↓
API Response (Token)
  ↓
AuthContext (State Update)
  ↓
LocalStorage (Persistence)
  ↓
ProtectedLayout (Access Granted)
```

---

## 🛠 Tech Stack

| Layer        | Technology |
|-------------|------------|
| Frontend     | React 19 |
| Bundler      | Vite (SWC) |
| Styling      | Tailwind CSS v4 |
| UI Library   | daisyUI (Nord Theme) |
| Routing      | React Router 7 |
| API Client   | Axios |
| Icons        | Lucide React |

---

## 🚀 Getting Started

### 1. The Backend
This app requires the **Events API** running on port 3000.
```bash
# In your API directory
npm install
npm start
```

### 2. The Frontend
```bash
git clone https://github.com/Codenix-1349/Event-Scheduler.git
cd Event-Scheduler
npm install
npm run dev
```

Application runs on: `http://localhost:5173`

---

## 📦 Future Roadmap
- [ ] User profile dashboard with personal event history.
- [ ] Real-time search and category filtering.
- [ ] Interactive maps for event locations.
- [ ] Automated testing suite with Vitest.

---

## 🎯 Technical Excellence
This project serves as a showcase for:
- **Scalable Component Architecture** in React.
- **Robust Route Protection** logic.
- **Backend Communication** and error resilience.
- **Modern CSS Architectures** using Tailwind v4.
- **State Management** via React Context.

---

## 👨‍💻 Author

Patrick Neumann  
Frontend-Focused Full-Stack Developer  

- GitHub: https://github.com/Codenix-1349  
- LinkedIn: https://linkedin.com/in/patrick-neumann-532367276  
