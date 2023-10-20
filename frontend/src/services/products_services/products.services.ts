import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000';

interface ProductFamily {
    family_id?: number | string,
    code: string,
    name: string,
    is_active: boolean,
    creation_date?: string
}

interface Product {
    product_id?: number,
    code: string,
    name: string,
    price: string,
    stock: number,
    is_active: boolean,
    creation_date?: string,
    family: number,
}


export const productFamilyAllItems = (): Promise<ProductFamily[]> => {
    return axios.get<ProductFamily[]>(`${baseURL}/api/product_family/v1/product_family/`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export const productFamilyItems = (page: number): Promise<ProductFamily[]> => {
    return axios.get<ProductFamily[]>(`${baseURL}/api/product_family/v1/product_family/?page=${page}`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export const productFamilyItem = (family_id:number): Promise<ProductFamily> => {
    return axios.get<ProductFamily>(`${baseURL}/api/product_family/v1/product_family/${family_id}/`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export const productFamilyNewItem = (product_family: ProductFamily) => {
    return axios.post(`${baseURL}/api/product_family/v1/product_family/`, product_family)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export const productFamilyUpdateItem = (family_id:number, product_family: ProductFamily) => {
    return axios.put(`${baseURL}/api/product_family/v1/product_family/${family_id}/`, product_family)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export const productFamilyDeleteItem = (family_id:number) => {
    return axios.delete(`${baseURL}/api/product_family/v1/product_family/${family_id}/`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export const productAllItems = (): Promise<Product[]> => {
    return axios.get<Product[]>(`${baseURL}/api/product/v1/product/`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export const productItems = (page: number): Promise<Product[]> => {
    return axios.get<Product[]>(`${baseURL}/api/product/v1/product/?page=${page}`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export const productItem = (product_id:number): Promise<Product> => {
    return axios.get<Product>(`${baseURL}/api/product/v1/product/${product_id}/`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export const productNewItem = (product: Product) => {
    return axios.post(`${baseURL}/api/product/v1/product/`, product)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export const productpdateItem = (product_id:number, product: Product) => {
    return axios.put(`${baseURL}/api/product/v1/product/${product_id}/`, product)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};

export const productDeleteItem = (product_id:number) => {
    return axios.delete(`${baseURL}/api/product/v1/product/${product_id}/`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });
};