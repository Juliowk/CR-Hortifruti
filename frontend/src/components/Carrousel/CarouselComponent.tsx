import Carousel from "react-bootstrap/Carousel";

function Carousel_Component() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={`/banners/1.jpg`} />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={`/banners/2.jpg`} />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={`/banners/3.jpg`} />
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousel_Component;
