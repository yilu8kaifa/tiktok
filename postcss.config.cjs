module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', '> 1%'],
      grid: true,
    }),
    require('postcss-flexbugs-fixes'),
    require('tailwindcss'),
  ],
}
