import { describe, expect, it } from 'vitest';
import { RequestEvent } from '@builder.io/qwik-city';
import { onGet } from './index';

describe('health endpoint', () => {
  it('should be true', () => {
    expect(true).toBe(true);
  });
  it('should return healthy', async () => {
    let result: { status?: number; data?: unknown } = {};
    const request = {
      json: (status: number, data: unknown) => (result = { status, data }),
    } as unknown as RequestEvent;
    await onGet(request);

    expect(result?.status).toBe(200);
    expect(result?.data).toStrictEqual({ healthy: true });
  });
});
