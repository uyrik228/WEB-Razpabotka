import React, { useState } from "react";
import Form from "./components/Form";
import ProductTable from "./components/ProductTable";
import ProductAPI from "../../api/service";

const initialProducts = ProductAPI.all();

const Products = () => {
    const [products, setProducts] = useState(initialProducts);
    const initialProduct = { name: '', description: '', price: '', quantity: '' };

    const handleSubmit = (newProduct) => {
        setProducts([...products, { ...newProduct, id: products.length }]);
    };

    const delProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    
    // Проверка роли пользователя
    const isAdmin = localStorage.getItem('role') === 'ROLE_ADMIN';
    console.log('Is Admin:', isAdmin); // Логирование для отладки

    return (
        <div>
            {isAdmin && <Form handleSubmit={handleSubmit} initialProduct={initialProduct} />}
            <ProductTable products={products} delProduct={delProduct} isAdmin={isAdmin} />
        </div>
    );
};

export default Products;
