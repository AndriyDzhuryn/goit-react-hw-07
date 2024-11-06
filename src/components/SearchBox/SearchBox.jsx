import { useDispatch, useSelector } from 'react-redux';

import { changeFilter, selectNameFilter } from '../../redux/filtersSlice.js';

import css from './SearchBox.module.css';

const SearchBox = () => {
  const dispatch = useDispatch();

  const filter = useSelector(selectNameFilter);

  return (
    <div className={css.boxFindName}>
      <label className={css.findName}>
        Find contacts by name
        <input
          className={css.inputFindName}
          type="text"
          value={filter}
          onChange={e => {
            const action = changeFilter(e.target.value);
            dispatch(action);
          }}
        />
      </label>
    </div>
  );
};

export default SearchBox;
