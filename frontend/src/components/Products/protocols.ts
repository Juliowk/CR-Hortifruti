export interface IProducts {
  _id: string;
  name: string;
  price: number;
  image: string;
}

export interface IArrayProducts {
  products: IProducts[];
}

export interface SingleProductProps {
  product: IProducts;
}
