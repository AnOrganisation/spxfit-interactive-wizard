# SPXfit Interactive Wizard

A Next.js-based interactive configuration wizard for SPX Fitness equipment, featuring dynamic 3D visualization and customization options.

## Features

- Interactive equipment visualization with zoom and pan controls
- Real-time color and material customization
- Responsive design for all device sizes
- Dark/light theme support
- Touch-enabled for mobile devices

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework with app directory structure
- [NextUI v2](https://nextui.org/) - Modern UI component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Tailwind Variants](https://tailwind-variants.org) - Variant generation utility
- [TypeScript](https://www.typescriptlang.org/) - Static type checking
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [next-themes](https://github.com/pacocoursey/next-themes) - Theme management

## Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun package manager

## Getting Started

1. Clone the repository:
```bash
git clone [your-repository-url]
cd spxfit-interactive-wizard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `npm run dev` - Start development server with turbo
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Testing

Run the linting checks:
```bash
npm run lint
```

## Project Structure

```
├── app/                    # Next.js app directory
├── components/            # Reusable React components
├── config/               # Configuration files
├── data/                 # Static JSON data
├── public/              # Static assets
├── styles/             # Global styles
└── types/             # TypeScript type definitions
```

## Development Guidelines

- Follow the ESLint configuration for code style
- Use TypeScript for type safety
- Implement responsive designs using Tailwind CSS
- Follow the component structure in the components directory
- Keep configuration in the config directory

## Environment Setup

For pnpm users, add to `.npmrc`:
```bash
public-hoist-pattern[]=*@nextui-org/*
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).
