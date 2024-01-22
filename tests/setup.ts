import { setConfig } from 'next/config';
import { config } from 'dotenv';
import '@testing-library/jest-dom';

// This import will prevent setTimeout errors caused by javascript
import 'core-js';

const { publicRuntimeConfig, serverRuntimeConfig } = require('../next.config');

config({ path: '.env.test' });

setConfig({ publicRuntimeConfig, serverRuntimeConfig });

global.fetch = jest.fn().mockImplementation((data) =>
  Promise.resolve({
    ok: true,
    json: () => data,
  })
);
global.ResizeObserver = jest.fn().mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
});

process.env.LOG_LEVEL = 'trace';
