import React, { useEffect } from 'react';
import { Box, Button, Modal, Paper, Stack, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { invoiceItemsByInvoice } from '../../services/invoice_services/invoice.services';
import useInput from '../../hooks/useInput';
import { Table } from 'react-bootstrap';

interface Invoice {
    id: number | string,
    invoice_number: string,
    client_ruc: string,
    client_name: string,
    subtotal: string,
    igv_percentage: string,
    igv: string,
    total: string,
}

interface InvoiceItem {
    id?: number | string,
    product_code: string,
    product_name: string,
    price: string,
    quantity: string | number | any,
    subtotal: string,
    invoice: number | string | null | any,
}

interface ModalProps {
    open: boolean;
    handleClose: () => void;
    rowData: Invoice | null;
}

const VoucherComponent: React.FC<ModalProps> = ({ open, handleClose, rowData }) => {
    const invoiceItems = useInput([]);
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '620px',
        bgcolor: 'background.paper',
        borderRadius: '12px',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const fetchInvoicesItemsByInvoice = async (id: string | number) => {
        try {
            const response: any = await invoiceItemsByInvoice(id);
            if (response.status === 200) {
                invoiceItems.setNewValue(response.data)
            }
        } catch (error) {

        }
    };

    useEffect(() => {
        if (rowData) {
            fetchInvoicesItemsByInvoice(rowData.id)
        }
    }, [rowData])


    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="h5" component="h2">
                        Citikold
                    </Typography>
                    <Typography variant="h6" component="h2">
                        Factura #{rowData && rowData.invoice_number}
                    </Typography>
                </Stack>
                <br />
                {rowData && (
                    <Stack direction="column">
                        <Typography variant="overline" gutterBottom> Cliente: {rowData.client_name} </Typography>
                        <Typography variant="overline" gutterBottom> RUC: {rowData.client_ruc} </Typography>
                        <Typography variant="overline" gutterBottom> IGV: {rowData.igv_percentage}% </Typography>
                        <TableContainer component={Paper} >
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Codigo</TableCell>
                                        <TableCell align="right">Producto</TableCell>
                                        <TableCell align="right">Precio</TableCell>
                                        <TableCell align="right">Cantidad</TableCell>
                                        <TableCell align="right">Subtotal</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(invoiceItems.value).map((row: InvoiceItem) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.product_code}
                                            </TableCell>
                                            <TableCell align="right">{row.product_name}</TableCell>
                                            <TableCell align="right">{row.price}</TableCell>
                                            <TableCell align="right">{Number(row.quantity)}</TableCell>
                                            <TableCell align="right">{row.subtotal}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row"></TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right">Subtotal</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>{rowData.subtotal}</TableCell>
                                    </TableRow>
                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row"></TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right">Total</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>{rowData.total}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>

                )}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mt: 2,
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="end"
                        alignItems="center"
                        spacing={2}
                    >
                        <Button onClick={handleClose} variant="outlined" color="error">
                            Cancelar
                        </Button>
                        <Button variant="contained" color="primary" startIcon={<PrintIcon />}>
                            Imprimir
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    );
};

export default VoucherComponent;