import { WsGuard } from '../guards/ws.guard';

describe('WsGuard', () => {
  it('should be defined', () => {
    expect(new WsGuard()).toBeDefined();
  });
});
