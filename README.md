# Pool

A mobile app for group savings (savings circles): admins create and manage contribution pools, and members join pools, track what they've paid and make contributions.

> **Note:** Pool is currently a front-end prototype. All screens run on mock data. There is no backend, real authentication or payment processing yet.

## Screenshots

| | | |
|---|---|---|
| ![Screen](docs/screenshot-1.png) | ![Screen](docs/screenshot-2.png) | ![Screen](docs/screenshot-3.png) |

## Features

All screens below are built and navigable, using hard-coded sample data.

### Auth
- Role selection screen: choose **Admin** or **Member**
- Login with phone number and password, with basic empty-field validation
- Sign up with name, email, password and a terms checkbox
- Login and signup send you to the admin or member area based on the role you picked

### Admin
- **Dashboard:** total pool value, pool health bar, KPIs (balance, due date, members, active pools), quick actions, member requests and recent activity
- **Create Group** modal: name, description, monthly contribution target, member limit and category (Business, Education, Health, Personal, Other)
- **Requests:** join requests list, filterable by All / Pending / Approved / Rejected
- **Records:** contribution records with Paid / Unpaid tabs, collection totals and report shortcuts
- **Profile:** account summary, settings menu and logout (returns to role selection)

### Member
- **My Pools:** total contributed across all pools and a list of joined pools
- **Dashboard:** active group summary and transaction history filterable by All / Paid / Pending
- **Make Contribution** modal: amount due, payment method choice (Bank Transfer, Mobile Money, Card) and a payment summary
- **Discovery:** browse available groups by category, with Join / Request to Join buttons
- **Profile:** account summary, settings menu and logout

### In progress
- **Authentication:** login and signup don't call a backend. Any non-empty input is accepted. "Forgot Password" shows an alert only, and the Google/Apple buttons do nothing yet.
- **Payments:** "Confirm & Pay" closes the modal. No payment provider is integrated.
- **Persistence:** "Create Group" doesn't save anything. Join and request buttons only navigate between screens.
- **Discovery search:** the search box takes input but doesn't filter results yet.
- **Group Created** success screen: built, but not linked from the create-group flow yet.
- **Profile menu items:** they show placeholder alerts.

## Tech stack

- [Expo](https://expo.dev) SDK 54 with [Expo Router](https://docs.expo.dev/router/introduction/) 6 (file-based routing, typed routes)
- React Native 0.81 and React 19.1
- TypeScript 5.9
- React Native Reanimated 4, Gesture Handler, Screens, Safe Area Context
- [lucide-react-native](https://lucide.dev) icons
- NativeWind 4 / Tailwind CSS 3 (configured; the screens currently use `StyleSheet`)
- ESLint with `eslint-config-expo`

## Getting started

### Prerequisites
- Node.js (LTS) and npm
- The [Expo Go](https://expo.dev/go) app on a phone, or an Android emulator / iOS simulator

### Install and run

```bash
git clone https://github.com/HOLYGRILL-7/Pool-Fintech.git
cd Pool-Fintech
npm install
npx expo start
```

Then scan the QR code with Expo Go, or press `a` for Android, `i` for iOS or `w` for web.

### Environment variables

None are needed yet. The app doesn't connect to any external services.

### Scripts

| Command | What it does |
|---|---|
| `npm start` | Start the Expo dev server |
| `npm run android` / `ios` / `web` | Start and open on a platform |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── app/                 # Expo Router routes
│   ├── _layout.tsx      # Root stack + splash screen
│   ├── index.tsx        # Redirects to role selection
│   ├── (auth)/          # role, login, signup
│   ├── (admin)/         # Admin tabs: dashboard, requests, records, profile
│   │                    #   + create-group, group-created modals
│   └── (member)/        # Member tabs: groups, dashboard, discovery, profile
│                        #   + contribute modal
├── components/          # Shared UI components
├── constants/           # Theme constants
└── hooks/               # Color scheme / theme hooks
assets/                  # App icon, splash and images
```

## Status

**MVP / in development.** The UI for both the admin and member flows is in place. Backend, real authentication, data persistence and payments are not built yet.

## Author

**Bismark Jones-Oduro** · GitHub: [HOLYGRILL-7](https://github.com/HOLYGRILL-7)
