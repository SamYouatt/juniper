const schema = {
  'id': '/TaskSchema',
  'type': 'object',
  'properties': {
    'name': { 'type': 'string' },
    'image': { 'type': 'string' },
    'time': { 'type': 'integer' },
    'scheduled': {
      'type': 'date',
      'required': false,
    },
    'completed': { 'type': 'boolean' },
    'questions': {
      'type': 'array',
      'properties': {
        'number': { 'type': 'integer' },
        'question-text': { 'type': 'string' },
        'image': {
          ' type': 'string',
          'required': false,
        },
        'answers': {
          'type': 'array',
          'properites': {
            'text': { 'type': 'string' },
            'correct': { 'type': 'boolean' },
            'image': {
              'type': 'string',
              'required': false,
            },
          },
        },
      },
    },
  },
};

export default schema;
