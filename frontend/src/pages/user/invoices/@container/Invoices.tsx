import { Box, Button, Modal, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './Invoices.module.scss'
import { useNavigate } from 'react-router-dom';
import useInput from '../../../../hooks/useInput';
import { invoiceDeleteItem, invoiceItems } from '../../../../services/invoice_services/invoice.services';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import VoucherComponent from '../../../../components/Voucher/Voucher';

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

const Invoices = () => {
  const navigate = useNavigate()
  const invoices = useInput([]);
  const page_count = useInput(Number);
  const page = useInput(1);
  const idModal = useInput(Number);
  const [open, setOpen] = React.useState(false);
  const rowInvoiceData = useInput({});
  const [openVoucher, setOpenVoucher] = useState(false);

  const handleOpenVoucher = () => {setOpenVoucher(true)};
  const handleCloseVoucher = () => {setOpenVoucher(false)};

  const printVoucher = (row: Invoice) => {
    handleOpenVoucher()
    rowInvoiceData.setNewValue(row);
  };
  const handleOpen = (id: number) => {
    setOpen(true);
    idModal.setNewValue(id);
  };
  const handleClose = () => setOpen(false);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    page.setNewValue(value);
  };

  const fetchInvoices = async () => {
    try {
      const response: any = await invoiceItems(page.value);
      if (response.status === 200) {
        page_count.setNewValue(Math.ceil(response.data.count / 10));
        invoices.setNewValue(response.data.results)
      }
    } catch (error) {

    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [page.value])

  const newItem = () => {
    navigate('/invoices/newItem');
  }

  const deleteItem = async (id: number) => {
    try {
      await invoiceDeleteItem(Number(id));
      handleClose()
      fetchInvoices()
    } catch (error) {

    }
  }

  return (
    <div className={styles.container}>
      <Typography variant="button" gutterBottom>
        Documentos
      </Typography>
      <Typography variant="h5" gutterBottom>
        Facturas
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
              <TableCell align="right">Razón social</TableCell>
              <TableCell align="right">RUC</TableCell>
              <TableCell align="right">N° de factura</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right">% de IGV</TableCell>
              <TableCell align="right">IGV</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(invoices.value).map((row: Invoice) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.client_name}</TableCell>
                <TableCell align="right">{row.client_ruc}</TableCell>
                <TableCell align="right">{row.invoice_number}</TableCell>
                <TableCell align="right">{row.subtotal}</TableCell>
                <TableCell align="right">{row.igv_percentage}</TableCell>
                <TableCell align="right">{row.igv}</TableCell>
                <TableCell align="right">{row.total}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" justifyContent="flex-end">
                    <Button onClick={() => printVoucher(row)} color='primary'><LocalPrintshopIcon /></Button>
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
            Borrar factura
          </Typography>
          <Typography sx={{ mt: 1 }}>
            ¿Estas seguro de borrar la factura de ID: {idModal.value}?
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
      <VoucherComponent
        open={openVoucher}
        handleClose={handleCloseVoucher}
        rowData={rowInvoiceData.value}
      />
    </div>
  );
};

export default Invoices;