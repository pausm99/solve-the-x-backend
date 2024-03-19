import { calculateStatistics } from '../../src/controllers/statsController';

describe('calculateStatistics', () => {
    it('should return valid statistics', async () => {

        const stats = await calculateStatistics();

        expect(stats).toHaveProperty('totalPlayers');
        expect(stats).toHaveProperty('avgHeight');
        expect(stats).toHaveProperty('avgWeight');
        expect(stats).toHaveProperty('topPosition');
    });
});
