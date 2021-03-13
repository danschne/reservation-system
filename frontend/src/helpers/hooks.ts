import { Dispatch, useEffect, useState } from "react";

const KEY_DARK_MODE_ON = "darkModeOn";

function useDarkModeOnFromLocalStorage(): [boolean, Dispatch<React.SetStateAction<boolean>>] {
  const [darkModeOn, setDarkModeOn] = useState<boolean>(
    JSON.parse(localStorage.getItem(KEY_DARK_MODE_ON) ?? "false")
  );

  useEffect(() => {
    localStorage.setItem(KEY_DARK_MODE_ON, JSON.stringify(darkModeOn));
  }, [darkModeOn]);

  return [darkModeOn, setDarkModeOn];
}

export { useDarkModeOnFromLocalStorage };
