import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Cards from "@/components/Utils/Cards"
import Image1 from "@/assets/burger-5.png"
import Image2 from "@/assets/burger-3.jpg"
import Image3 from "@/assets/burger-4.jpg"
import Image4 from "@/assets/burger-2.jpg"

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
          <Col lg={{span: 8, offset:2}} className='text-center mb-5'>
           <h2>Les Burgers Star</h2>
           <p className='paragraph'>Oubliez les burgers classiques ! Laissez-vous tenter par nos créations originales et audacieuses. Découvrez nos burgers signatures, une explosion de goûts qui vous fera voyager à chaque bouchée.</p>
          </Col>
        </Row>
        <Row>{mockData.map((cardData, index)=>(
          <Cards key={index} data={cardData} />
        ))}</Row>
        <Row className='pt-5'>
          <Col sm={6} lg={5} >
            <div className="ads_box ads_img1 mb-5 mb-md-0">
              <h4>Avec tout nos burgers</h4>
              <h5>Frites Maison</h5>
              <Link to='/' className='btn btn-red px-4 rounded-0'>
                En savoir plus
              </Link>
            </div>
          </Col>
          <Col sm={6} lg={7} >
            <div className="ads_box ads_img2">
              <h4>Avec tout nos burgers</h4>
              <h5>Frites Maison</h5>
              <Link to='/' className='btn btn-red px-4 rounded-0'>
                En savoir plus
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Section3