import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@chakra-ui/react';

import useSendApi from '../../hooks/useSendApi';
import AssetType from '../../components/assets/assetType'

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
        <AssetType data = {propertydata} text = {["Enter Property Name", "Set your Asset Assignment", "Enter Property Value", "Enter Specific Clauses (optional)"]} assetName="Property" />
      </Box>
      <Box> 
        <AssetType data = {businessdata} text = {["Enter Business Name", "Set your Asset Assignment", "Enter Business Value", "Enter Specific Clauses (optional)"]} assetName="Business" />
      </Box>
      <Box> 
        <AssetType data = {stockdata} text = {["Enter Stock Portfolio Name", "Set your Asset Assignment", "Enter Portfolio Value", "Enter Specific Clauses (optional)"]} assetName="Stock" />
      </Box>
      <Box> 
        <AssetType data = {cardata} text = {["Enter Car Name", "Set your Asset Assignment", "Enter Car Value", "Enter Specific Clauses (optional)"]} assetName="Car" />
      </Box>
      <Box> 
        <AssetType data = {customdata} text = {["Enter Custom Asset Name", "Set your Assignment", "Enter Your Asset's Value", "Enter Specific Clauses (optional)"]} assetName="Custom" />
      </Box>
    </Grid>
  );
};

export default UserAssets;
