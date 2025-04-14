import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { signOut } from "firebase/auth";
import {
  collection, addDoc, onSnapshot, deleteDoc, doc
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const navigate = useNavigate();

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const unsub = onSnapshot(
      collection(db, "users", user.uid, "todos"),
      (snapshot) => {
        setTodos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    );

    return () => unsub();
  }, [user]);

  const addTodo = async () => {
    if (newTodo.trim() === "") return;

    await addDoc(collection(db, "users", user.uid, "todos"), {
      text: newTodo,
    });
    setNewTodo("");
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "users", user.uid, "todos", id));
  };

  const logout = () => {
    signOut(auth).then(() => navigate("/login"));
  };

  return (
    <div>
      <h2>Todo App</h2>
      <button onClick={logout}>Logout</button>
      <br /><br />
      <input
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text} <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
