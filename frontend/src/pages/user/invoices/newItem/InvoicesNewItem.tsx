import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './InvoicesNewItem.module.scss'
import { useNavigate, useParams } from 'react-router-dom';
import useInput from '../../../../hooks/useInput';
import { invoiceItem, invoiceNewItem, invoiceUpdateItem } from '../../../../services/invoice_services/invoice.services';

const InvoicesNewItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = useInput(Boolean);
  const invoices = useInput([]);

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
            invoices.setNewValue(response.data)
            setFormData({
              id: response.data.id,
              client_name: response.data.client_name,
              client_ruc: response.data.client_ruc,
              invoice_number: response.data.invoice_number,
              subtotal: response.data.subtotal,
              igv_percentage: response.data.igv_percentage,
              igv: response.data.igv,
              total: response.data.total,
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
    client_name: '',
    client_ruc: '',
    invoice_number: '',
    subtotal: '0',
    igv_percentage: '',
    igv: '0',
    total: '0',
  });

  const isIgvPercentageValid = (value: number | string | any) => {
    if (value === "") {
      return true;
    }
    const floatValue = parseFloat(value);
    return !isNaN(floatValue) && floatValue >= 0 && floatValue <= 100;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "igv_percentage" && !isIgvPercentageValid(value)) {
      return;
    }
    let sanitizedValue = value;
    if (name === "igv_percentage") {
      sanitizedValue = value.replace(/[^0-9.]/g, "");
    }
    setFormData({ ...formData, [name]: sanitizedValue });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const igvPercentageValue = parseFloat(formData.igv_percentage).toFixed(2);
    if (isEdit.value) {
      try {
        await invoiceUpdateItem(Number(id), { ...formData, igv_percentage: igvPercentageValue });
        navigate('/invoices');
      } catch (error) {

      }
    } else {
      try {
        await invoiceNewItem({ ...formData, igv_percentage: igvPercentageValue });
        navigate('/invoices');
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
        Facturas
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
              label="Razón social"
              name="client_name"
              value={formData.client_name}
              onChange={handleInputChange}
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="RUC"
              name="client_ruc"
              value={formData.client_ruc}
              onChange={handleInputChange}
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="N° de factura"
              name="invoice_number"
              value={formData.invoice_number}
              onChange={handleInputChange}
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Subtotal"
              name="subtotal"
              value={formData.subtotal}
              disabled
              onChange={handleInputChange}
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="% de IGV"
              name="igv_percentage"
              value={formData.igv_percentage}
              onChange={handleInputChange}
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="IGV"
              name="igv"
              value={formData.igv}
              disabled
              onChange={handleInputChange}
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Total"
              name="total"
              value={formData.total}
              disabled
              onChange={handleInputChange}
              size="small"
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
          <Button onClick={() => { navigate('/invoices') }} variant="outlined" color="error">
            Cancelar
          </Button>
          <Button
            disabled={
              !(formData.client_name &&
                formData.client_ruc &&
                formData.client_ruc.length <= 15 &&
                formData.invoice_number &&
                formData.invoice_number.length <= 20 &&
                formData.subtotal &&
                formData.igv_percentage &&
                formData.igv &&
                formData.total)
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

export default InvoicesNewItem;