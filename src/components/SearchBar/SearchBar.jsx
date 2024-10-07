import { Formik, Form, Field } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineSearch } from "react-icons/ai";
import s from "./SearchBar.module.css";

const SearchBar = ({ handleChangeQuery }) => {
  const initialValues = {
    query: "",
  };

  const handleSubmit = (values) => {
    if (!values.query) {
      toast.error("You must enter the movie title to search");
      return;
    }
    handleChangeQuery(values.query);
  };

  const toastOptions = {
    style: {
      background: "#D8BFD8",
      color: "#000",
    },
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={s.form}>
          <div className={s.box}>
            <Field
              name="query"
              className={s.field}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="enter movie title"
            />
            <button className={s.button} type="submit">
              <AiOutlineSearch size="30" />
            </button>
            <Toaster
              containerStyle={{ top: 110 }}
              toastOptions={toastOptions}
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
};
export default SearchBar;
