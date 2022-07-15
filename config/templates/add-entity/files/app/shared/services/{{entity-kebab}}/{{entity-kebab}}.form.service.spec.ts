import { TestBed } from '@angular/core/testing';
import {
  MockNgRedux,
  NgReduxTestingModule,
} from '@angular-redux/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { {{EntityPascal}}Service } from './{{entity-kebab}}.service';
import { baseEditContainerMocks } from '@containers/edit-containers-test.mock';
import { setupTestBed } from '@test/setup-testbed';
import { createFormGroupFromSchema } from '@components/form/services/schema-form';
import { {{EntityPascal}}FormService } from './{{entity-kebab}}.form.service';
import { ENTITY_SCHEMAS } from '../../utils/schema-definitions';

const current{{EntityPascal}}Mock = {
  name: '{{EntityPascal}} Name',
  entity_id: '1',
  is_active: true,
  is_master: true,
};

const formRulesMock = {
  fields: {
    name: '',
  },
};

describe(`FEATURE: ${{{EntityPascal}}Service.name}`, () => {
  let {{entityCamel}}FormService: {{EntityPascal}}FormService;
  let initForm: Function;

  setupTestBed({
    imports: [NgReduxTestingModule, HttpClientTestingModule],

    providers: [
      {{EntityPascal}}FormService,
      {{EntityPascal}}Service,
      ...baseEditContainerMocks,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  });

  beforeEach(() => {
    {{entityCamel}}FormService = TestBed.get({{EntityPascal}}FormService);

    initForm = (): Promise<any> => {
      {{entityCamel}}FormService.resolveDocument(current{{EntityPascal}}Mock);
      const form = createFormGroupFromSchema(ENTITY_SCHEMAS.{{ENTITY_CAPS}}_SCHEMA, formRulesMock);
      {{entityCamel}}FormService.resolveForm(form);

      return {{entityCamel}}FormService.formPromise;
    };

    MockNgRedux.reset();
  });


  describe('WHEN: {{entityCamel}}FormService initialized', () => {
    it('THEN: should be defined', () => {
      expect({{entityCamel}}FormService).toBeDefined();
    });

    it('THEN: the form should be initialized and patched with "current{{EntityPascal}}Mock" document', async () => {
      await initForm();

      expect({{entityCamel}}FormService.form).toBeTruthy();
      const formValue = {{entityCamel}}FormService.form.value;

      expect(formValue.name).toEqual(current{{EntityPascal}}Mock.name);
    });
  });
});
