import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { setupTestBed } from '@test/setup-testbed';
import {
  MockNgRedux,
  NgReduxTestingModule,
} from '@angular-redux/store/testing';
import { baseEditContainerMocks } from '@app/containers/edit-containers-test.mock';

import { {{EntityPascal}}EditContainerComponent } from './edit.{{entity-kebab}}.container';
import { {{EntityPascal}}FormService } from '@shared/services/{{entity-kebab}}/{{entity-kebab}}.form.service';

describe('SCENARIO: {{EntityPascal}}EditContainerComponent testing', () => {
  let comp: {{EntityPascal}}EditContainerComponent;
  let fixture: ComponentFixture<{{EntityPascal}}EditContainerComponent>;

  setupTestBed({
    declarations: [{{EntityPascal}}EditContainerComponent],
    imports: [NgReduxTestingModule],
    providers: [
      ...baseEditContainerMocks,
      {{EntityPascal}}FormService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  });

  beforeEach(() => {
    fixture = TestBed.createComponent({{EntityPascal}}EditContainerComponent);
    comp = fixture.componentInstance;
    comp.entityConfig.isFormServiceSupported = true;

    MockNgRedux.reset();
  });

  describe('WHEN: the component is initialized', () => {
    it('THEN: component instance should exist', () => {
      fixture.detectChanges();
      expect(fixture).toBeDefined();
      expect(comp).toBeDefined();
    });
  });
});
