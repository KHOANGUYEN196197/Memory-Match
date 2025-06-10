import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { loginWithGoogle, logout } from '../firebase/firebase';

export default function LoginWithGG() {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? (
    <div className="flex items-center gap-[8px]">
      <img src={currentUser.photoURL ?? ''} className="w-[32px] h-[32px] rounded-full" />
      <span    style={{ fontFamily: "Pokemon Solid" }}>{currentUser.displayName}</span>
      <button onClick={logout} className="text-red-500 font-bold"    style={{ fontFamily: "Pokemon Solid" }}>Logout</button>
    </div>
  ) : (
    <button onClick={loginWithGoogle} className="bg-blue-500 px-4 py-2 text-white rounded"    style={{ fontFamily: "Pokemon Solid" }}>
      Login with Google
    </button>
  );
}
