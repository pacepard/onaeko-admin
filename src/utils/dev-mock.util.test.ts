import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
    fail,
    isUseMocksEnabled,
    mockCall,
    ok,
} from './dev-mock.util.ts';

describe('P083 Admin USE_MOCKS gate', () => {
    it('is false when VITE_ENVIRONMENT is not local', () => {
        assert.equal(isUseMocksEnabled('staging', 'true'), false);
        assert.equal(isUseMocksEnabled('production', 'true'), false);
        assert.equal(isUseMocksEnabled(undefined, 'true'), false);
    });

    it('is true only for local + explicit true flag', () => {
        assert.equal(isUseMocksEnabled('local', 'true'), true);
        assert.equal(isUseMocksEnabled('local', undefined), false);
    });
});

describe('P083 Admin mockCall envelope', () => {
    it('returns locked envelope keys for GET /admin/programs', async () => {
        const res = await mockCall({
            type: 'default',
            method: 'GET',
            path: '/admin/programs',
            payload: {},
        });
        assert.equal(res.error, false);
        assert.ok(Array.isArray(res.errors));
        assert.equal(typeof res.message, 'string');
        assert.equal(res.status, 200);
        assert.equal(
            (res.data as { items: Array<{ slug: string }> }).items[0].slug,
            'ai-education',
        );
    });

    it('returns locked envelope keys for POST /admin/courses', async () => {
        const res = await mockCall({
            type: 'default',
            method: 'POST',
            path: '/admin/courses',
            payload: { title: 'Growth Engineering' },
        });
        assert.equal(res.error, false);
        assert.ok(Array.isArray(res.errors));
        assert.equal(typeof res.message, 'string');
        assert.equal(res.status, 200);
        assert.ok((res.data as { _id: string })._id);
    });

    it('ok / fail helpers match the locked shape', () => {
        assert.equal(ok({}).status, 200);
        assert.equal(fail(500, 'x').error, true);
    });
});
