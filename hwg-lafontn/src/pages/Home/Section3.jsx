import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Card from "@/components/Product/Card"
import Image1 from "@/assets/tet.png"

const mockData = [
  {
    id: "0001",
    image: Image1,
    title: "Croger Bourguignon",
    paragraph: "Pain croissant, bœuf bourguignon, pickles, Comté, cheddar, sauce bourguignone.",
    rating: 4.5,
    price: 9.90,
  },
  {
    id: "0002",
    image: Image2,
    title: "Smashed Croger",
    paragraph: "Pain croissant, deux steaks hachés smasher, pickles, laitue, tomates, cornichons, Comté, cheddar, sauce secrète.",
    rating: 4.5,
    price: 9.90,
  },
  {
    id: "0003",
    image: Image3,
    title: "Classic Smashed Burger",
    paragraph: "Pain buns de pommes de terre, deux steaks hachés smasher, oignons bruns caramelisés, jalapeños, laitue, tomates, cornichons, cheddar, Monstery Jack, sauce secrète.",
    rating: 4.2,
    price: 9.90,
  },
  {
    id: "0004",
    image: Image4,
    title: "Rossini Burger",
    paragraph: "Pain buns de pommes de terre, deux steaks hachés smasher, magret de canard, oignons confits, roquette, cheddar, emmental, sauce secrète.",
    rating: 4,
    price: 11.90,
  }
];

const Section3 = () => {
  return (
    <section className='menu_section'>
      <Container>
        <Row>
          <Col lg={{span: 8, offset:2}}>
           <h2>Les Burgers Star</h2>
           <p>Oubliez les burgers classiques ! Laissez-vous tenter par nos créations originales et audacieuses. Découvrez nos burgers signatures, une explosion de goûts qui vous fera voyager à chaque bouchée.</p>
          </Col>
        </Row>
        <Row>{mockData.map((cardData, index)=>(
          <Card key={index} data={cardData} />
        ))}</Row>
      </Container>
    </section>
  )
}

export default Section3