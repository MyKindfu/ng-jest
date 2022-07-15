import { {{EntityPascal}}Service } from './{{entity-kebab}}.service';
import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ENTITY_TYPES } from '../../types/enums';
import { StateService } from '@shared/services';

describe('SCENARIO: {{EntityPascal}}Service testing', () => {

  let service: {{EntityPascal}}Service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {{EntityPascal}}Service,
        { provide: StateService, useValue: {} },
      ],
    });
  });

  beforeEach(inject([{{EntityPascal}}Service], ({{entityCamel}}Service) => {
    service = {{entityCamel}}Service;
  }));

  describe('WHEN: {{EntityPascal}}Service initialized', () => {
    it('THEN: should have correct configuration', () => {
      expect(service).toBeDefined();
      expect(service.config.ENTITY_TYPE).toEqual(ENTITY_TYPES.{{ENTITY_CAPS}});
    });
  });
});
