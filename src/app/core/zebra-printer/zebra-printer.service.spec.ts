import { TestBed, inject } from '@angular/core/testing';

import { ZebraPrinterService } from './zebra-printer.service';

describe('ZebraPrinterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZebraPrinterService]
    });
  });

  it('should be created', inject(
    [ZebraPrinterService],
    (service: ZebraPrinterService) => {
      expect(service).toBeTruthy();
    }
  ));
});
