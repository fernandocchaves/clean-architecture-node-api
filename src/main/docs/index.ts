import paths from './paths';
import schemas from './schemas';
import components from './components';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description:
      'API do curso do Mango para realizar enquete entre programadores',
    version: '1.0.0',
    contact: {
      name: 'Fernando Cezar Chaves',
      email: 'fernandocchaves@gmail.com',
      url: 'https://www.linkedin.com/in/fernandocchaves',
    },
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html',
    },
  },
  servers: [{ url: '/api' }],
  tags: [{ name: 'Login' }, { name: 'Enquete' }],
  paths,
  schemas,
  components,
};
