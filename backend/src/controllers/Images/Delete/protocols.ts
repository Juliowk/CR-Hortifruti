export interface IDeleteImageRepository {
  deleteImage(id: string): Promise<void>;
}
