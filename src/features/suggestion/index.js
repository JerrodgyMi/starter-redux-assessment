import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSuggestion,
  selectSuggestion,
} from "./suggestion.slice";

export default function Suggestion() {
  const dispatch = useDispatch();

  const {
    suggestion,
    isLoading,
    hasError,
  } = useSelector(selectSuggestion);

  useEffect(() => {
    dispatch(fetchSuggestion());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading suggestion...</p>;
  }

  if (hasError) {
    return <p>Failed to load suggestion.</p>;
  }

  const { imageUrl, caption } = suggestion;

  return (
    <section>
      <h2>Suggestion of the Day</h2>

      {imageUrl && <img src={imageUrl} alt={caption} />}

      {caption && <p>{caption}</p>}
    </section>
  );
}
