import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import Chef from "@/assets/chef.png";
import Salad from "@/assets/salad.png";
import Earth from "@/assets/earth.png";

const mockData = [
  {
    image: Chef,
    title: "Authenticité",
    paragraph: `Nous respectons les recettes traditionnelles tout en apportant notre touche unique pour garantir une expérience authentique à chaque bouchée. Nous innovons constamment pour proposer des recettes originales et surprenantes, tout en restant fidèles à l'esprit du burger.`,
  },
  {
    image: Salad,
    title: "Qualité",
    paragraph: `Nous appliquons des standards stricts de contrôle qualité à chaque étape de notre processus, de la sélection des ingrédients à la préparation des plats. Nous restons à l'écoute des tendances et des attentes de nos clients pour adapter nos offres et créer des nouveautés qui vous séduiront.`,
  },
  {
    image: Earth,
    title: "Durabilité",
    paragraph: `Nous intégrons des pratiques durables dans notre processus d'innovation, en minimisant notre impact environnemental et en favorisant des ingrédients locaux et biologiques.`,
  },
];

const Section2 = () => {
  return (
    <>
      <section className="about_section">
        <Container>
          <Row>
            <Col lg={{span:8, offset:2}} className="text-center">
              <h2>La Font'n : Le burger autrement, avec une qualité qui coule de source.</h2>
              <p>
                Plongez dans la fraîcheur irrésistible de La Font'n avec des produits de la plus haute qualité, composés d'ingrédients frais et soigneusement sélectionnés.
              </p>
              <Link to="/" className="btn order_now btn-red">Decouvrez toute la carte</Link>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="about_wrapper">
        <Container>
          <Row className="justify-content-md-center">
              {mockData.map((cardData, index)=>(
                <Col key={index} md={6} lg={4} className="mb-4 mb-md-0">
                  <div className="about_box text-center">
                    <div className="about_icon">
                      <img src={cardData.image} className="img-fluid" alt="icon" />
                    </div>
                    <h3>{cardData.title}</h3>
                    <p>{cardData.paragraph}</p>
                  </div>
                </Col>
              ))}
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Section2