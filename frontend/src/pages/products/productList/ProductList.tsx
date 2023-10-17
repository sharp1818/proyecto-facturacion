import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';

const ProductList = () => {

    const { collectionName } = useParams()
    const saveData = async() => {
        try {
            console.log('ni idea')
          } catch (error) {
            console.error(error);
          }
    }
    return (
        <div>
            productLIST
            <Button onClick={saveData} variant="contained">Subir</Button>
        </div>
    );
};

export default ProductList;