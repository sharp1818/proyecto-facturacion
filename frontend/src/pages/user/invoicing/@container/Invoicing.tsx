import { Box, Button, Modal, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import styles from './Invoicing.module.scss'
import { useNavigate } from 'react-router-dom';
import useInput from '../../../../hooks/useInput';
import { invoiceAllItems, invoiceItemDeleteItem, invoiceItemItems } from '../../../../services/invoice_services/invoice.services';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '320px',
  bgcolor: 'background.paper',
  borderRadius: '12px',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface InvoiceItem {
  id?: number | string,
  product_code: string,
  product_name: string,
  price: string,
  quantity: string,
  subtotal: string,
  invoice: number | string | null | any,
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

const Invoicing = () => {
  const navigate = useNavigate()
  const invoicesItem = useInput([]);
  const invoice = useInput([]);
  const page_count = useInput(Number);
  const page = useInput(1);
  const idModal = useInput(Number);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (id: number) => {
    setOpen(true);
    idModal.setNewValue(id);
  };
  const handleClose = () => setOpen(false);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    page.setNewValue(value);
  };

  const fetchInvoiceAllItems = async () => {
    try {
      const response: any = await invoiceAllItems();
      if (response.status === 200) {
        invoice.setNewValue(response.data)
      }
    } catch (error) {

    }
  };

  const fetchInvoiceItem = async () => {
    try {
      const response: any = await invoiceItemItems(page.value);
      if (response.status === 200) {
        page_count.setNewValue(Math.ceil(response.data.count / 10));
        invoicesItem.setNewValue(response.data.results)
      }
    } catch (error) {

    }
  };

  useEffect(() => {
    fetchInvoiceItem();
    if (invoice.value.length === 0) {
      fetchInvoiceAllItems();
    }
  }, [page.value])

  const newItem = () => {
    navigate('/invoicing/newItem');
  }

  const deleteItem = async (id: number) => {
    try {
      await invoiceItemDeleteItem(Number(id));
      handleClose()
      fetchInvoiceItem()
    } catch (error) {

    }
  }

  const getInvoiceName = (invoiceID: number) => {
    const _invoice = invoice.value.find((item: Invoice) => item.id === invoiceID);
    return _invoice ? _invoice.client_name : '';
  };


  return (
    <div className={styles.container}>
      <Typography variant="button" gutterBottom>
        Documentos
      </Typography>
      <Typography variant="h5" gutterBottom>
        Detalle de factura
      </Typography>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        <Button variant="contained" onClick={newItem} startIcon={<AddCircleIcon />}>Agregar</Button>
      </Stack>
      <br />
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 700 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Factura ID</TableCell>
              <TableCell align="right">Razón social</TableCell>
              <TableCell align="right">Código de producto</TableCell>
              <TableCell align="right">Nombre de producto</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell align="right">Cantidad</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(invoicesItem.value).map((row: InvoiceItem) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.invoice}</TableCell>
                <TableCell align="right">{getInvoiceName(row.invoice)}</TableCell>
                <TableCell align="right">{row.product_code}</TableCell>
                <TableCell align="right">{row.product_name}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.subtotal}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" justifyContent="flex-end">
                    <Button onClick={() => handleOpen(Number(row.id))} color='error'><DeleteIcon /></Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      {page_count.value > 0 &&
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Pagination count={page_count.value} page={page.value} onChange={handlePageChange} />
        </Stack>
      }
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Borrar detalle de factura
          </Typography>
          <Typography sx={{ mt: 1 }}>
            ¿Estas seguro de borrar detalle de factura ID: {idModal.value}?
          </Typography>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Button onClick={() => { handleClose() }} variant="contained" color="primary">
              Cancelar
            </Button>
            <Button onClick={() => { deleteItem(idModal.value) }} variant="contained" color="error">
              Borrar
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default Invoicing;