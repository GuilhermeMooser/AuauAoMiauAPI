export class ResourceNotFoundError extends Error {
  constructor(public message: string = 'Resource was not found') {
    super(message);
    this.name = 'ResourceNotFoundError';
  }
}
