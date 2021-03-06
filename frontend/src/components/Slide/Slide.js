// Import Bootstrap components
import { Carousel, Image, Container, Row } from "react-bootstrap";
import "./Slide.css";

// All assets have to be imported from folder
const header = require("../../assets/images/Roade_header5.png");

function Slide() {
  return (
    <div>
      {/* Header image */}
      <Image src={header} alt="Roade header" className="image-test"></Image>
    </div>
  );
}

export default Slide;
