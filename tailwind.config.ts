
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
				sage: {
					50: "#f3f8f3",
					100: "#e7f1e7",
					200: "#d0e2cf",
					300: "#b8d3b6",
					400: "#9cc099",
					500: "#6B8E67", // Primary sage
					600: "#5a795a",
					700: "#4a634a",
					800: "#3a4d3a",
					900: "#2a372a"
				},
				sandstone: {
					50: "#fdfbf8",
					100: "#fbf8f1",
					200: "#f6eee0",
					300: "#f1e4ce",
					400: "#E8DCCA", // Primary sandstone
					500: "#d9c4a3",
					600: "#c4aa7e",
					700: "#af9059",
					800: "#9a7633",
					900: "#856c0e"
				},
				terracotta: {
					50: "#fcf5f2",
					100: "#f9ebe5",
					200: "#f3d7cc",
					300: "#ecc3b3",
					400: "#e4af9a",
					500: "#d99b81",
					600: "#BC6C25", // Primary terracotta
					700: "#964e1f",
					800: "#703019",
					900: "#491202"
				},
				charcoal: {
					50: "#f6f6f6",
					100: "#e7e7e7",
					200: "#d1d1d1",
					300: "#b0b0b0",
					400: "#888888",
					500: "#6d6d6d",
					600: "#5d5d5d",
					700: "#4f4f4f",
					800: "#454545",
					900: "#333333" // Primary charcoal
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-down': {
					'0%': { opacity: '0', transform: 'translateY(-10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'pulse-gentle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-in-up': 'fade-in-up 0.5s ease-out',
				'fade-in-down': 'fade-in-down 0.5s ease-out',
				'pulse-gentle': 'pulse-gentle 3s infinite ease-in-out',
				'float': 'float 4s infinite ease-in-out'
			},
			backgroundImage: {
				'hero-pattern': "url('/src/assets/hero-bg.jpg')",
				'grain-pattern': "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAABBpJREFUaEPtmtuV1DAMhr2VQCXQCVDBZp8pAaiEpRKgAmAqgDda4JSy0wkNwDbBlny3J+Nk5uRhNg8n45z4t6zfkm3ZdvTEP+eJ26dfIJbW5C+NHK2R1OW7e6SFtL9K6XfJT2vtBEkpmqt/AZZau0tpPxCt1jkaBGItZdJaJ9tnLAuhtV7UkqUghOQy9U/X/4sQQmgRcwGaI7RrYIkWI6VEjVifCpDUGtZnFCgHJwLJ+YzWenAQnxVSSikCzGnF1ywURusj3lwjHSilAqTbZJaAkEJK+cta+2Gv+c/W2lccOHvgRSA5ILEWl4AQQvxWSr23zo0A1FpvUso3SBYAhSD53LtpCEcBCYQg+Qc2MYNvUdK5+WQMxdJIzn+GgvCE6PVPjTGeVUIe8GQ5gECbHNxokFAfzLWbmzGmqRE2UwVALgohG2vtfRRyZdQaXLUHQjRNSvnXWns/dH6EWnhvyDsYZTbGnM4CeXh4aPu+bxEEQnrSSvx/Y8zFJJDr6+v27u7uLzqVlPLRWvuK5pmcb5RuklLchzSyJsimIJhwhJnj2UQZbWxTVV1QY1d0MHC2I7zEZu1V8/8XIYrZDnc6hKfLKCQrxWv8BgHJlbsohW6tRZAqbWIAHFQzOWdGMDc3N21KKWCFI7xP3MPhvTFmVjKPgEBBqZS61VrveOBxnkkpPWqtX48B4YSz1gaaSC3t+Qx57U2shSGN0Iwo7kVtdC0M4N5aG17bO3vxRVVVXZ1QvqDT6qrr+h1PgHs3VE4Xj2GLQLA+rZTaWWu31lpWE58bYy7ngAR8SSlbtdYuADiAx65XfXSN3dxdVXWd0sIyEJzd4/1F5JnSYwM5eCdgM4fPLhCwpKq03kHdIc01MQiC9wwGQe0ppXZVVfVrElJIjxdVVf0kEp8j5UEIrCZY3y8ZhccQQggPEmqOaGEshBCCf+1vCEAp5Y0x5tUQCM4RXXa18/q0PQjunbGW1BgzqIXFIMFXCBTSKgIJtbB4HtkaBN8zIQDO64A6ECjDHgXifcSB5HTfxqAFrJLfPrZS6u7y8vJD5CNPUz1iMMloYCsQv2dQSp0rpR5TSnulVPxbLGPM+dDwfADMO9RJR6OtQXowqICbst/vz6CPtm1/1nX9gzRTVdV1SunNIQgszQeB0Ek5WPqw1wd5Nc9ZQQG3/8q9HgzCsz05FfRfCmkHVtf1Z1yptdYXKaVvvG3D12TGGADMfg4CoYaH5Aig1a+8BfCh7/ufVVX9atu2adt2b4xhbabSPDM0pR0MQhrBmwdvF/b7/a5pmm+oGZoQ6LceXFn3jY1qpLYRFIVE/3IQfjYBDfHfg3BzPbpcVXV3tFaCZfkFslQjj/L8k9fII3OsZoNfBEZXg4Ut/wOCeMUQLRK34QAAAABJRU5ErkJggg==')"
			},
			boxShadow: {
				'soft': '0 5px 15px rgba(0, 0, 0, 0.05)',
				'medium': '0 8px 30px rgba(0, 0, 0, 0.12)',
				'strong': '0 30px 60px rgba(0, 0, 0, 0.15)',
				'inner-soft': 'inset 0 2px 5px rgba(0, 0, 0, 0.05)'
			},
			transitionTimingFunction: {
				'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
				'ease-out-soft': 'cubic-bezier(0.16, 1, 0.3, 1)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
