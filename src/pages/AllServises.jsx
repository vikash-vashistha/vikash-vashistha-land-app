import { Button, HStack, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ProductsPage } from './Land/LandProductPage/ProductPage'
import Searchbar from './Weather/SearchBar';
import "./Weather.css";

export const AllServises = () => {
  const [product, setProduct] = useState({
    land: false, 
    weather: false,
    task: false
  })

  return (
    <Stack m="auto">
      <Stack m="auto">
        {!product.land && (
          <Button
            w="100px"
            m="auto"
            onClick={() =>
              setProduct({
                land: !product.land,
                weather: false,
                task: false,
              })
            }
          >
            Property
          </Button>
        )}
        {product.land && <ProductsPage />}
      </Stack>
      <Stack m="auto" className={product.weather && "App"}>
        {!product.weather && (
          <Button
            w="100px"
            m="auto"
            onClick={() =>
              setProduct({
                weather: !product.weather,
                land: false,
                task: false,
              })
            }
          >
            Weather
          </Button>
        )}
        {product.weather && <Searchbar />}
      </Stack>
      {/* <Stack m="auto" className={product.task && "App"}>
        {!product.task && (
          <Button  w="100px" m="auto"
            onClick={() =>
              setProduct({
                task: !product.task,
                land: false,
                weather: false
              })
            }
          >
            Manage Task
          </Button>
        )}
        {product.weather && <Searchbar />}
      </Stack> */}
    </Stack>
  );
}
