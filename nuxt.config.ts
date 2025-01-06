// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            primary: "#1D4ED8", // Customize with your own colors
          },
          scale: {
            "120": "1.1",
          },
          backgroundImage: {
            "radial-amber-400":
              "radial-gradient(circle, rgba(251,191,36,0.6699054621848739) 0%, rgba(251,191,36,0) 100%)",
          },
          boxShadow: {
            subtle: "inset 0px 0px 20px 0px #fbbf24",
          },
        },
        container: {
          center: true,
          padding: {
            DEFAULT: "1rem",
            sm: "2rem",
            lg: "4rem",
            xl: "5rem",
            "2xl": "6rem",
          },
        },
        screens: {
          sm: "640px",
          // => @media (min-width: 640px) { ... }

          md: "768px",
          // => @media (min-width: 768px) { ... }

          lg: "1024px",
          // => @media (min-width: 1024px) { ... }

          // 'xl': '1280px',
          // => @media (min-width: 1280px) { ... }

          // '2xl': '1536px',
          // => @media (min-width: 1536px) { ... }
        },
      },
      plugins: [],
    },
  },
});
