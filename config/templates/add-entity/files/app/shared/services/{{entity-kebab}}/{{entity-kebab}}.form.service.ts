import { Injectable } from '@angular/core';
import { BaseFormService } from '@shared/services';
import {
  CreateFormRules,
  ENTITY_TYPES,
  IBaseFormService,
} from '@shared/types';
import { createFormRules as create{{EntityPascal}}FormRules } from './form-rules';


@Injectable()
export class {{EntityPascal}}FormService extends BaseFormService
  implements IBaseFormService<ENTITY_TYPES.{{ENTITY_CAPS}}> {
  public static ENTITY_TYPE: ENTITY_TYPES = ENTITY_TYPES.{{ENTITY_CAPS}};

  public createFormRulesFunction: CreateFormRules<{{EntityPascal}}FormService> = create{{EntityPascal}}FormRules;
}
