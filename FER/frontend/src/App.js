import axios from "axios";
import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";

function App () {
  const routing = useRoutes(Themeroutes);

  useEffect(
    () => {
      axios.get('http://api.elif.vvadev.ru:3000/api/check').then(
        (data) => {
          console.log(data)
        }
      )
    }, [null]
  )

  return (
    <div className="dark">{routing}</div>
  )
}

export default App;
