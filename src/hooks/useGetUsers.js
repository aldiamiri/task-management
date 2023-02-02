import { useEffect, useState } from "react";
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";

const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "users"), orderBy("displayName")),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setUsers(list);
      },
      (error) => setError(error)
    );
    return () => {
      unsub();
    };
  }, []);

  return { users, error };
};

export default useGetUsers;
