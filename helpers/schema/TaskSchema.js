const schema = {
  'id': '/TaskSchema',
  'type': 'object',
  'required': true,
  'properties': {
    'name': { 'type': 'string', 'required': true },
    'image': { 'type': 'string', 'required': true },
    'time': { 'type': 'integer', 'required': true },
    'scheduled': {
      'required': false,
    },
    'completed': { 'type': 'boolean', 'required': true },
    'dateCompleted': { 'required': false },
    'score': { 'type': 'integer', 'required': true },
    'questions': {
      'type': 'array',
      'required': true,
      'minItems': 1,
      'items': {
        'type': 'object',
        'properties': {
          'number': { 'type': 'integer' },
          'questionText': { 'type': 'string' },
          'image': {
            ' type': ['string', 'null'],
            'required': false,
          },
          'answers': {
            'type': 'array',
            'minItems': 2,
            'maxItems': 4,
            'items': {
              'type': 'object',
              'properites': {
                'text': { 'type': 'string', 'required': false },
                'correct': { 'type': 'boolean' },
                'image': {
                  'type': ['string', 'null'],
                  'required': false,
                },
              },
            },
          },
        },
      },
    },
  },
};

export default schema;
