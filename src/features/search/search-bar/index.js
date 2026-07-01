import { useDispatch, useSelector } from "react-redux";
import {
  selectSearchTerm,
  setSearchTerm,
} from "../search.slice";

export default function SearchBar() {
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();

  function handleSearchTermChange(event) {
    dispatch(setSearchTerm(event.target.value));
  }

  return (
    <form className="search-bar">
      <label htmlFor="search">Search by caption: </label>

      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
        placeholder="Search by caption"
      />
    </form>
  );
}
