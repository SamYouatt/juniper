const schema = {
  'id': '/TaskSchema',
  'type': 'object',
  'required': true,
  'properties': {
    'name': { 'type': 'string', 'required': true },
    'image': { 'type': 'string', 'required': true },
    'time': { 'type': 'integer', 'required': true },
    'scheduled': {
      'type': ['date', 'null'],
      'required': false,
    },
    'completed': { 'type': 'boolean', 'required': true },
    'questions': {
      'type': 'array',
      'required': true,
      'minItems': 1,
      'items': {
        'type': 'object',
        'properties': {
          'number': { 'type': 'integer' },
          'question-text': { 'type': 'string' },
          'image': {
            ' type': ['string', 'null'],
            'required': false,
          },
          'answers': {
            'type': 'array',
            'items': {
              'type': 'object',
              'properites': {
                'text': { 'type': 'string' },
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
