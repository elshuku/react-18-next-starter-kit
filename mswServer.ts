import { setupServer } from 'msw/node'
import {RestHandler} from "msw";

/**
 * setup msw for jest tests
 *
 */
const server = setupServer()

export const addMocks = (server, mocks: [RestHandler]) => {
  server.use(...mocks);
}

export const addMocksFromStory = (server, story) => {
  const mswHandlers = story?.parameters?.msw?.handlers;
  addMocks(server, mswHandlers);
}

export default server;
