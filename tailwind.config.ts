import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      xs: "400px",
      sm: "600px",
      md: "905px",
      lg: "1240px",
      xl: "1440px",
    },
    fontFamily: {
      title: ['"Stolzl"', "sans-serif"],
      body: ["Polymath", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"],
    },
    colors: {
      primary: "#009DAA", // Teal Med
      "primary-dark": "#006075", // Teal Dark
      "primary-light": "#63B2B9", // Teal Light
      secondary: "#C0A2FF", // Lavender
      "secondary-light": "#CACCF8", // Lavender Light
      tertiary: "#97E1E5", // Aqua
      accent: "D70449", // Pink
      white: "#FFFFFF",
      black: "#000000",
    },
    fontWeight: {
      normal: "300",
      light: "400",
      medium: "500",
      bold: "600",
      extraBold: "700",
    },
    fontSize: {
      base: "1.25rem",
      h1: "5.38rem",
      h2: "2.88rem",
      h3: "1.88rem",
      h4: "1.8rem",
      label: "1.375rem",
      button: "1.25rem",
      bodyLarge: "1.375rem",
      tagline: "1.875rem",
      sm: "1rem",
    },
    lineHeight: {
      h1: "6.45rem",
      h2: "3.45rem",
      h3: "2.4375rem",
      h4: "1.3",
      p: "1.5",
    },

    extend: {
      borderRadius: {
        DEFAULT: "1.25rem",
      },
      boxShadow: {
        DEFAULT: "0px 0px 16px 6px rgba(151, 225, 229, 0.12)",
      },
      backdropBlur: {
        DEFAULT: "15px",
      },
      maxWidth: {
        content: "700px",
        wide: "782px",
        standard: "685px",
        narrow: "452px",
      },
      backgroundImage: {
        // For Text
        "primary-gradient":
          "linear-gradient(90deg, #97E1E5 0.01%, #D9CAF8 89.82%)",
        // For Border
        "secondary-gradient":
          "linear-gradient(90deg, rgba(151, 225, 229, 0.60) 0.01%, rgba(217, 202, 248, 0.60) 89.82%)",
        // For Background
        "tertiary-gradient":
          "linear-gradient(66deg, rgba(53, 252, 255, 0.36) 4.86%, rgba(81, 58, 145, 0.36) 84.35%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
