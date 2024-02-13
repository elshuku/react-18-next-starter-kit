This is a [Next.js](https://nextjs.org/) based project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), which has been further developed to be a starter kit including some of the fundamentals for a testable react 18 application.

## What's included 

As part of the setup this inclueds:
- mocking REST of apis using (msw), 
- storybook which uses the mocked REST apis,
- Jest and react testing library have been setup to import a story with it's mocks and test it.

## Objective

This setup aims for a visual parallel between what can be seen and interacted with in storybook and 
unit tests.  Not only this makes it easier to debug tests, as the code being tested can be interacted with
in storybook; it aims to provide a framework and process around development of testable front-end code.

The main principles are:
- Components are the main units of delivery,
- Sign off and first round of feedback from testing teams to be provided directly on stories (and not on a deployed application),
- All variations of components to be show cased, including the happy path and at least main unhappy paths.


## Getting Started

First, run the development server:

```bash
npm run dev
# to run storybook
npm run storybook
# to run tests:
npm run test
```
