export interface IUpdateParams {
  name?: string;
  price?: number;
  image?: string;
}

export interface IUpdateRepository {
  update(id: string, params: IUpdateParams): Promise<void>;
}
