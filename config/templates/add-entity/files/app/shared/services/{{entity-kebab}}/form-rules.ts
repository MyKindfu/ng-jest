import {
  FieldList,
  FormGroupRules,
  FormRules,
} from '@components/form/services';
import {
  WIDGET_COMPONENT,
  IBaseFormService,
  ENTITY_TYPES,
} from '@shared/types';
import { merge } from 'lodash';
import { FIELD_DEFINITIONS } from '@config/field-definitions';

export const createFormRules = (formService: IBaseFormService<ENTITY_TYPES.{{ENTITY_CAPS}}>): FormRules => {
  const sections: FieldList = {
    general_section: {
      widget: WIDGET_COMPONENT.panel_group,
      title: 'General',
    },
    availability_section: {
      widget: WIDGET_COMPONENT.panel_group,
      title: 'Availability',
      description: 'Determine if the {{Entity Words}} is available at your locations.',
    },
  };

  const panelGroups: FormGroupRules[] = [
    {
      name: 'General',
      fields: [
        'general_section',
      ],
    },
    {
      name: 'Availability',
      fields: [
        'availability_section',
      ],
    },
    {
      id: 'general_section',
      fields: [
        'name',
      ],
    },
    {
      id: 'availability_section',
      fields: ['virtual.mappings'],
    },
  ];

  return {
    defaultGroup: false,
    groups: [
      ...panelGroups,
    ],
    fields: {
      ...sections,
      name: {
        title: '{{Entity Words}} Name',
      },
    },
    virtual: {
      properties: {
        mappings: merge({}, FIELD_DEFINITIONS.ACTIVE_MAPPINGS, {
          widgetData: {
            schedulingDataFn: formService.schedulingValue.bind(formService),
          },
        }),
      },
    },
  };
};
