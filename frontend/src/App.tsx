import { useEffect, useState } from "react";
import Carousel_Component from "./components/Carrousel/CarouselComponent";
import Navbar_Component from "./components/Navbar/NavbarComponent";
import Products_Grid_Component from "./components/Products/ProductsGridComponent";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/products")
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

  console.log(products);  

  return (
    <>
      <Navbar_Component />
      <Carousel_Component />
      <Products_Grid_Component />
    </>
  );
}

export default App;
