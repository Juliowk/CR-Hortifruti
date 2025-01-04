export interface IUpdateParams {
  name?: string;
}

export interface IUpdateRepository {
  update(id: string, params: IUpdateParams): Promise<void>;
}
