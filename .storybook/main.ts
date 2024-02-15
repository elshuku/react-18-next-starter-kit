import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-jest",
    {
      /**
       * Fix Storybook issue with PostCSS@8
       * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
       */
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ['../public'],
  async webpackFinal(config, { configType }) {
    config.resolve.modules =
      [
        path.resolve(__dirname, "..", "src"),
        "node_modules",
      ];

    config.resolve.alias = {
      ...config.resolve.alias,
      /**
       * This allows for storybook to resolve nextjs's @/app/.. import notation
       */
      '@': [path.resolve(__dirname, '../src/'), path.resolve(__dirname, '../')],
    };
    return config;
  },
};
export default config;
