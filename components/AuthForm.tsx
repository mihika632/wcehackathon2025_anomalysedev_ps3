// "use client";
// import { useState } from "react";
// import { auth, googleProvider } from "@/config/firebaseClient";
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

// export default function AuthForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isRegister, setIsRegister] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (isRegister) {
//         await createUserWithEmailAndPassword(auth, email, password);
//       } else {
//         await signInWithEmailAndPassword(auth, email, password);
//       }
//       alert("Success!");
//     } catch (error: any) {
//       alert(error.message);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//       alert("Google login successful!");
//     } catch (error: any) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>{isRegister ? "Register" : "Login"}</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
//         <button type="submit">{isRegister ? "Sign Up" : "Login"}</button>
//       </form>
//       <button onClick={handleGoogleLogin}>Login with Google</button>
//       <button onClick={() => setIsRegister(!isRegister)}>
//         {isRegister ? "Already have an account? Login" : "New user? Register"}
//       </button>
//     </div>
//   );
// }
