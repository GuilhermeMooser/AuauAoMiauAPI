export type Image = {
  url: string;
  name: string;
  directory: string;
};

export type ImageSize = {
  width: number;
  height: number;
};

export type GetImagesByPathResponse = { images: Image[]; pageToken?: string };

export type ImageServiceOptions = {
  previousPageToken?: string;
  limit?: number;
};
export interface ImageService {
  getImagesByPath(
    folder: string,
    options?: ImageServiceOptions,
  ): Promise<GetImagesByPathResponse>;

  urlToPureSvg(url: string): Promise<string>;

  getImageStorage(
    imageType: string,
    imageReference: string | number,
    showExtension?: boolean,
  ): string;

  uploadPdf(pdf: Buffer, path: string): Promise<string>;

  uploadImage(image: Buffer, path: string): Promise<string>;

  deleteByPath(path: string): Promise<void>;
}
