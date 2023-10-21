import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import styles from './InvoicingNewItem.module.scss'
import { useNavigate, useParams } from 'react-router-dom';
import useInput from '../../../../hooks/useInput';
import { invoiceAllItems, invoiceItem, invoiceItemNewItem, invoiceItemUpdateItem } from '../../../../services/invoice_services/invoice.services';
import { productAllItems } from '../../../../services/products_services/products.services';
import QuantitySelect from '../../../../components/QuantitySelect/QuantitySelect';

interface Product {
  product_id?: number | string,
  code: string,
  name: string,
  price: string,
  stock: number | string,
  is_active: boolean,
  creation_date?: string,
  family: number | string | null | any,
}

interface Invoice {
  id?: number | string,
  invoice_number: string,
  client_ruc: string,
  client_name: string,
  subtotal: string,
  igv_percentage: string,
  igv: string,
  total: string,
}

const InvoicingNewItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = useInput(Boolean);
  const invoicesItem = useInput([]);
  const productItems = useInput([])
  const invoice = useInput([]);

  const fetchProductFamilyAllItems = async () => {
    try {
      const response: any = await invoiceAllItems();
      if (response.status === 200) {
        invoice.setNewValue(response.data.map((item: Invoice) => ({
          id: item.id,
          client_name: item.client_name,
        })))
      }
    } catch (error) {

    }
  };

  const fetchProductAllItems = async () => {
    try {
      const response: any = await productAllItems();
      if (response.status === 200) {
        productItems.setNewValue(response.data)
      }
    } catch (error) {

    }
  };

  useEffect(() => {
    fetchProductAllItems()
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
      const fetchInvoicesItem = async (id: number) => {
        try {
          const response: any = await invoiceItem(id);
          if (response.status === 200) {
            invoicesItem.setNewValue(response.data)
            setFormData({
              id: response.data.id,
              product_code: response.data.product_code,
              product_name: response.data.product_name,
              price: response.data.price,
              quantity: response.data.quantity,
              subtotal: response.data.subtotal,
              invoice: response.data.invoice,
              stock: '',
            });
          }
        } catch (error) {

        }
      };

      fetchInvoicesItem(Number(id));
    }
  }, [isEdit.value, id]);

  const [formData, setFormData] = useState({
    id: '',
    product_code: '',
    product_name: '',
    price: '',
    quantity: '',
    subtotal: '',
    invoice: '',
    stock: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedProduct = productItems.value.find((product: Product) => product.name === event.target.value);
    if (selectedProduct) {
      setFormData({
        ...formData,
        product_name: event.target.value,
        price: selectedProduct.price,
        product_code: selectedProduct.code,
        stock: selectedProduct.stock,
        quantity: '',
        subtotal: '',
      });
    }
  };

  const handleInvoiceSelectChange = (event: SelectChangeEvent<string>) => {
    setFormData({ ...formData, invoice: event.target.value });
  };


  const handleQuantityChange = (quantity: number | string | any) => {
    const subtotal = (parseFloat(formData.price) * quantity).toFixed(2);
    setFormData({ ...formData, quantity, subtotal });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEdit.value) {
      try {
        await invoiceItemUpdateItem(Number(id), formData);
        navigate('/invoicing');
      } catch (error) {

      }
    } else {
      try {
        await invoiceItemNewItem(formData);
        navigate('/invoicing');
      } catch (error) {

      }
    }
  };


  return (
    <div className={styles.container}>
      <Typography variant="button" gutterBottom>
        Documentos
      </Typography>
      <Typography variant="h5" gutterBottom>
        Agregar detalle de factura
      </Typography>
      <br />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {isEdit.value &&
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="ID"
                name="id"
                value={formData.id}
                disabled
                onChange={handleInputChange}
                size="small"
              />
            </Grid>
          }
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Código de producto"
              name="product_code"
              value={formData.product_code}
              onChange={handleInputChange}
              disabled
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth size="small">
              <InputLabel>Nombre de producto</InputLabel>
              <Select
                value={formData.product_name}
                onChange={handleSelectChange}
                name="product_name"
                label="Nombre de producto"
                size="small"
                fullWidth
              >
                {productItems.value.map((product: Product) => (
                  <MenuItem key={product.product_id} value={product.name}>
                    {product.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Precio"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              disabled
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <QuantitySelect
              stock={parseInt(formData.stock, 10)}
              onQuantityChange={handleQuantityChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Subtotal"
              name="subtotal"
              value={formData.subtotal}
              onChange={handleInputChange}
              disabled
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth size="small">
              <InputLabel>Razón social</InputLabel>
              <Select
                value={formData.invoice}
                onChange={handleInvoiceSelectChange}
                name="family"
                label="Razón social"
                size="small"
                fullWidth
              >
                {invoice.value.map((invoice: Invoice) => (
                  <MenuItem key={invoice.id} value={invoice.id}>
                    {invoice.client_name}
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
          <Button onClick={() => { navigate('/invoicing') }} variant="outlined" color="error">
            Cancelar
          </Button>
          <Button
            disabled={
              !(formData.product_code &&
                formData.product_name &&
                formData.price &&
                formData.quantity &&
                formData.subtotal &&
                formData.invoice)
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

export default InvoicingNewItem;