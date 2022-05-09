import React from 'react'
import { Carousel } from 'react-bootstrap'
import ValentineFlower from '../../assets/flowers/valentine-card-roses-and-hearts-on-romantic-background-horizontal-banner-valentines-day-concept-2AJR9RJ.jpeg'
import PurpleFlower from '../../assets/flowers/purple-flowers-green-background-banner-size-copy-space-nice-background-flowers-empty-space-text-purple-199962533.jpeg'
import './HomeHero.css'

function HomeHero() {
  return (
    <>
        <Carousel>
            <Carousel.Item interval={1000}>
            {/* 800x400 */}
                <img
                className="d-block w-100"
                src= { ValentineFlower  }
                alt="Valentine Flowers"
                />
                <Carousel.Caption>
                <h3>Valentine Flowers</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={PurpleFlower}
                alt="Purple Flower"
                />
                <Carousel.Caption>
                <h3>Purple Flower</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </>
  )
}

export default HomeHero