
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// צבעי מותג מעודכנים לפי הלוגו
				brand: {
					50: '#f0f8ff',
					100: '#e0f0fe',
					200: '#bae0fd',
					300: '#81c7fb',
					400: '#41a5f6',
					500: '#1D70B7', // צבע כחול ראשי מהלוגו
					600: '#0B5A9D',
					700: '#0b53b0',
					800: '#0e4691',
					900: '#123d77',
					950: '#0e2751',
				},
				accent1: {
					50: '#f5f3ff',
					100: '#ede8ff',
					200: '#dcd6ff',
					300: '#c3b5fe',
					400: '#a38afc',
					500: '#934C98', // צבע סגול מהלוגו
					600: '#7337ef',
					700: '#6424db',
					800: '#541eb8',
					900: '#461c94',
					950: '#2c1065',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
			},
			backgroundImage: {
				'hero-pattern': 'linear-gradient(to right bottom, rgba(29, 112, 183, 0.9), rgba(147, 76, 152, 0.9))', // עודכן לצבעי הלוגו
				'category-gradient': 'linear-gradient(to right bottom, rgba(29, 112, 183, 0.9), rgba(147, 76, 152, 0.8))', // עודכן לצבעי הלוגו
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
