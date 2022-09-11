import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import selectUser from "./selectors/selectUser";
import { AppDispatch, RootState } from "./store";
import { fetchProducts } from "./store/Product.slice";
import { addNome, fetchUser } from "./store/User.slice";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const name = useSelector(selectUser);

  const [userName, setUserName] = useState("");

  return (
    <div>
      <h1>Olá {name}</h1>
      <input
        placeholder="Digite seu nome"
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
      />
      <button
        onClick={() => dispatch(fetchUser("https://localhost:3333/user"))}
      >
        Disparar
      </button>
      <button onClick={() => dispatch(fetchProducts())}>Buscar Produtos</button>
    </div>
  );
}

export default App;
