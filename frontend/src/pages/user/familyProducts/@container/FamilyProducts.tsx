import { Box, Button, Chip, Modal, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import styles from './FamilyProducts.module.scss'
import { productFamilyDeleteItem, productFamilyItems } from '../../../../services/products_services/products.services';
import useInput from '../../../../hooks/useInput';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

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

interface ProductFamily {
  family_id?: number,
  code: string,
  name: string,
  is_active: boolean,
  creation_date: string
}

const FamilyProducts = () => {
  const navigate = useNavigate()
  const productFamily = useInput([]);
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

  const fetchProductFamily = async () => {
    try {
      const response: any = await productFamilyItems(page.value);
      if (response.status === 200) {
        page_count.setNewValue(Math.ceil(response.data.count / 10));
        productFamily.setNewValue(response.data.results)
      }
    } catch (error) {

    }
  };

  useEffect(() => {
    fetchProductFamily();
  }, [page.value])

  const newItem = () => {
    navigate('/family-products/newItem');
  }

  const editItem = (id: number) => {
    navigate(`/family-products/${id}`);
  }

  const deleteItem = async (id: number) => {
    try {
      await productFamilyDeleteItem(Number(id));
      handleClose()
      fetchProductFamily()
    } catch (error) {

    }
  }


  return (
    <div className={styles.container}>
      <Typography variant="button" gutterBottom>
        Catálogo
      </Typography>
      <Typography variant="h5" gutterBottom>
        Familia de productos
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
              <TableCell>Family ID</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Codigo</TableCell>
              <TableCell align="right">Fecha de creacion</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(productFamily.value).map((row: ProductFamily) => (
              <TableRow
                key={row.family_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.family_id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.is_active ? <Chip label="Activo" color="success" /> : <Chip label="Inactivo" color="error" />}</TableCell>
                <TableCell align="right">{row.code}</TableCell>
                <TableCell align="right">{row.creation_date}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" justifyContent="flex-end">
                    <Button onClick={() => editItem(Number(row.family_id))}><EditIcon /></Button>
                    <Button onClick={() => handleOpen(Number(row.family_id))} color='error'><DeleteIcon /></Button>
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
            Borrar familia de producto
          </Typography>
          <Typography sx={{ mt: 1 }}>
            ¿Estas seguro de borrar la familia de ID: {idModal.value}?
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

export default FamilyProducts;