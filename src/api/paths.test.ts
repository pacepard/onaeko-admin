import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { ApiPath } from './paths.ts';

describe('P131 admin paths', () => {
    it('uses mounted admin catalogue suffixes', () => {
        assert.equal(ApiPath.adminPrograms, '/admin/programs');
        assert.equal(ApiPath.adminScholarships, '/admin/scholarships');
        assert.equal(ApiPath.loggedInUser, '/user/');
        assert.equal(
            ApiPath.adminEvent('prog', 'evt'),
            '/admin/programs/prog/events/evt',
        );
        assert.equal(
            ApiPath.adminModule('course', 'mod'),
            '/admin/courses/course/modules/mod',
        );
    });
});
