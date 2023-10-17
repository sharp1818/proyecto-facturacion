import React from 'react';
import { useParams } from 'react-router-dom';

const ProductCard = () => {

    const { productName } = useParams()
    return (
        <div>
            ProductCard {productName}
        </div>
    );
};

export default ProductCard;