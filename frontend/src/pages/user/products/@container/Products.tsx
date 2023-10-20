import { Box, Button, Chip, Modal, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import styles from './Products.module.scss'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import useInput from '../../../../hooks/useInput';
import { productDeleteItem, productFamilyAllItems, productItems } from '../../../../services/products_services/products.services';
import AddCircleIcon from '@mui/icons-material/AddCircle';

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

interface Product {
  product_id?: number,
  code: string,
  name: string,
  price: string,
  stock: number,
  is_active: boolean,
  creation_date?: string,
  family?: number | string | null | any,
}

interface ProductFamily {
  family_id?: number | string,
  code: string,
  name: string,
  is_active: boolean,
  creation_date?: string
}

const Products = () => {
  const navigate = useNavigate()
  const product = useInput([]);
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

  const fetchProduct = async () => {
    try {
      const response: any = await productItems(page.value);
      if (response.status === 200) {
        page_count.setNewValue(Math.ceil(response.data.count / 10));
        product.setNewValue(response.data.results)
      }
    } catch (error) {

    }
  };

  const fetchProductFamilyAllItems = async () => {
    try {
      const response: any = await productFamilyAllItems();
      if (response.status === 200) {
        productFamily.setNewValue(response.data)
      }
    } catch (error) {

    }
  };

  useEffect(() => {
    fetchProduct();
    if (productFamily.value.length === 0) {
      fetchProductFamilyAllItems();
    }
  }, [page.value])

  const newItem = () => {
    navigate('/products/newItem');
  }

  const editItem = (id: number) => {
    navigate(`/products/${id}`);
  }

  const deleteItem = async (id: number) => {
    try {
      await productDeleteItem(Number(id));
      handleClose()
      fetchProduct()
    } catch (error) {

    }
  }

  const getFamilyName = (familyId: number) => {
    const family = productFamily.value.find((item: ProductFamily) => item.family_id === familyId);
    return family ? family.name : '';
  };

  return (
    <div className={styles.container}>
      <Typography variant="button" gutterBottom>
        Catálogo
      </Typography>
      <Typography variant="h5" gutterBottom>
        Productos
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
              <TableCell>Product ID</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Familia</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Codigo</TableCell>
              <TableCell align="right">Fecha de creacion</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(product.value).map((row: Product) => (
              <TableRow
                key={row.product_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.product_id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.stock}</TableCell>
                <TableCell align="right">{getFamilyName(row.family)}</TableCell>
                <TableCell align="right">{row.is_active ? <Chip label="Activo" color="success" /> : <Chip label="Inactivo" color="error" />}</TableCell>
                <TableCell align="right">{row.code}</TableCell>
                <TableCell align="right">{row.creation_date}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" justifyContent="flex-end">
                    <Button onClick={() => editItem(Number(row.product_id))}><EditIcon /></Button>
                    <Button onClick={() => handleOpen(Number(row.product_id))} color='error'><DeleteIcon /></Button>
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
            Borrar producto
          </Typography>
          <Typography sx={{ mt: 1 }}>
            ¿Estas seguro de borrar el producto de ID: {idModal.value}?
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

export default Products;