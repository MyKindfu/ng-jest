/**
 * {{Entity Words}} service
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColDef } from 'ag-grid-community';

import { BaseService } from '../base';
import { EntityConfig,
  ENTITY_TYPES,
  CELL_RENDERER,
} from '@shared/types';
import { StateService } from '../state-service/state.service';

const entityType: ENTITY_TYPES = ENTITY_TYPES.{{ENTITY_CAPS}};
const config: EntityConfig = {
  ENTITY_TYPE: entityType,
  isMasterListAvailable: true,
  buttons: null,
  apiEndpoint: entityType,
  uiRoute: entityType,
  list: {
    columns: [
      {
        path: 'name',
        title: 'Name',
        filterType: 'stringFilter',
        filterParams: {
          quickFilter: true,
        },
        sortable: true,
        cellRenderer: CELL_RENDERER.entity_link_renderer,
        defaultView: true,
      },
    ],
  },
};

/**
 * {{Entity Words}} service that extends BaseService to use
 * basic CRUD request operations
 */
@Injectable()
export class {{EntityPascal}}Service extends BaseService {

  public static config: EntityConfig = config;
  public static ENTITY_TYPE: string = config.ENTITY_TYPE;

  public quickFilterFields: string[] = ['name'];

  public listProjection: string[] = ['name'];

  public headerNames: ColDef[] = [
    {
      headerName: 'Name',
      field: 'name',
      filter: false,
    },
  ];

  constructor(
    public http: HttpClient,
    public stateService: StateService,
  ) {
    super(http, stateService);
    this.config = {{EntityPascal}}Service.config;
  }
}

