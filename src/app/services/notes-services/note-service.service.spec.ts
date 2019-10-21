import { TestBed } from '@angular/core/testing';
import { NoteServiceService } from './note-service.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('NoteServiceService', () => {

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  it('should be created', () => {
    const service: NoteServiceService = TestBed.get(NoteServiceService);
    expect(service).toBeTruthy();
  });
});
