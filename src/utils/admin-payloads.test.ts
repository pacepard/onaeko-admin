import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
    coursePayload,
    csv,
    entityId,
    eventPayload,
    modulePayload,
    programPayload,
    rowsOf,
} from './admin-payloads.ts';

describe('P132 program payloads', () => {
    it('sends editorial fields and a publish status', () => {
        const payload = programPayload({
            title: 'AI Education',
            slug: 'ai-education',
            description: 'Editorial',
            hostName: 'Onaeko',
            partnerName: 'Greylight Ventures',
            outcomes: 'Learn, Teach',
            whoFor: 'Educators',
            whoNotFor: 'Spectators',
            tags: 'AI, Education',
            facultyName: 'Casey Winters',
            facultyTitle: 'Faculty',
            status: 'published',
        });
        assert.deepEqual(payload.outcomes, ['Learn', 'Teach']);
        assert.equal(payload.status, 'published');
        assert.equal(payload.faculty[0]?.name, 'Casey Winters');
    });
});

describe('P133 course and module payloads', () => {
    it('sends prices as major units and recording as a URL object', () => {
        const course = coursePayload({
            title: 'Growth Engineering',
            slug: 'growth-engineering',
            description: 'Editorial',
            price: '642000',
            scholarshipPrice: '65000',
            shopUrl: 'https://paystack.com/pay/growth',
            hostName: 'Onaeko',
            status: 'published',
            scholarshipEnabled: true,
        });
        assert.equal(course.price, 642000);
        assert.equal(course.scholarshipPrice, 65000);
        assert.equal(course.scholarshipEnabled, true);

        const module = modulePayload({
            title: 'Module 01',
            description: 'Admin module',
            order: 1,
            startsAt: '2026-09-14T10:00:00.000Z',
            endsAt: '2026-09-14T11:00:00.000Z',
            instructorName: 'Damola Oladipo',
            meetingUrl: 'https://zoom.us/j/module',
            recordingUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        });
        assert.equal(module.meetingUrl, 'https://zoom.us/j/module');
        assert.equal(
            module.recording?.url,
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        );
    });
});

describe('P134 event payloads', () => {
    it('sends hosts, schedule, and recording URL fields', () => {
        const payload = eventPayload({
            title: 'Engineering Leadership',
            description: 'Session',
            scheduledAt: '2026-09-14T10:00:00.000Z',
            endsAt: '2026-09-14T11:00:00.000Z',
            hostName: 'Damola Oladipo',
            meetingUrl: 'https://zoom.us/j/admin',
            recordingUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            timezone: 'Africa/Lagos',
            venue: 'Zoom',
        });
        assert.equal(payload.hosts[0]?.name, 'Damola Oladipo');
        assert.equal(payload.recordingUrl.startsWith('https://'), true);
    });
});

describe('P131 list helpers', () => {
    it('reads envelope items and entity ids', () => {
        assert.deepEqual(csv('AI, Education'), ['AI', 'Education']);
        assert.equal(entityId({ _id: 'abc' }), 'abc');
        assert.equal(rowsOf({ items: [{ slug: 'a' }] }).length, 1);
    });
});
