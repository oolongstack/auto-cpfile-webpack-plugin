import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "./src/index.ts",
    output: [
      {
        file: "dist/bundle.js",
        format: "esm",
      },
      {
        file: "dist/bundle.cjs",
        format: "cjs",
      },
    ],
    plugins: [
      typescript({
        compilerOptions: {
          lib: ["esnext"],
        },
      }),
    ],
    watch: {
      exclude: "node_modules/**",
    },
  },
  {
    input: "./src/index.ts",
    output: {
      file: "dist/bundle.d.ts",
      format: "esm",
    },
    plugins: [dts()],
  },
];
