import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path-browserify'
import strip from "@rollup/plugin-strip";

const isProduction = process.env.NODE_ENV === 'production';

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(),
    // isProduction && strip({
    //   include: "**/*.(svelte|js|ts)",
    //   functions: ["console.*", "assert.*"]
    // }),
  ],
  resolve: {
    alias: {
      '~': path.resolve('./src'),
      $lib: path.resolve("./src/lib"),
    },
  },
})
