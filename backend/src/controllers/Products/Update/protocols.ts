export interface IUpdateParams {
  name?: string;
  price?: number;
}

export interface IUpdateRepository {
  update(id: string, params: IUpdateParams): Promise<void>;
}
