import { useEffect, useState } from "react";
import Carousel_Component from "./components/Carrousel/CarouselComponent";
import Navbar_Component from "./components/Navbar/NavbarComponent";
import Products_Grid_Component from "./components/Products/ProductsGridComponent";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      import.meta.env.VITE_URL_GET_PRODUCTS_DEV || import.meta.env.VITE_URL_GET_PRODUCTS_PROD)
      .then((result) => {
        if (!result.ok) throw new Error("Request error");
        return result.json();
      })
      .then((json) => {
        setProducts(json);
      })
      .catch((error) => {
        console.error(`Erro: ${error}`);
      });
  }, []);

  return (
    <>
      <Navbar_Component />
      <Carousel_Component />
      <Products_Grid_Component products={products}/>
    </>
  );
}

export default App;
