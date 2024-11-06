import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Circles } from 'react-loader-spinner';

import ContactForm from './components/ContactForm/ContactForm.jsx';
import ContactList from './components/ContactList/ContactList.jsx';
import SearchBox from './components/SearchBox/SearchBox.jsx';

import { fetchContacts } from './redux/contactsOps.js';
import { selectError, selectLoading } from './redux/contactsSlice.js';

import css from './App.module.css';

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.appWrapper}>
      <h1 className={css.title}>Phonebook</h1>

      <ContactForm />
      <SearchBox />
      {isLoading && !error && (
        <div className={css.loaderWrapper}>
          <Circles
            height="80"
            width="80"
            color="#0000ff"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      {error && (
        <p className={css.error}>
          Whoops, something went wrong! Please try reloading this page! <br />
          <span>{error}</span>
        </p>
      )}
      <ContactList />
    </div>
  );
}

export default App;
