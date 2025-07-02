## Portfolio
Salvi's Portfolio

## About the Project
This is a portfolio project showcasing Salvi's work and skills.

## Installation
To install the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd Portfolio
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Languages and Frameworks Used
- **Languages**: JavaScript, HTML, CSS
- **Frameworks**: React, Tailwind CSS

## Required Libraries

This project uses several libraries that need to be installed. Here's how to install them:

```bash
# Core dependencies
npm install react react-dom

# Animation and UI libraries
npm install framer-motion
npm install lottie-react
npm install @emailjs/browser

# Styling
npm install tailwindcss
npm install @tailwindcss/forms

# Icons
npm install @fortawesome/fontawesome-free
```

### Library Versions
- React: ^18.2.0
- React DOM: ^18.2.0
- Framer Motion: ^10.16.4
- Lottie React: ^2.4.0
- EmailJS: ^4.1.0
- Tailwind CSS: ^3.3.0
- Font Awesome: ^6.4.0

### Additional Setup
1. For EmailJS:
   - Create an account at [EmailJS](https://www.emailjs.com/)
   - Get your Service ID, Template ID, and Public Key
   - Update these values in the Contact component

2. For Lottie Animations:
   - Place your Lottie animation JSON files in the `public` directory
   - Update the path in the Hero component accordingly

3. For Tailwind CSS:
   - Make sure to run `npx tailwindcss init` if not already done
   - Configure your `tailwind.config.js` file
