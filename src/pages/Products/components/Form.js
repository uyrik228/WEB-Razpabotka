import React, { useState } from "react";
import { TextField, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../redux/actions/productsActions';

const ProductForm = ({ initialProduct }) => {
  const [product, setProduct] = useState(initialProduct);
  const [errors, setErrors] = useState({});
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
    
    // Сброс ошибок при изменении значения
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!product.name) {
      newErrors.name = "Название продукта обязательно для заполнения";
    }
    if (!product.description) {
      newErrors.description = "Описание продукта обязательно для заполнения";
    }
    if (!product.price) {
      newErrors.price = "Цена продукта обязательна для заполнения";
    } else if (product.price <= 0) {
      newErrors.price = "Цена должна быть положительным числом";
    }
    if (!product.quantity) {
      newErrors.quantity = "Количество продукта обязательно для заполнения";
    } else if (product.quantity <= 0) {
      newErrors.quantity = "Количество должно быть положительным целым числом";
    }
    return newErrors;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
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
        error={!!errors.name}
        helperText={errors.name}
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
        error={!!errors.description}
        helperText={errors.description}
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
        error={!!errors.price}
        helperText={errors.price}
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
        error={!!errors.quantity}
        helperText={errors.quantity}
      />
      <Button type="submit" variant="contained" color="primary">
        Добавить
      </Button>
    </Box>
  );
};

export default ProductForm;