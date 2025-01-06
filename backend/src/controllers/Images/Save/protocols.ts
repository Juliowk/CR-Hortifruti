export interface IImage {
  filename: string;
  path: string;
}

export interface ISaveImageRepository {
  saveImage(imageData: IImage): Promise<void>;
}
