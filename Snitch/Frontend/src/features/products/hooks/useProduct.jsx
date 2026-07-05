import { useDispatch } from 'react-redux';
import { createProduct, getAllProduct, getProductById, getSellerProduct } from '../services/api.product';
import { setProduct, setSellerProducts } from '../state/product.slice';

const useProduct = () => {
    const dispatch = useDispatch();

    async function handleCreateProduct(formData) {
        const data = await createProduct(formData);
        return data.product;
    }

    async function handleGetSellerProduct() {
        const data = await getSellerProduct();
        dispatch(setSellerProducts(data.product));
        return data.product;
    }

    async function handleGetAllProducts() {
        const data = await getAllProduct();
        dispatch(setProduct(data.product));
        return data.product;
    }

    async function handleGetProductById(productId) {
        const data = await getProductById(productId);
        return data.product;
    }

    return { handleCreateProduct, handleGetSellerProduct, handleGetAllProducts, handleGetProductById };
};

export default useProduct;
