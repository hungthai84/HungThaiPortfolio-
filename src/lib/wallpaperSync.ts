import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from './firebase';

export interface WallpaperPreferences {
  customWallpapers: any[];
  deletedWallpaperIds: string[];
  selectedWallpaperId: string;
}

export async function savePreferencesToCloud(prefs: WallpaperPreferences) {
  const user = auth.currentUser;
  if (!user) return;
  try {
    const prefRef = doc(db, 'users', user.uid, 'preferences', 'wallpapers');
    await setDoc(prefRef, {
      ...prefs,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (err) {
    console.error('Failed to sync wallpapers to cloud:', err);
  }
}

export async function loadPreferencesFromCloud(): Promise<WallpaperPreferences | null> {
  const user = auth.currentUser;
  if (!user) return null;
  try {
    const prefRef = doc(db, 'users', user.uid, 'preferences', 'wallpapers');
    const snap = await getDoc(prefRef);
    if (snap.exists()) {
      const data = snap.data();
      return {
        customWallpapers: data.customWallpapers || [],
        deletedWallpaperIds: data.deletedWallpaperIds || [],
        selectedWallpaperId: data.selectedWallpaperId || 'fluid-mesh',
      };
    }
  } catch (err) {
    console.error('Failed to load wallpapers from cloud:', err);
  }
  return null;
}
