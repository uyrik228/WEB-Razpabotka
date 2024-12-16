import React, { useState, useEffect } from "react";
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addReview } from '../../../redux/actions/reviewsActions'; // Импортируем действие для добавления отзыва
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const ReviewForm = ({ handleSubmit }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8081/api/Products', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Ошибка при получении продуктов:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, product: '' })); // Сброс ошибки при изменении
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, comment: '' })); // Сброс ошибки при изменении
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, rating: '' })); // Сброс ошибки при изменении
  };

  const validate = () => {
    const newErrors = {};
    if (!selectedProduct) {
      newErrors.product = "Продукт обязателен для выбора";
    }
    if (!comment) {
      newErrors.comment = "Комментарий обязателен для заполнения";
    }
    if (rating < 1 || rating > 10) {
      newErrors.rating = "Рейтинг должен быть от 1 до 10";
    }
    return newErrors;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (!token) {
        console.error('Пользователь не авторизован');
        return;
      }

      const username = jwtDecode(token).sub;
      const userResponse = await axios.get(`http://localhost:8081/api/Users/name/${username}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const productResponse = await axios.get(`http://localhost:8081/api/Products/${selectedProduct}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const reviewData = {
        product: productResponse.data,
        user: userResponse.data,
        comment: comment,
        rating: rating,
        date: new Date().toISOString(),
      };

      dispatch(addReview(reviewData)); // Используем Redux для добавления отзыва
      handleSubmit(reviewData); // Вызываем функцию обратного вызова

      setSelectedProduct('');
      setComment('');
      setRating(1);
    } catch (error) {
      console.error('Ошибка при добавлении отзыва:', error);
    }
  };

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ marginTop: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined" size="small" required error={!!errors.product}>
            <InputLabel>Продукт</InputLabel>
            <Select
              value={selectedProduct}
              onChange={handleProductChange}
              label="Продукт"
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
            {errors.product && <p style={{ color: 'red' }}>{errors.product}</p>}
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Комментарий"
            type="text"
            value={comment}
            onChange={handleCommentChange}
            required
            variant="outlined"
            size="small"
            multiline
            error={!!errors.comment}
            helperText={errors.comment}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Рейтинг (1-10)"
            type="number"
            value={rating}
            onChange={handleRatingChange}
            required
            size="small"
            inputProps={{ min: 1, max: 10 }}
            error={!!errors.rating}
            helperText={errors.rating}
          />
        </Grid>
        <Grid item xs={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Добавить
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReviewForm;