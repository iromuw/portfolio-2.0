/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background and Surfaces
        background: '#0B0F19',   // Primary dark background
        surface: '#111827',      // Secondary surface (e.g., side panel)
        panel: '#1F2937',        // Panel or editor background

        // Text colors
        textPrimary: '#E5E7EB',   // Light gray text (main content)
        textSecondary: '#9CA3AF', // Gray text (descriptions or secondary info)

        // Accent colors
        accentBlue: '#3B82F6',    // Blue (links, selected items)
        accentPurple: '#8B5CF6',  // Purple (headings, hover states)
        accentOrange: '#FBBF24',  // Orange (buttons or highlights)

        // Additional utility colors
        border: '#374151',        // Border color
        disabled: '#6B7280',      // Disabled text or buttons
        input: '#1F2937',         // Input field background
      },
      // Font family settings
      fontFamily: {
        sans: ['"Fira Code"', 'monospace'], // Used for general UI
      },

      // Border radius settings
      borderRadius: {
        DEFAULT: '8px', // Default border radius for components using `rounded`
        md: '8px',
        lg: '8px',
        xl: '8px',
      },

      // Optional: focus or hover shadows
      boxShadow: {
        focus: '0 0 0 3px rgba(139, 92, 246, 0.5)', // Purple glow for focus ring
      },
    },
    plugins: [],
  }
};