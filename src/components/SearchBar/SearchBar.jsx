import { IoIosSearch } from "react-icons/io";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./SearchBar.module.css";
export default function SearchBar({ onSearch }) {
  const validationSchema = Yup.object().shape({
    query: Yup.string()
      .min(3, "Too Short")
      .max(50, "Too Long")
      .required("Required"),
  });

  return (
    <div className={css.div}>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, actions) => {
          onSearch(values.query);
          actions.resetForm();
        }}
        validationSchema={validationSchema}
      >
        <Form className={css.form}>
          <div className={css.divButton}>
            <button className={css.btn} type="submit">
              <IoIosSearch />
            </button>
            <Field
              className={css.input}
              type="text"
              name="query"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
            <ErrorMessage className={css.span} name="query" component="span" />
          </div>
        </Form>
      </Formik>
    </div>
  );
}
