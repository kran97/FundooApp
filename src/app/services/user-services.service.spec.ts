import { TestBed } from '@angular/core/testing';
import { UserServicesService } from './user-services.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('UserServicesService', () => {

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  it('should be created', () => {
    const service: UserServicesService = TestBed.get(UserServicesService);
    expect(service).toBeTruthy();
  });
});
