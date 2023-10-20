import { Box, Button, Grid, Modal, Stack, Switch, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './FamilyProductsNewItem.module.scss'
import { useNavigate, useParams } from 'react-router-dom';
import useInput from '../../../../hooks/useInput';
import { productFamilyItem, productFamilyNewItem, productFamilyUpdateItem } from '../../../../services/products_services/products.services';

const FamilyProductsNewItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = useInput(Boolean);
  const productFamily = useInput([]);

  useEffect(() => {
    if (id) {
      isEdit.setNewValue(true)
    } else {
      isEdit.setNewValue(false)
    }
  }, [id])

  useEffect(() => {
    if (isEdit.value) {
      const fetchProductFamilyItem = async (id: number) => {
        try {
          const response: any = await productFamilyItem(id);
          if (response.status === 200) {
            productFamily.setNewValue(response.data)
            setFormData({
              family_id: response.data.family_id,
              code: response.data.code,
              name: response.data.name,
              is_active: response.data.is_active,
            });
          }
        } catch (error) {

        }
      };

      fetchProductFamilyItem(Number(id));
    }
  }, [isEdit.value, id]);

  const [formData, setFormData] = useState({
    family_id: '',
    code: '',
    name: '',
    is_active: true,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEdit.value) {
      try {
        await productFamilyUpdateItem(Number(id), formData);
        navigate('/family-products');
      } catch (error) {

      }
    } else {
      try {
        await productFamilyNewItem(formData);
        navigate('/family-products');
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
        {isEdit.value ? 'Editar' : 'Agregar'} familia de productos
      </Typography>
      <br />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {isEdit.value &&
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="ID"
                name="family_id"
                value={formData.family_id}
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
            <label>Estado:</label>
            <Switch
              name="is_active"
              checked={formData.is_active}
              onChange={(event) => {
                setFormData({ ...formData, is_active: event.target.checked });
              }}
            />
          </Grid>
        </Grid>
        <br />
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <Button onClick={() => { navigate('/family-products') }} variant="outlined" color="error">
            Cancelar
          </Button>
          <Button
            disabled={
              !(formData.code &&
                formData.code.length <=15 &&
                formData.name)
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

export default FamilyProductsNewItem;