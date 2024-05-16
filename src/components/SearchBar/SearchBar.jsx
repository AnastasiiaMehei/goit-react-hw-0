import { IoIosSearch } from "react-icons/io";
import { Formik, Form, Field } from "formik";
import css from './SearchBar.module.css'
export default function SearchBar({onSearch}){
return(
    <Formik
    initialValues={{query: ""}}
    onSubmit={(values, actions)=> {
      onSearch(values.query)
      actions.resetForm()}
    }>
<Form className={css.form} >
  <Field className={css.input}
      type="text"
      name="query"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"/>
  <button className={css.btn} type="submit">
    <IoIosSearch/>
    </button>
</Form>
      </Formik>
      )}