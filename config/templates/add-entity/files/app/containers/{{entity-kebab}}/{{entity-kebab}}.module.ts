/**
 * {{Entity Words}} module
 */

import { Routes, RouterModule } from '@angular/router';
import { ExitEditGuard } from '@shared/helpers/edit-guard/edit-guard.helper';

// modules
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DmComponentsModule } from '@components/dm.components.module';
import { ListModule } from '../list/list.module';

// containers
import { {{EntityPascal}}EditContainerComponent } from './containers';
import { XUXListContainerComponent } from '../base';

import { {{EntityPascal}}Service } from '@shared/services';

const data = {{EntityPascal}}Service.config;

// routes
const routes: Routes = [
  {
    data,
    path: '',
    component: XUXListContainerComponent,
  },
  {
    data,
    path: 'add',
    component: {{EntityPascal}}EditContainerComponent,
    canDeactivate: [ExitEditGuard],
  },
  {
    data,
    path: ':id',
    component: {{EntityPascal}}EditContainerComponent,
    canDeactivate: [ExitEditGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    DmComponentsModule,
    ListModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    {{EntityPascal}}EditContainerComponent,
  ],
  exports: [
    CommonModule,
    DmComponentsModule,
    {{EntityPascal}}EditContainerComponent,
    RouterModule,
  ],
  providers: [ExitEditGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class {{EntityPascal}}Module { }
