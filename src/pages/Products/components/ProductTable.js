import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct, updateProduct } from '../../../redux/actions/productsActions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ProductTable = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [editProduct, setEditProduct] = React.useState(null);
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleEditSave = (values) => {
    dispatch(updateProduct(values));
    setEditProduct(null);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Название продукта обязательно для заполнения'),
    description: Yup.string().required('Описание продукта обязательно для заполнения'),
    price: Yup.number().required('Цена продукта обязательна для заполнения').positive('Цена должна быть положительным числом'),
    quantity: Yup.number().required('Количество продукта обязательно для заполнения').positive('Количество должно быть положительным целым числом')
  });

  return (
    <TableContainer component={Paper} style={{ backgroundColor: theme.palette.background.paper }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Описание</TableCell>
            <TableCell>Товар</TableCell>
            <TableCell>Цена</TableCell>
            <TableCell>Количество</TableCell>
            {isAdmin && (
              <>
                <TableCell>Редактировать</TableCell>
                <TableCell>Удалить</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              {isAdmin && (
                <>
                  <TableCell>
                    <Button variant="contained" color="secondary" onClick={() => handleEdit(product)}>
                      Редактировать
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleDelete(product.id)}>
                      Удалить
                    </Button>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editProduct && (
        <Dialog open={Boolean(editProduct)} onClose={() => setEditProduct(null)}>
          <DialogTitle>Редактировать продукт</DialogTitle>
          <DialogContent>
            <Formik
              initialValues={editProduct}
              validationSchema={validationSchema}
              onSubmit={handleEditSave}
            >
              {({ values, handleChange, errors }) => (
                <Form>
                  <Field
                    as={TextField}
                    margin="dense"
                    label="Описание"
                    type="text"
                    fullWidth
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    error={!!errors.description}
                    helperText={<ErrorMessage name="description" />}
                  />
                  <Field
                    as={TextField}
                    margin="dense"
                    label="Товар"
                    type="text"
                    fullWidth
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={<ErrorMessage name="name" />}
                  />
                  <Field
                    as={TextField}
                    margin="dense"
                    label="Цена"
                    type="number"
                    fullWidth
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    error={!!errors.price}
                    helperText={<ErrorMessage name="price" />}
                  />
                  <Field
                    as={TextField}
                    margin="dense"
                    label="Количество"
                    type="number"
                    fullWidth
                    name="quantity"
                    value={values.quantity}
                    onChange={handleChange}
                    error={!!errors.quantity}
                    helperText={<ErrorMessage name="quantity" />}
                  />
                  <DialogActions>
                    <Button onClick={() => setEditProduct(null)} color="primary">
                      Отмена
                    </Button>
                    <Button type="submit" color="primary">
                      Сохранить
                    </Button>
                  </DialogActions>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      )}
    </TableContainer>
  );
};

export default ProductTable;
