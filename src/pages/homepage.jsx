
import { useRecoilValue } from "recoil";
import { fetcall } from "../atoms/testatom";

export const HomePage = () => {
  // Using `useRecoilValue` to access the selector value directly
  const apiresponse = useRecoilValue(fetcall); // This triggers the API call and gives us the data

  return (
    <div>
      <ul>
        {apiresponse.length > 0 ? (
          apiresponse.map((item, index) => (
            <li key={index}>{item.title}</li> // Properly return the list item
          ))
        ) : (
          <li>Loading...</li> // Display a loading state while waiting for the API data
        )}
      </ul>
    </div>
  );
};
