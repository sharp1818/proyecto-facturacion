import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Switch, TextField, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import styles from './ProductsNewItem.module.scss'
import { useNavigate, useParams } from 'react-router-dom';
import useInput from '../../../../hooks/useInput';
import { productFamilyAllItems, productItem, productNewItem, productUpdateItem } from '../../../../services/products_services/products.services';

interface ProductFamily {
  family_id?: number | string,
  code: string,
  name: string,
  is_active: boolean,
  creation_date?: string
}

const ProductsNewItem = () => {
  const navigate = useNavigate();
  const productFamily = useInput([]);
  const { id } = useParams();
  const isEdit = useInput(Boolean);
  const product = useInput([]);

  const fetchProductFamilyAllItems = async () => {
    try {
      const response: any = await productFamilyAllItems();
      if (response.status === 200) {
        productFamily.setNewValue(response.data.filter((item: ProductFamily) => item.is_active === true).map((item: ProductFamily) => ({
          family_id: item.family_id,
          name: item.name,
        })))
      }
    } catch (error) {

    }
  };

  useEffect(() => {
    fetchProductFamilyAllItems()
  }, [])


  useEffect(() => {
    if (id) {
      isEdit.setNewValue(true)
    } else {
      isEdit.setNewValue(false)
    }
  }, [id])

  useEffect(() => {
    if (isEdit.value) {
      const fetchProductItem = async (id: number) => {
        try {
          const response: any = await productItem(id);
          if (response.status === 200) {
            product.setNewValue(response.data)
            setFormData({
              product_id: response.data.product_id,
              code: response.data.code,
              name: response.data.name,
              price: response.data.price,
              stock: response.data.stock,
              is_active: response.data.is_active,
              family: response.data.family,
            });
          }
        } catch (error) {

        }
      };

      fetchProductItem(Number(id));
    }
  }, [isEdit.value, id]);

  const [formData, setFormData] = useState({
    product_id: '',
    code: '',
    name: '',
    price: '',
    stock: '',
    is_active: true,
    family: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value as string });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setFormData({ ...formData, family: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEdit.value) {
      try {
        await productUpdateItem(Number(id), formData);
        navigate('/products');
      } catch (error) {

      }
    } else {
      try {
        await productNewItem(formData);
        navigate('/products');
      } catch (error) {

      }
    }
  };


  return (
    <div className={styles.container}>
      <Typography variant="button" gutterBottom>
        Catálogo
      </Typography>
      <Typography variant="h5" gutterBottom>
        {isEdit.value ? 'Editar' : 'Agregar'} producto
      </Typography>
      <br />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {isEdit.value &&
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="ID"
                name="product_id"
                value={formData.product_id}
                disabled
                onChange={handleInputChange}
                size="small"
              />
            </Grid>
          }
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Código"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Precio"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Stock"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <label>Estado:</label>
            <Switch
              name="is_active"
              checked={formData.is_active}
              onChange={(event) => {
                setFormData({ ...formData, is_active: event.target.checked });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth size="small">
              <InputLabel>Familia</InputLabel>
              <Select
                value={formData.family}
                onChange={handleSelectChange}
                name="family"
                label="Familia"
                size="small"
                fullWidth
              >
                {productFamily.value.map((family: ProductFamily) => (
                  <MenuItem key={family.family_id} value={family.family_id}>
                    {family.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <br />
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <Button onClick={() => { navigate('/products') }} variant="outlined" color="error">
            Cancelar
          </Button>
          <Button
            disabled={
              !(formData.code &&
                formData.name &&
                formData.price &&
                formData.stock &&
                formData.is_active &&
                formData.family)
            }
            type="submit"
            variant="contained"
            color="primary"
          >
            Guardar
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default ProductsNewItem;