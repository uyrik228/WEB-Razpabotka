import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, fetchUserReviews, deleteReview } from '../../../redux/actions/reviewsActions'; // Импортируем действия
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ReviewTable = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.reviews);
  const { currentUser  } = useSelector((state) => state.auth); // Предполагаем, что ID пользователя хранится здесь
  const [viewMode, setViewMode] = useState('all'); // 'all' или 'my'
  const theme = useTheme();

  useEffect(() => {
    if (viewMode === 'my' && currentUser ) {
      dispatch(fetchUserReviews(currentUser .id)); // Получаем отзывы текущего пользователя
    } else {
      dispatch(fetchReviews()); // Получаем все отзывы
    }
  }, [dispatch, viewMode, currentUser ]);

  const handleDelete = (id) => {
    dispatch(deleteReview(id)); // Используем действие для удаления отзыва
  };

  const handleViewChange = (event, newView) => {
    if (newView) {
      setViewMode(newView);
    }
  };

  return (
    <div>
      <ToggleButtonGroup
        value={viewMode}
        exclusive
        onChange={handleViewChange}
        aria-label="view mode"
        style={{ marginBottom: '16px' }}
      >
        <ToggleButton value="all" aria-label="all reviews">
          Все отзывы
        </ToggleButton>
        <ToggleButton value="my" aria-label="my reviews">
          Мои отзывы
        </ToggleButton>
      </ToggleButtonGroup>

      <TableContainer component={Paper} style={{ backgroundColor: theme.palette.background.paper }}>
        <Table> <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Комментарий</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Рейтинг</TableCell>
              <TableCell>Продукт</TableCell>
              <TableCell>Пользователь</TableCell>
              {isAdmin && (
                <TableCell>Удалить</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>{review.id}</TableCell>
                  <TableCell>{review.comment}</TableCell>
                  <TableCell>{review.date}</TableCell>
                  <TableCell>{review.rating}</TableCell>
                  <TableCell>{review.product ? review.product.name : 'Неизвестный продукт'}</TableCell>
                  <TableCell>{review.user ? review.user.username : 'Неизвестный пользователь'}</TableCell>
                  {isAdmin && (
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={() => handleDelete(review.id)}>
                        Удалить
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={isAdmin ? 7 : 5} align="center">
                  <Typography variant="h6" color="textSecondary">
                    У вас нет никаких отзывов
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ReviewTable;