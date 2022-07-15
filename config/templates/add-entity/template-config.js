let entityKebab = '';

module.exports.placeholders = [
  {
    name: 'Entity name in kebab-case',
    signature: '{{entity-kebab}}',
    set value(v) { entityKebab = v },
    get value() { return entityKebab }
  },
  {
    name: 'Entity name in PascalCase',
    signature: '{{EntityPascal}}',
    get defaultValue() {
      return entityKebab.replace(/-?(\b[a-z])/g, (g, x) => x[0].toUpperCase())
    },
    auto: true
  },
  {
    name: 'Entity name in camelCase',
    signature: '{{entityCamel}}',
    get defaultValue() {
      return entityKebab.replace(/-(\b[a-z])/g, g => g[1].toUpperCase())
    },
    auto: true
  },
  {
    name: 'Entity name in CAPS_CASE',
    signature: '{{ENTITY_CAPS}}',
    get defaultValue() {
      return entityKebab.toUpperCase().replace(/-/g, '_')
    },
    auto: true
  },
  {
    name: 'Entity name as Capitalized Words',
    signature: '{{Entity Words}}',
    get defaultValue() {
      return entityKebab.replace(/-/g, ' ')
        .replace(/(\b[a-z])/g, (g, x) => x[0].toUpperCase())
    },
    auto: true
  },
];
