//Componentes
import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ childen }) => {
  //variables
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //funciones

  //data a exportar
  const data = {};
  //return
  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export { UserProvider };
export default UserContext;
