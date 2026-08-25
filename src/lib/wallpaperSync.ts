import { doc, getDoc, setDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { db, auth } from './firebase';

export interface WallpaperPreferences {
  customWallpapers: any[];
  deletedWallpaperIds: string[];
  selectedWallpaperId: string;
  isWallpaperHidden?: boolean;
}

let isAuthInitialized = false;

export async function ensureAuth(): Promise<string | null> {
  if (auth.currentUser) return auth.currentUser.uid;
  try {
    const cred = await signInAnonymously(auth);
    return cred.user.uid;
  } catch (err) {
    console.warn('Anonymous auth fallback:', err);
    return auth.currentUser?.uid || null;
  }
}

export async function savePreferencesToCloud(prefs: WallpaperPreferences) {
  try {
    const uid = await ensureAuth();
    if (!uid) return;
    const prefRef = doc(db, 'users', uid, 'preferences', 'wallpapers');
    await setDoc(prefRef, {
      ...prefs,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (err) {
    console.error('Failed to sync wallpapers to cloud:', err);
  }
}

export async function loadPreferencesFromCloud(): Promise<WallpaperPreferences | null> {
  try {
    const uid = await ensureAuth();
    if (!uid) return null;
    const prefRef = doc(db, 'users', uid, 'preferences', 'wallpapers');
    const snap = await getDoc(prefRef);
    if (snap.exists()) {
      const data = snap.data();
      return {
        customWallpapers: data.customWallpapers || [],
        deletedWallpaperIds: data.deletedWallpaperIds || [],
        selectedWallpaperId: data.selectedWallpaperId || 'fluid-mesh',
        isWallpaperHidden: data.isWallpaperHidden ?? false,
      };
    }
  } catch (err) {
    console.error('Failed to load wallpapers from cloud:', err);
  }
  return null;
}

export function subscribePreferencesFromCloud(
  onUpdate: (prefs: WallpaperPreferences) => void
): () => void {
  let unsubscribeSnapshot: (() => void) | null = null;

  const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const prefRef = doc(db, 'users', user.uid, 'preferences', 'wallpapers');
      unsubscribeSnapshot = onSnapshot(prefRef, (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          onUpdate({
            customWallpapers: data.customWallpapers || [],
            deletedWallpaperIds: data.deletedWallpaperIds || [],
            selectedWallpaperId: data.selectedWallpaperId || 'fluid-mesh',
            isWallpaperHidden: data.isWallpaperHidden ?? false,
          });
        }
      }, (error) => {
        console.warn('Firestore wallpaper subscription error:', error);
      });
    } else {
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
        unsubscribeSnapshot = null;
      }
      ensureAuth().catch(() => {});
    }
  });

  return () => {
    unsubscribeAuth();
    if (unsubscribeSnapshot) {
      unsubscribeSnapshot();
    }
  };
}

