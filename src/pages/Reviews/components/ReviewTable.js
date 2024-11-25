import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ReviewTable = ({ isAdmin, delReview }) => {
  const [reviews, setReviews] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8080/api/Reviews', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log("Полученные данные:", response.data); // Добавьте это для отладки
        setReviews(response.data);

      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8080/api/Reviews/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      delReview(id); // Вызов функции удаления из родительского компонента
    } catch (error) {
      console.error("Ошибка при удалении отзыва:", error);
    }
  };

  const handleEdit = (review) => {
    // Здесь вы можете открыть модальное окно или форму для редактирования
    // Например, можно использовать состояние для отображения формы с предзаполненными данными
    console.log('Редактировать отзыв:', review);
};

return (
    <TableContainer component={Paper} style={{ backgroundColor: theme.palette.background.paper }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Комментарий</TableCell>
            <TableCell>Дата</TableCell>
            <TableCell>Рейтинг</TableCell>
            <TableCell>Продукт</TableCell>
            <TableCell>Пользователь</TableCell>
            {isAdmin && (
              <>
                <TableCell>Редактировать</TableCell>
                <TableCell>Удалить</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell>{review.id}</TableCell>
              <TableCell>{review.comment}</TableCell>
              <TableCell>{review.date}</TableCell>
              <TableCell>{review.rating}</TableCell>
              <TableCell>{review.product_id}</TableCell>
              <TableCell>{review.user_id}</TableCell>
              {isAdmin && (
                <>
                  <TableCell>
                    <Button variant="contained" color="secondary" onClick={() => handleEdit(review)}>
                      Редактировать
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleDelete(review.id)}>
                      Удалить
                    </Button>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
);
};

export default ReviewTable;