import Sample from "@/components/Sample";
import Counter from "./components/study/Counter";
import UserList from "./components/study/UserList";
import Main from "./components/study/CRUD/Main";
import axios from "axios";

const App = () => {
  axios.defaults.baseURL = process.env.REACT_APP_DB_URL;

  return <Main />;
};

export default App;
