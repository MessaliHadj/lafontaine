import { Container, Row, Carousel } from 'react-bootstrap'
import User1 from '@/assets/review-author-1.jpg'
import User2 from '@/assets/review-author-2.jpg'
import User3 from '@/assets/review-author-3.jpg'
import User4 from '@/assets/review-author-5.jpg'


const Section6 = () => {
  return (
    <section className='review_section'>
      <div className="mask"></div>
      <Container>
        <Row className='justify-content-between'>
          <Carousel>
            <Carousel.Item className='py-5'>
              <div className="content d-flex justify-content-center flex-column">
                <div className="user_img d-flex justify-content-center">
                  <img src={User1} className='img-fluid rounded-circle w-25' alt="comment 1" />
                </div>
                <div className="text-center">
                  <p className='mt-2 mx-auto'>C'est le meilleur burger de la rive droite. Je recommande !</p>
                  <div className="item_rating mb-2">
                    <i className='bi bi-star-fill'></i>
                    <i className='bi bi-star-fill'></i>
                    <i className='bi bi-star-fill'></i>
                    <i className='bi bi-star-fill'></i>
                    <i className='bi bi-star-fill'></i>
                  </div>
                  <h3>PAR JULIEN A.</h3>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item className='py-5'>
              <div className="content d-flex justify-content-center flex-column">
                <div className="user_img d-flex justify-content-center">
                  <img src={User2} className='img-fluid rounded-circle w-25' alt="comment 2" />
                </div>
                <div className="text-center">
                  <p className='mt-2 mx-auto'>On a passé un bon moment en famille, la commande est arrivée vite et les enfants ont apprécié. Nous reviendrons.</p>
                  <div className="item_rating mb-2">
                    <i className='bi bi-star-fill'></i>
                    <i className='bi bi-star-fill'></i>
                    <i className='bi bi-star-fill'></i>
                    <i className='bi bi-star-fill'></i>
                    <i className='bi bi-star-fill'></i>
                  </div>
                  <h3>PAR JESSICA F.</h3>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item className='py-5'>
              <div className="content d-flex justify-content-center flex-column">
                <div className="user_img d-flex justify-content-center">
                  <img src={User3} className='img-fluid rounded-circle w-25' alt="comment 3" />
                </div>
                <div className="text-center">
                  <p className='mt-2 mx-auto'>J'ai découvert par hasard le croger et je n'imaginais pas à quel point c'est délicieux ! Des frites maison, un pain maison, une viande halal... un régal ! 5 étoiles largement méritées. </p>
                  <div className="item_rating mb-2">
                    <i className='bi bi-star-fill'></i>
                    <i className='bi bi-star-fill'></i>
                    <i className='bi bi-star-fill'></i>
                    <i className='bi bi-star-fill'></i>
                    <i className='bi bi-star-fill'></i>
                  </div>
                  <h3>PAR YANIS K.</h3>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item className='py-5'>
              <div className="content d-flex justify-content-center flex-column">
                <div className="user_img d-flex justify-content-center">
                  <img src={User4} className='img-fluid rounded-circle w-25' alt="comment 4" />
                </div>
                <div className="text-center">
                  <p className='mt-2 mx-auto'>J'ai goûté le meilleur burger de ma vie à la fontaine. Des gens sympas, une bonne cuisine. C'est une nouvelle adresse dans mes favoris.</p>
                  <div className="item_rating mb-2">
                    <i className='bi bi-star-fill'></i>
                    <i className='bi bi-star-fill'></i>
                    <i className='bi bi-star-fill'></i>
                    <i className='bi bi-star-fill'></i>
                    <i className='bi bi-star-fill'></i>
                  </div>
                  <h3>PAR DANA T.</h3>
                </div>
              </div>
            </Carousel.Item>
        </Carousel>
        </Row>
      </Container>
    </section>
  )
}

export default Section6