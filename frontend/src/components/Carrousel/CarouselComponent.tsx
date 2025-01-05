import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "../ExampleCarouselImage";

function CarouselComponent() {
  return (
    <Carousel>
      <Carousel.Item>
        <ExampleCarouselImage text="Primeiro slide" />
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Segundo slide" />
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Terceiro slide" />
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Quarto slide" />
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Quinto slide" />
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Sexto slide" />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComponent;
