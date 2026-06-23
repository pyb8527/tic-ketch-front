/** @type {import('tailwindcss').Config} */

// 시맨틱 표면/텍스트 토큰은 CSS 변수(index.css)로 라이트/다크를 자동 전환한다.
// 변수는 oklch 성분(L C H)만 담고, alpha는 <alpha-value>로 합성한다.
const sem = (v) => `oklch(var(${v}) / <alpha-value>)`;

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── 시맨틱(테마 인식) ──────────────────────────
        canvas: sem('--canvas'),
        surface: sem('--surface'),
        'surface-2': sem('--surface-2'),
        border: sem('--border'),
        'border-strong': sem('--border-strong'),
        fg: sem('--fg'),
        'fg-muted': sem('--fg-muted'),
        'fg-subtle': sem('--fg-subtle'),

        // ── 브랜드 Primary (Indigo) ────────────────────
        primary: {
          50: 'oklch(0.971 0.014 277)',
          100: 'oklch(0.936 0.032 277)',
          200: 'oklch(0.882 0.060 277)',
          300: 'oklch(0.806 0.098 277)',
          400: 'oklch(0.704 0.150 277)',
          500: 'oklch(0.606 0.196 277)',
          600: 'oklch(0.548 0.213 277)',
          700: 'oklch(0.488 0.205 277)',
          800: 'oklch(0.420 0.172 277)',
          900: 'oklch(0.360 0.130 277)',
          950: 'oklch(0.255 0.090 277)',
        },

        // ── Success (Emerald) ──────────────────────────
        success: {
          50: 'oklch(0.975 0.025 165)',
          100: 'oklch(0.940 0.055 165)',
          300: 'oklch(0.820 0.120 165)',
          500: 'oklch(0.700 0.150 162)',
          600: 'oklch(0.640 0.145 162)',
          700: 'oklch(0.560 0.125 162)',
          900: 'oklch(0.300 0.070 162)',
        },

        // ── 시맨틱 컬러 ────────────────────────────────
        warning: {
          50: 'oklch(0.970 0.030 85)',
          100: 'oklch(0.930 0.070 85)',
          300: 'oklch(0.870 0.130 82)',
          400: 'oklch(0.800 0.150 80)',
          700: 'oklch(0.550 0.120 70)',
          900: 'oklch(0.330 0.080 70)',
        },
        error: {
          50: 'oklch(0.960 0.020 25)',
          100: 'oklch(0.920 0.050 25)',
          400: 'oklch(0.680 0.200 25)',
          500: 'oklch(0.620 0.222 25)',
          600: 'oklch(0.560 0.215 25)',
          700: 'oklch(0.510 0.200 25)',
          900: 'oklch(0.300 0.110 25)',
        },
        info: {
          50: 'oklch(0.970 0.020 235)',
          300: 'oklch(0.820 0.090 235)',
          500: 'oklch(0.680 0.130 235)',
          700: 'oklch(0.500 0.130 245)',
        },

        // ── Neutral (cool gray) ────────────────────────
        neutral: {
          0: 'oklch(1 0 0)',
          50: 'oklch(0.985 0.002 270)',
          100: 'oklch(0.970 0.004 270)',
          200: 'oklch(0.930 0.006 270)',
          300: 'oklch(0.880 0.008 270)',
          400: 'oklch(0.710 0.010 270)',
          500: 'oklch(0.580 0.012 270)',
          600: 'oklch(0.480 0.012 270)',
          700: 'oklch(0.390 0.012 270)',
          800: 'oklch(0.280 0.010 270)',
          900: 'oklch(0.210 0.008 270)',
          950: 'oklch(0.155 0.006 270)',
        },

        // ── 좌석 등급 (VIP/R/S/A) ──────────────────────
        grade: {
          vip: 'oklch(0.620 0.170 300)',
          r: 'oklch(0.550 0.210 277)',
          s: 'oklch(0.680 0.130 235)',
          a: 'oklch(0.700 0.150 162)',
        },
      },

      fontFamily: {
        sans: ['"Pretendard Variable"', 'Pretendard', 'system-ui', 'sans-serif'],
        display: ['"Sora"', '"Pretendard Variable"', 'Pretendard', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Pretendard Variable"', 'monospace'],
      },

      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '14px',
        xl: '20px',
      },

      boxShadow: {
        sm: '0 1px 2px oklch(0.2 0.01 270 / 0.06)',
        md: '0 4px 12px oklch(0.2 0.01 270 / 0.08)',
        lg: '0 12px 32px oklch(0.2 0.01 270 / 0.12)',
        xl: '0 24px 56px oklch(0.2 0.01 270 / 0.16)',
      },

      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
        enter: 'cubic-bezier(0, 0, 0.2, 1)',
        exit: 'cubic-bezier(0.4, 0, 1, 1)',
      },
      transitionDuration: {
        fast: '120ms',
        normal: '220ms',
        slow: '400ms',
      },

      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'count-flip': {
          '0%': { opacity: '0', transform: 'translateY(40%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'toast-in': {
          from: { opacity: '0', transform: 'translateY(-12px) scale(0.98)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-5px)' },
          '40%, 80%': { transform: 'translateX(5px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 400ms cubic-bezier(0,0,0.2,1) both',
        'slide-up-in': 'slide-up-in 400ms cubic-bezier(0,0,0.2,1) both',
        'count-flip': 'count-flip 220ms cubic-bezier(0,0,0.2,1)',
        'toast-in': 'toast-in 220ms cubic-bezier(0,0,0.2,1)',
        shake: 'shake 400ms cubic-bezier(0.4,0,0.2,1)',
      },
    },
  },
  plugins: [],
};
