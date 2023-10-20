import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000';

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

interface InvoiceItem {
    id?: number | string,
    product_code: string,
    product_name: string,
    price: string,
    quantity: string,
    subtotal: string,
    invoice: number | string | null | any,
}

export const invoiceAllItems = (): Promise<Invoice[]> => {
    return axios.get<Invoice[]>(`${baseURL}/api/invoice/v1/invoice/`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export const invoiceItems = (page: number): Promise<Invoice[]> => {
    return axios.get<Invoice[]>(`${baseURL}/api/invoice/v1/invoice/?page=${page}`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export const invoiceItem = (id:number): Promise<Invoice> => {
    return axios.get<Invoice>(`${baseURL}/api/invoice/v1/invoice/${id}/`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export const invoiceNewItem = (invoice: Invoice) => {
    return axios.post(`${baseURL}/api/invoice/v1/invoice/`, invoice)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export const invoiceUpdateItem = (id:number, invoice: Invoice) => {
    return axios.put(`${baseURL}/api/invoice/v1/invoice/${id}/`, invoice)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export const invoiceDeleteItem = (id:number) => {
    return axios.delete(`${baseURL}/api/invoice/v1/invoice/${id}/`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export const invoiceItemAllItems = (): Promise<InvoiceItem[]> => {
    return axios.get<InvoiceItem[]>(`${baseURL}/api/invoice_item/v1/invoice_item/`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export const invoiceItemItems = (page: number): Promise<InvoiceItem[]> => {
    return axios.get<InvoiceItem[]>(`${baseURL}/api/invoice_item/v1/invoice_item/?page=${page}`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export const invoiceItemItem = (id:number): Promise<InvoiceItem> => {
    return axios.get<InvoiceItem>(`${baseURL}/api/invoice_item/v1/invoice_item/${id}/`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export const invoiceItemNewItem = (invoiceItem: InvoiceItem) => {
    return axios.post(`${baseURL}/api/invoice_item/v1/invoice_item/`, invoiceItem)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export const invoiceItemUpdateItem = (id:number, invoiceItem: InvoiceItem) => {
    return axios.put(`${baseURL}/api/invoice_item/v1/invoice_item/${id}/`, invoiceItem)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export const invoiceItemDeleteItem = (id:number) => {
    return axios.delete(`${baseURL}/api/invoice_item/v1/invoice_item/${id}/`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};