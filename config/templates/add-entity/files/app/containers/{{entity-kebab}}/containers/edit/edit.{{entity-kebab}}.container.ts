/**
 * {{Entity Words}} editor container
 */
import {
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BaseEditorContainerComponent } from '@containers/base';
import { lazyInject } from '@containers/base/decorators/lazy-inject.decorator';
import {
  {{EntityPascal}}FormService,
} from '@shared/services/{{entity-kebab}}/{{entity-kebab}}.form.service';
import { FormRules } from '@shared/types';

@Component({ // tslint:disable-line:prefer-on-push-component-change-detection
  selector: 'xux-{{entity-kebab}}-edit-container',
  templateUrl: '../../../base/editor/xux-edit.base.container.html',
  styleUrls: ['../../../base/editor/xux-edit.base.container.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class {{EntityPascal}}EditContainerComponent extends BaseEditorContainerComponent {
  @lazyInject({{EntityPascal}}FormService) public entityFormService: {{EntityPascal}}FormService;

  public xuxTheme: boolean = true;
  public formRules: FormRules = this.entityFormService.createFormRules(this);
}
