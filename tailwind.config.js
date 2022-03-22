module.exports = {
  content: [`./index.html`, `./src/**/*.{html,tsx}`],
  theme: {
    extend: {
      fontFamily: {
        "M-Plus-2": [`'M PLUS 2'`, `sans-serif`],
        Mochiy: [`Mochiy Pop One`, `sans-serif`],
      },
      colors: {
        "primary-red": `hsl(1, 100%, 43%)`,
        body: `hsl(224, 16%, 10%)`,
        "searchbar-color": `hsl(224, 16%, 6%)`,
        "body-alt": `hsl(0, 0%, 96%)`,
      },

      boxShadow: {
        searchbar: `0 6px 20px 0 rgba(0,0,0,0.1)`,
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require(`@tailwindcss/line-clamp`)],
};
