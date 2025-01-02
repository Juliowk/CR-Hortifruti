export interface IDeleteRespository {
    delete(id: string): Promise<void>;
}