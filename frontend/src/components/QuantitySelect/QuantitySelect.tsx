import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface QuantitySelectProps {
  stock: number;
  onQuantityChange: (quantity: number | string | any) => void;
}

const QuantitySelect: React.FC<QuantitySelectProps> = ({ stock, onQuantityChange }) => {
  const [selectedQuantity, setSelectedQuantity] = useState('');

  useEffect(() => {
    setSelectedQuantity('')
  }, [stock]);

  const handleQuantityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const quantity = event.target.value as number | string | any;
    setSelectedQuantity(quantity);
    onQuantityChange(quantity);
  };

  const quantityOptions = Array.from({ length: stock }, (_, index) => index + 1);

  return (
    <FormControl variant="outlined" fullWidth size="small">
      <InputLabel>Cantidad</InputLabel>
      <Select
        value={selectedQuantity}
        onChange={(e: any)=>handleQuantityChange(e)}
        label="Cantidad"
        size="small"
        fullWidth
      >
        {quantityOptions.map((quantity) => (
          <MenuItem key={quantity} value={quantity}>
            {quantity}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default QuantitySelect;