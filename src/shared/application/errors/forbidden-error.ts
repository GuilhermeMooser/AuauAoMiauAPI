export class ForbiddenError extends Error {
  constructor(public message: string = 'Forbidden') {
    super(message);
    this.name = 'ForbiddenError';
  }
}
