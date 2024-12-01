import React, { useState } from "react";
import { TextField, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../redux/actions/productsActions';

const ProductForm = ({ initialProduct }) => {
  const [product, setProduct] = useState(initialProduct);
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
 try {
      await dispatch(addProduct(product));
      setProduct(initialProduct);
    } catch (error) {
      console.error('Ошибка при добавлении продукта:', error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ ...theme.components.MuiBox.styleOverrides.root }}
    >
      <TextField
        label="Название"
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        required
        variant="outlined"
        size="small"
      />
      <TextField
        label="Описание"
        type="text"
        name="description"
        value={product.description}
        onChange={handleChange}
        required
        variant="outlined"
        size="small"
      />
      <TextField
        label="Цена"
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        required
        variant="outlined"
        size="small"
      />
      <TextField
        label="Количество"
        type="number"
        name="quantity"
        value={product.quantity}
        onChange={handleChange}
        required
        variant="outlined"
        size="small"
      />
      <Button type="submit" variant="contained" color="primary">
        Добавить
      </Button>
    </Box>
  );
};

export default ProductForm;