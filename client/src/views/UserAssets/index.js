import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@chakra-ui/react';

import Properties from './Properties'
import Car from './Car'
import Business from './Business'
import Stock from './Stock'
import useSendApi from '../../hooks/useSendApi';
import Custom from './Custom'

const UserAssets = () => {
  const [propertydata, setPropertyData] = useState(null);
  const [cardata, setCarData] = useState(null);
  const [businessdata, setBusinessData] = useState(null);
  const [stockdata, setStockData] = useState(null);
  
  const [customdata, setCustomData] = useState(null);

  const sendApi = useSendApi();
  useEffect(() => {
    const fetchData = async () => {
    const { data, error } = await sendApi('/api/assets/viewassets', {});

    if (error) {
      console.error('Error fetching API');
      return;
    }
    setPropertyData(data.assets.houses);
    setCarData(data.assets.cars);
    setBusinessData(data.assets.businesses);
    setStockData(data.assets.stocks);
    setCustomData(data.assets.customs);
    
  }
    fetchData();
  }, []);

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
      <Box>
        <Properties props={propertydata} />
      </Box>
      <Box>
        <Car props={cardata} />
      </Box>
      <Box>
        <Business props={businessdata} />
      </Box>
      <Box>
        <Stock props={stockdata} />
      </Box>
      <Box>
        <Custom props={customdata} />
      </Box>
    </Grid>
  );
};

export default UserAssets;
