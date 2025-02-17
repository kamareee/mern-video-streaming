import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';

import axios from 'axios';

// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar,
} from '../sections/@dashboard/products';
// mock
import VIDEOS from '../_mock/videos';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.post(
        'http://localhost:4000/api/videos/search',
        {}
      );
      console.log('getData', response.data);
      setVideos(response.data);
    };

    getData();
  }, []);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant='h4' sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack
          direction='row'
          flexWrap='wrap-reverse'
          alignItems='center'
          justifyContent='flex-end'
          sx={{ mb: 5 }}
        >
          <Stack direction='row' spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={videos} />
        <ProductCartWidget />
      </Container>
    </>
  );
}
