import { TestBed } from '@angular/core/testing';

import { ParqueaderoService } from './parqueadero.service';

describe('ParqueaderoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ParqueaderoService]
  }));

  it('should be created', () => {
    const service: ParqueaderoService = TestBed.get(ParqueaderoService);
    expect(service).toBeTruthy();
  });
});
