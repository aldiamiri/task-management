import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { UseLogin } from "../features/userSlice";
import { auth, db } from "../firebase/config";

const UserLogin = () => {
  const dispatch = useDispatch();
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userInfo = {
          displayName: user.displayName,
          userId: user.uid,
          photoURL: user.photoURL,
          email: user.email,
        };

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          online: true,
        });

        toast.success("Login Success, Redirecting", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        setTimeout(() => {
          dispatch(UseLogin(userInfo));
        }, 1000);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return login;
};

export default UserLogin;
