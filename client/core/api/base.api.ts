export abstract class BaseAPI {
  create(): unknown {
    throw new Error('Not implemented');
  }

  request(): unknown {
    throw new Error('Not implemented');
  }

  update(): unknown {
    throw new Error('Not implemented');
  }

  delete(): unknown {
    throw new Error('Not implemented');
  }
}
