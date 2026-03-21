import { join } from 'path';

export class StorageConstants {
  static readonly dirPath =
    process.env.STORAGE_PATH ?? join(process.cwd(), 'storage');
}
