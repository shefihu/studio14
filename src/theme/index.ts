import { createSystem, defaultConfig } from "@chakra-ui/react";

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        primary: {
          500: { value: "#314EF9" },
          600: { value: "#2840e0" },
        },
        gray: {
          50: { value: "#fafafa" },
          100: { value: "#F2F2F2" },
          200: { value: "#e5e5e5" },
          300: { value: "#A1A1A1" },
          500: { value: "#737373" },
          600: { value: "#2C3237" },
          800: { value: "#262626" },
          900: { value: "#000000" },
        },
      },
      fonts: {
        heading: { value: "Poppins, system-ui, sans-serif" },
        body: { value: "Poppins, system-ui, sans-serif" },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          canvas: { value: "white" },
          subtle: { value: "{colors.gray.100}" },
        },
        fg: {
          default: { value: "{colors.gray.800}" },
          muted: { value: "{colors.gray.600}" },
          subtle: { value: "{colors.gray.500}" },
        },
      },
    },
  },
});

export default system;
