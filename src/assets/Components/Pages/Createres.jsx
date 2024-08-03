import axios from "axios";
import { Formik } from "formik";
import { Button, Container, Form } from "react-bootstrap";

export default function Createres() {
  const initialValues = {
    name: "",
    image: "",
    address: "",
    city: "",
    features: "",
    amount: "",
    menu: "",
    cuisines: "",
    timing: "",
    buckets: "",
    ratings: "",
  };

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Required";
          }
          if (!values.image) {
            errors.image = "Required";
          }
          if (!values.address) {
            errors.address = "Required";
          }
          if (!values.city) {
            errors.city = "Required";
          }
          if (!values.features) {
            errors.features = "Required";
          }
          if (!values.amount) {
            errors.amount = "Required";
          }
          if (!values.menu) {
            errors.menu = "Required";
          }
          if (!values.cuisines) {
            errors.cuisines = "Required";
          }
          if (!values.timing) {
            errors.timing = "Required";
          }
          if (!values.buckets) {
            errors.buckets = "Required";
          }
          if (!values.ratings) {
            errors.ratings = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const token = localStorage.getItem("token");
          const payload = {
            ...values,
            features: values.features.split(","),
            menu: values.menu.split(","),
            cuisines: values.cuisines.split(","),
            timing: values.timing.split(","),
          };
          try {
            const response = await axios.post(
              "https://restaurantappbackend-ssw6.onrender.com/restaurants/create-restaurant",
              payload,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log("Restaurant created successfully:", response.data);
            resetForm();
          } catch (error) {
            console.error("There was an error creating the Restaurant!", error);
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Restaurant Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter Restaurant Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && errors.name ? <div>{errors.name}</div> : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Restaurant Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter Restaurant Address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.address && errors.address ? (
                <div>{errors.address}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                placeholder="Enter Restaurant City"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.city && errors.city ? <div>{errors.city}</div> : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="amount">
              <Form.Label>Restaurant Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                placeholder="Enter Restaurant Amount"
                value={values.amount}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.amount && errors.amount ? (
                <div>{errors.amount}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Restaurant Image</Form.Label>
              <Form.Control
                type="text"
                name="image"
                placeholder="Image address"
                value={values.image}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.image && errors.image ? <div>{errors.image}</div> : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="features">
              <Form.Label>Restaurant Features (comma separated)</Form.Label>
              <Form.Control
                type="text"
                name="features"
                placeholder="Enter Restaurant features"
                value={values.features}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.features && errors.features ? (
                <div>{errors.features}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="menu">
              <Form.Label>Restaurant Menu (comma separated)</Form.Label>
              <Form.Control
                type="text"
                name="menu"
                placeholder="Enter Restaurant Menu"
                value={values.menu}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.menu && errors.menu ? <div>{errors.menu}</div> : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="timing">
              <Form.Label>Restaurant Timing (comma separated)</Form.Label>
              <Form.Control
                type="text"
                name="timing"
                placeholder="Enter Restaurant Timing"
                value={values.timing}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.timing && errors.timing ? (
                <div>{errors.timing}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="buckets">
              <Form.Label>Restaurant Buckets</Form.Label>
              <Form.Control
                type="text"
                name="buckets"
                placeholder="Enter Restaurant Buckets"
                value={values.buckets}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.buckets && errors.buckets ? (
                <div>{errors.buckets}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="ratings">
              <Form.Label>Restaurant Ratings</Form.Label>
              <Form.Control
                type="number"
                name="ratings"
                placeholder="Enter Restaurant Ratings"
                value={values.ratings}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.ratings && errors.ratings ? (
                <div>{errors.ratings}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="cuisines">
              <Form.Label>Restaurant Cuisines (comma separated)</Form.Label>
              <Form.Control
                type="text"
                name="cuisines"
                placeholder="Enter Restaurant Cuisines"
                value={values.cuisines}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.cuisines && errors.cuisines ? (
                <div>{errors.cuisines}</div>
              ) : null}
            </Form.Group>
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
            <Button type="reset">Cancel</Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
