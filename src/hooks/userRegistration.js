import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UserRegistration() {
  const navigate = useNavigate();
  const register = async (email, password, photo, displayNameValue) => {
    try {
      // Registration User
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (!res) {
        throw new Error("Email Sudah Terdaftar");
      }
      // Upload Avatar
      const uploadPath = `images/${res.user.uid}/${photo.name}`;
      const refStorage = ref(storage, uploadPath);
      await uploadBytes(refStorage, photo);

      // update PhotoURL & displayName to User
      await getDownloadURL(refStorage)
        .then(async (url) => {
          await updateProfile(res.user, {
            displayName: displayNameValue,
            photoURL: url,
          });
        })
        .catch((err) => console.log(err));
      console.log(res.user);

      // Add Data User to Firestore
      await setDoc(doc(db, "users", res.user.uid), {
        online: false,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
        email: res.user.email,
      });

      toast.success("Registration Success!!!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      //   Navigate to Login
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error) alert("Email Sudah Terdaftar");
    }
  };

  return register;
}

export default UserRegistration;
