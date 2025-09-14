export class ResourceFoundError extends Error {
  constructor(public message: string = 'Resource was found') {
    super(message);
    this.name = 'ResourceFoundError';
  }
}
