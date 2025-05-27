import { TestBed } from '@angular/core/testing';

import { FileUploadingService } from './file-uploading.service';

describe('FileUploadingService', () => {
  let service: FileUploadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUploadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
