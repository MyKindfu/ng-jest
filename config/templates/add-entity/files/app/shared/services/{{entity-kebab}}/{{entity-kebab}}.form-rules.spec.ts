import { FormRules } from '@shared/types';
import { createFormRules } from './form-rules';

const formServiceMock: any = {
  _id: 'test',
  schedulingValue: jest.fn(),
};

describe('SCENARIO: {{Entity Words}} Form rules', () => {
  const formRules: FormRules = createFormRules(formServiceMock);

  describe('WHEN: form rules are created', () => {
    it('THEN: it should have right field properties', () => {
      expect(formRules.fields.name.title).toEqual('{{Entity Words}} Name');
    });
  });
});
