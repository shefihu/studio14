# Studio14 - Resource Management Application

A modern React application built with TypeScript, Chakra UI, and following Atomic Design principles for managing workplace resources and learning materials.

> **Note**: This is an assessment project demonstrating modern React development practices, component architecture, and UI/UX design principles.

## 🎯 Assessment Objectives

This project demonstrates proficiency in:

## 🚀 Features

- **Resource Management**: Browse and filter workplace resources by type, category, and foundational principles
- **Advanced Filtering**: Multi-criteria filtering with search functionality
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Component Library**: Reusable components following Atomic Design methodology
- **Type Safety**: Full TypeScript implementation for better development experience

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Language**: TypeScript 5.8.3
- **UI Library**: Chakra UI 3.24.2
- **Routing**: React Router DOM 7.8.0
- **Icons**: Lucide React 0.539.0
- **Font**: Poppins (via @fontsource)
- **Styling**: Emotion React 11.14.0

## 📁 Project Structure

The project follows Atomic Design principles with a clear separation of concerns:

```
src/
├── assets/                 # Static assets and images
├── components/            # Reusable UI components
│   ├── atoms/            # Basic building blocks
│   │   ├── badge/
│   │   ├── iconWrapper/
│   │   ├── input/
│   │   ├── switch/
│   │   └── text/
│   ├── molecules/        # Combinations of atoms
│   │   ├── filterContent/
│   │   ├── filterGroup/
│   │   ├── resourceCard/
│   │   ├── resourceFilterModal/
│   │   ├── searchBox/
│   │   └── userAvatar/
│   ├── organisms/        # Complex UI sections
│   └── templates/layout/ # Page layouts
├── contexts/             # React Context definitions
│   ├── ResourceContext.ts
│   └── ResourceProvider.tsx
├── data/dummy/           # Mock data for development
├── hooks/                # Custom React hooks
│   ├── useDebounce.ts
│   ├── useResourceContext.ts
│   └── useResourceFiltering.ts
├── pages/                # Application pages
│   ├── home/
│   └── power/
├── routes/               # Routing configuration
├── services/             # API and external service integrations
├── theme/                # Chakra UI theme customization
└── types/                # TypeScript type definitions
```

## 🏗️ Architecture Patterns

### Atomic Design

The component structure follows Brad Frost's Atomic Design methodology:

- **Atoms**: Basic HTML elements (buttons, inputs, text)
- **Molecules**: Simple combinations of atoms (search box, filter group)
- **Organisms**: Complex UI components (resource lists, navigation)
- **Templates**: Page-level layouts
- **Pages**: Specific instances of templates

### Context Pattern

State management is handled through React Context:

- `ResourceContext`: Manages resource data and filtering state
- `ResourceProvider`: Provides context to child components
- Custom hooks abstract context usage

### Custom Hooks

- `useResourceContext`: Access resource state and actions
- `useResourceFiltering`: Handle resource filtering logic
- `useDebounce`: Debounce user input for better performance

## 🎨 Design System

### Foundational Principles

The application organizes resources around key workplace principles:

- **Secure Base**: Foundation and trust-building resources
- **Sense of Appreciation**: Recognition and appreciation materials
- **Learning Organisation**: Continuous learning and development
- **Mission and Vision**: Strategic alignment resources
- **Wellbeing**: Mental health and wellness content

### Resource Types

- **PDF Documents**: Guides, reports, and documentation
- **Video Content**: Training videos and presentations
- **External Links**: Web resources and tools

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd studio14
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview the production build locally

## 🔧 Development Guidelines

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Consistent naming conventions
- Component documentation with JSDoc

### Component Development

- Follow Atomic Design principles
- Use Chakra UI components as base
- Implement responsive design patterns
- Include proper TypeScript types

### State Management

- Use React Context for global state
- Implement custom hooks for business logic
- Keep components focused and reusable

## 🔍 Assessment Highlights

### Code Quality

- **TypeScript Coverage**: 100% TypeScript implementation with proper typing
- **ESLint Configuration**: Strict linting rules for code consistency
- **Component Reusability**: DRY principles with reusable atomic components
- **Error Boundaries**: Proper error handling and user feedback

### Architecture Decisions

- **Atomic Design**: Scalable component hierarchy from atoms to pages
- **Context Over Props Drilling**: Efficient state management pattern
- **Custom Hooks**: Business logic abstraction and reusability
- **Service Layer**: Clean separation between UI and data logic

### Performance Considerations

- **Debounced Search**: Optimized user input handling
- **Memoized Components**: Preventing unnecessary re-renders
- **Lazy Loading**: Code splitting for better initial load times
- **Responsive Images**: Optimized assets for different screen sizes

## 📱 Responsive Design

The application is built with mobile-first responsive design:

- Breakpoints follow Chakra UI standards
- Components adapt to different screen sizes
- Touch-friendly interactions on mobile devices

## 📄 License

This project is developed for assessment purposes.

---

**Assessment Project** | Built with ❤️ using React, TypeScript, and Chakra UI
