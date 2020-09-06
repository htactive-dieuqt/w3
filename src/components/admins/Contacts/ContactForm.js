import React, { useEffect, useState } from "react";
import { Form } from "semantic-ui-react";

const ContactForm = (props) => {
  const initialFieldValues = {
    category: "",
  };

  var [values, setValues] = useState(initialFieldValues);

  // useEffect(() => {
  //   // eslint-disable-next-line eqeqeq
  //   if (props.currentId == "")
  //     setValues({
  //       ...initialFieldValues,
  //     });
  //   else
  //     setValues({
  //       ...props.contactOjects[props.currentId],
  //     });
  // }, [props.currentId, props.contactOjects]);

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.addOrEdit(values);
  };

  return (
    <>
      <Form autoComplete="off" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Category"
            name="category"
            value={values.category}
            onChange={handleInputChange}
          />
          {/* </div> */}
        </div>

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <input
              type="submit"
              // eslint-disable-next-line eqeqeq
              value={props.currentId == "" ? "Save" : "Update"}
              className="btn btn-primary btn-block"
            />
          </div>
        </div>
      </Form>
    </>
  );
};

export default ContactForm;
