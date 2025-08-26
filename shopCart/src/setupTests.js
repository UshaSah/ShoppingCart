import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock fetch globally for API tests
global.fetch = vi.fn();

// Mock console methods to reduce noise in tests
global.console = {
    ...console,
    log: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
};

// Clean up after each test
afterEach(() => {
    vi.clearAllMocks();
}); 