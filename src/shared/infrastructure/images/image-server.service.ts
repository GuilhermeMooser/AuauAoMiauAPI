import { Inject, Injectable, Logger } from '@nestjs/common';
import { writeFile, mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { StorageConstants } from 'src/shared/application/constants/storage-constants';

import * as fs from 'fs/promises';
import { existsSync } from 'fs';
import {
  GetImagesByPathResponse,
  ImageService,
  Image,
} from '@/shared/application/images/image.service';
import type { EnvConfig } from '../env-config/env-config.interface';

@Injectable()
export class ImageServerService implements ImageService {
  private storageBaseUrl: string;
  private readonly logger = new Logger(ImageServerService.name);

  constructor(@Inject('EnvConfig') envConfig: EnvConfig) {
    this.storageBaseUrl = envConfig.getImageStorageBaseUrl();
  }

  async uploadImage(image: Buffer, path: string): Promise<string> {
    if (image.byteLength <= 0) return '';
    const fullPath = join(StorageConstants.dirPath, path);
    this.logger.log('ImageServerService ~ uploadimage ~ fullPath:', fullPath);
    const directory = dirname(fullPath);

    if (!existsSync(directory)) {
      await mkdir(directory, { recursive: true });
    }

    await writeFile(fullPath, image);

    this.logger.log('ImageServerService ~ upload ~ fullPath:', fullPath);

    const fileReference = path.replace(/\\/g, '/');
    return fileReference;
  }

  async getImagesByPath(folder: string): Promise<GetImagesByPathResponse> {
    const targetDir = join(folder);

    try {
      const files = await fs.readdir(targetDir);

      const images: Image[] = files.map(file => ({
        name: file,
        directory: folder,
        url: `${this.storageBaseUrl}/${folder}/${file}`.replace(/\\/g, '/'),
      }));

      return {
        images,
      };
    } catch (error) {
      console.error('Erro ao ler diretório:', error);
      return {
        images: [],
      };
    }
  }

  async urlToPureSvg(url: string): Promise<string> {
    const fallbackUrl = `${this.storageBaseUrl}/utils/unavailable.svg`;

    try {
      let response = await fetch(url);

      if (!response.ok) {
        response = await fetch(fallbackUrl);
      }

      return await response.text();
    } catch (error) {
      const fallbackResponse = await fetch(fallbackUrl);
      return await fallbackResponse.text();
    }
  }

  getImageStorage(
    imageType: string,
    imageReference: string | number,
    showExtension?: boolean,
  ): string {
    const encodedImageReference = imageReference
      ?.toString()
      .replace(/\.(png|jpg)/g, '.svg');

    const hasExtension =
      encodedImageReference.includes('.png') ||
      encodedImageReference.includes('.jpg') ||
      encodedImageReference.includes('.svg') ||
      encodedImageReference.includes('.pdf') ||
      encodedImageReference.includes('.webp');

    return `${this.storageBaseUrl}/${imageType}/${encodedImageReference}${
      !hasExtension && showExtension ? '.svg' : ''
    }?alt=media`;
  }

  async uploadPdf(pdf: Buffer, path: string): Promise<string> {
    if (pdf.byteLength <= 0) return '';
    const fullPath = join(StorageConstants.dirPath, path);
    this.logger.log('ImageServerService ~ uploadPdf ~ fullPath:', fullPath);
    const directory = dirname(fullPath);

    if (!existsSync(directory)) {
      await mkdir(directory, { recursive: true });
    }

    // if (existsSync(fullPath)) {
    //   this.logger.log('ImageServerService ~ upload ~ Unlink');
    //   await fs.unlink(fullPath);
    // }

    await writeFile(fullPath, pdf);

    this.logger.log('ImageServerService ~ upload ~ fullPath:', fullPath);

    // Continua salvando no storage antigo temporariamente
    // await this.temporaryImageService.uploadPdf(pdf, path);

    const fileReference = path.replace(/\\/g, '/');
    return fileReference;
  }

  async deleteByPath(path: string): Promise<void> {
    const fullPath = join(StorageConstants.dirPath, path);

    await fs.unlink(fullPath);
  }
}
