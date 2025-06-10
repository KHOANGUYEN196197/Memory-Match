import type { User } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

export async function saveScore(user: User, level: number, time: number) {
  const db = getFirestore();
  const userRef = doc(db, "leaderboard", user.uid);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    const prev = snap.data();
    // Chỉ lưu nếu level mới cao hơn, hoặc time tốt hơn
    if (
      level > prev.level ||
      (level === prev.level && time < prev.time)
    ) {
      await setDoc(userRef, {
        name: user.displayName,
        photoURL: user.photoURL,
        level,
        time,
      });
    }
  } else {
    // fallback nếu chưa có
    await setDoc(userRef, {
      name: user.displayName,
      photoURL: user.photoURL,
      level,
      time,
    });
  }
}
