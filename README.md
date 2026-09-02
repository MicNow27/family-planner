# Family Planner

A React-based web application designed to help families organize their schedules, tasks, and shared information.

## 🚀 Features

- [x] **Authentication**: User authentication system.
- [x] **Login and Sign Up**: User registration and login.
- [ ] **Onboarding**: Guide users through the application setup process.
- [ ] **[Placeholder] Feature Name**: Feature description.
- [ ] **[Placeholder] Feature Name**: Feature description.
- [ ] **[Placeholder] Feature Name**: Feature description.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS 4](https://sass-lang.com/)
- **Linting**: [ESLint](https://eslint.org/)
- **Unit Testing**: [Vitest](https://vitest.dev/)
- **E2E Testing**: [Playwright](https://playwright.dev/)

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MicNow27/family-planner.git
   cd family-planner
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Build

Create a production build:

```bash
npm run build
```

The output will be in the `dist/` directory.

### Linting

Run ESLint to check for code quality:

```bash
npm run lint
```

## 📁 Project Structure

```text
family-planner/
├── .github/
│   └── workflows/
│       └── ci.yml     # CI/CD workflow configuration
├── public/            # Static assets
├── src/
│   ├── assets/        # Images, icons, etc.
│   ├── components/    # Reusable React components
│   │   ├── buttons/
│   │   ├── forms/
│   │   └── loaders/
│   ├── config/
│   ├── context/
│   │   └── auth/
│   ├── copy/
│   ├── data/           # Backend data access and data-fetching hooks
│   │   ├── profile/
│   │   └── supabase.ts
│   ├── features/
│   │   ├── auth/
│   │   └── navigation/
│   ├── hooks/
│   ├── layouts/       # Page layouts
│   ├── schemas/       # Form validation schemas
│   │   └── auth/
│   ├── services/
│   ├── styles/
│   │   ├── layers/
│   │   └── theme/
│   ├── test/          # Unit tests
│   ├── types/
│   ├── utils/
│   ├── index.scss     # Global styles and entry point for CSS
│   ├── main.tsx       # Application entry point
│   └── router.tsx     # React Router configuration
├── .gitignore
├── .prettierrc
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML template
├── package.json            # Node.js dependencies and scripts
├── package-lock.json       # Locks the versions of dependencies
├── playwright.config.ts    # Playwright configuration
├── README.md               # Project documentation
├── tsconfig.app.json       # TypeScript configuration for the application
├── tsconfig.e2e.json       # TypeScript configuration for end-to-end tests
├── tsconfig.json           # TypeScript configuration
├── tsconfig.node.json      # TypeScript configuration for Node.js
├── vercel.json             # Vercel deployment configuration
└── vite.config.ts          # Vite configuration
```

## 🇺🇸 Spelling Convention

**American English**: American spelling must be used for everything, including file naming, code, comments, and documentation.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Branching Strategy

This project uses a **trunk-based development** strategy with `main` as the trunk branch. All development work should be done on short-lived feature branches that are merged back into `main` frequently. This approach promotes continuous integration and reduces merge conflicts.

### Commit Guidelines

To maintain a clean and consistent history, please follow these rules for commit messages:

- **Commit Message**: Use the imperative voice and lower case (except for proper nouns). Try and keep the description close to 72 characters. It must start with one of the following types:
  - `feat`: new feature
  - `fix`: bug fix
  - `docs`: documentation change
  - `style`: formatting, white-space, code style
  - `refactor`: code change without changing functionality
  - `test`: adding or fixing tests
  - `chore`: build process, dependencies, other maintenance

- **Commit Description**: Use the imperative voice and normal sentence structure.

Example:

```text
chore: add initial project README

Add a README file to outline the project's key features, structure, and guidelines.
```

## 📄 License

This project is licensed under [Placeholder] - see the [LICENSE](LICENSE) file for details.
