import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { addContact } from '../../redux/contactsOps.js';

import css from './ContactForm.module.css';

const INITIAL_VALUES = { name: '', number: '' };

const ContactForm = () => {
  const dispatch = useDispatch();

  const addNewContact = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  const regExpPhone = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

  const validationError = Yup.object({
    name: Yup.string()
      .required('Field is required')
      .min(3, 'Name must be at least 3 characters')
      .max(50, 'Name must be less then 50 characters'),
    number: Yup.string()
      .required('Field is required')
      .matches(regExpPhone, 'Invalid phone number')
      .min(3, 'Invalid phone number'),
  });

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={validationError}
      onSubmit={addNewContact}
    >
      <Form className={css.formAddContact}>
        <label className={css.inputDataContacts}>
          <span>Name</span>
          <Field className={css.inputNameContacts} type="text" name="name" />
          <ErrorMessage name="name" component="span" />
        </label>
        <label className={css.inputDataContacts}>
          <span>Number</span>
          <Field
            className={css.inputNumberContacts}
            type="text"
            name="number"
          />
          <ErrorMessage name="number" component="span" />
        </label>
        <button type="submit" className={css.btnAddContact}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
