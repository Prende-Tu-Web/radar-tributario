// Configuración personalizada de TailwindCSS para Radar Tributario
tailwind.config = {
  theme: {
    extend: {
      colors: {
        // Paleta de colores personalizada - Tema Claro con Blanco Perla
        'primary-dark': '#0E2E4F',      // Azul profundo (header, footer)
        'primary': '#0E2E4F',           // Primario (titulares / énfasis)
        'accent': '#22E0C4',            // Acento (links/acciones) - turquesa petróleo
        'text-primary': '#1A202C',      // Texto principal
        'text-secondary': '#4A5568',    // Texto secundario
        'border-subtle': '#E2E8F0',     // Bordes sutiles
        'card-dark': '#F7FAFC',         // Fondos de tarjetas (gris muy claro)
        'bg-primary': '#F1EFF4',        // Fondo principal (blanco perla)
        'bg-secondary': '#F8FAFC',      // Fondo secundario
        'bg-tertiary': '#EDF2F7',       // Fondo terciario
      },
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'xs':  ['0.75rem',  { lineHeight: '1rem' }],
        'sm':  ['0.875rem', { lineHeight: '1.25rem' }],
        'base':['1rem',     { lineHeight: '1.5rem' }],
        'lg':  ['1.125rem', { lineHeight: '1.75rem' }],
        'xl':  ['1.25rem',  { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem',   { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem',  { lineHeight: '2.5rem' }],
        '5xl': ['3rem',     { lineHeight: '1' }],
        '6xl': ['3.75rem',  { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl':  '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'glow':    '0 0 20px rgba(34, 224, 196, 0.3)',
        'glow-lg': '0 0 40px rgba(34, 224, 196, 0.4)',
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease-in-out',
        'slide-up':   'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',     opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
