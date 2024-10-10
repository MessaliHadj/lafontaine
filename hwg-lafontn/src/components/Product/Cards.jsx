import { useState } from 'react';
import { Link } from 'react-router-dom'
import { Col, Card } from 'react-bootstrap'

const Cards = ({data}) => {
  const {id, image, title, paragraph, rating, price} = data;
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  const [heart, setHeart] = useState(false);

  const addFavorite = ()=>{
    setHeart(prevState => !prevState);
  }

  return (
    <Col sm={6} lg={4} xl={3} className='mb-4' >
      <Card className='overflow-hidden'>
        <div className='overflow-hidden'>
          <Card.Img variant="top" src={image} alt={`photo de ${title}`} />
        </div>
        <Card.Body>
          <div className='d-flex align-items-center justify-content-between' style={{height: '30px'}}>
            <div className="item_rating">   
              {Array.from({ length: fullStars }).map((_, index) => (
                <i key={index} className="text-warning bi bi-star-fill" ></i>
              ))}
              {halfStar && <i className="text-warning bi bi-star-half"></i>}
              {Array.from({ length: emptyStars }).map((_, index) => (
                <i key={index} className="text-warning bi bi-star"></i>
              ))}
            </div>
            <div className="wishlist">
              <i onClick={addFavorite} className={`text-danger bi ${heart ? "bi-heart-fill" : "bi-heart"}`}></i>
            </div>
          </div>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{paragraph}</Card.Text>
          <div className='d-flex align-items-center justify-content-between'>
            <div className="menu_price">
              <h5 className='mb-0'>{price.toFixed(2)}€</h5>
            </div>
            <div className="add_to_cart">
              <Link to='/'>
                <i className='bi bi-bag me-2'></i>
                Ajouter au panier
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default Cards