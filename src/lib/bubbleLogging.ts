import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db, auth } from "./firebase";

export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null,
) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface BubbleInteractionLog {
  id?: string;
  type: "appearance" | "click";
  action: string;
  expression: string;
  sessionId: string;
  createdAt: Date | string | number | null;
}

// Generate or retrieve a persistent session ID for the visitor
export function getVisitorSessionId(): string {
  let sessionId = localStorage.getItem("portfolio_bubble_session_id");
  if (!sessionId) {
    sessionId =
      "sess_" + Math.random().toString(36).substring(2, 15) + "_" + Date.now();
    localStorage.setItem("portfolio_bubble_session_id", sessionId);
  }
  return sessionId;
}

// Log an event both locally (for instant UI/offline capability) and to Firestore (for global tracking)
export async function logBubbleInteraction(
  type: "appearance" | "click",
  action: string,
  expression: string,
): Promise<void> {
  const sessionId = getVisitorSessionId();

  // 1. Log locally in localStorage for fast offline stats & history
  try {
    const localLogsStr = localStorage.getItem("local_bubble_logs") || "[]";
    const localLogs = JSON.parse(localLogsStr);
    localLogs.push({
      type,
      action,
      expression,
      sessionId,
      createdAt: new Date().toISOString(),
    });
    // Keep only the last 100 logs locally
    if (localLogs.length > 100) {
      localLogs.shift();
    }
    localStorage.setItem("local_bubble_logs", JSON.stringify(localLogs));

    // Update local summary counters
    const appearances = Number(
      localStorage.getItem("bubble_local_appearances") || "0",
    );
    const clicks = Number(localStorage.getItem("bubble_local_clicks") || "0");
    if (type === "appearance") {
      localStorage.setItem("bubble_local_appearances", String(appearances + 1));
    } else {
      localStorage.setItem("bubble_local_clicks", String(clicks + 1));
    }
  } catch (e) {
    console.warn("Error saving local log:", e);
  }

  // 2. Log globally to Firestore
  try {
    await addDoc(collection(db, "bubble_logs"), {
      type,
      action,
      expression,
      sessionId,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.warn(
      "Could not write global bubble log to Firestore (using local storage fallback):",
      error,
    );
  }
}

// Get compiled statistics (combining global Firestore data with local fallback)
export async function getBubbleStatistics() {
  try {
    const q = query(
      collection(db, "bubble_logs"),
      orderBy("createdAt", "desc"),
      limit(150),
    );
    let querySnapshot;
    try {
      querySnapshot = await getDocs(q);
    } catch (err) {
      console.warn("Firestore offline or query notice, using local fallback:", err);
      querySnapshot = null;
    }

    if (!querySnapshot || querySnapshot.empty) {
      // Fallback to local logs if DB has nothing or offline
      const localLogsStr = localStorage.getItem("local_bubble_logs") || "[]";
      const decodedLocal = JSON.parse(localLogsStr);
      return processLogsToStats(
        decodedLocal.map((l: BubbleInteractionLog) => ({
          ...l,
          createdAt: new Date(l.createdAt as string | number),
        })),
      );
    }

    const logs: Array<{
      type: "appearance" | "click";
      action: string;
      expression: string;
      sessionId: string;
      createdAt: Date;
    }> = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      logs.push({
        type: data.type,
        action: data.action,
        expression: data.expression,
        sessionId: data.sessionId || "anonymous",
        createdAt: data.createdAt?.toDate() || new Date(),
      });
    });

    return processLogsToStats(logs);
  } catch (error) {
    console.warn(
      "Failed to retrieve global logs, using local fallback:",
      error,
    );
    const localLogsStr = localStorage.getItem("local_bubble_logs") || "[]";
    const decodedLocal = JSON.parse(localLogsStr);
    return processLogsToStats(
      decodedLocal.map((l: BubbleInteractionLog) => ({
        ...l,
        createdAt: new Date(l.createdAt as string | number),
      })),
    );
  }
}

function processLogsToStats(logs: BubbleInteractionLog[]) {
  let appearances = 0;
  let clicks = 0;
  const uniqueSessions = new Set<string>();
  const expressionCounts: { [key: string]: number } = {
    vui_ve: 0,
    chao_hoi: 0,
    suy_tu: 0,
    nhiet_huyet: 0,
  };
  const actionCounts: { [key: string]: number } = {};

  // Sort logs descending by timestamp
  const getTime = (val: Date | string | number | null) =>
    val instanceof Date ? val.getTime() : new Date(val || 0).getTime();
  const sortedLogs = [...logs].sort(
    (a, b) => getTime(b.createdAt) - getTime(a.createdAt),
  );

  sortedLogs.forEach((log) => {
    if (log.type === "appearance") {
      appearances++;
    } else {
      clicks++;
    }

    if (log.sessionId) {
      uniqueSessions.add(log.sessionId);
    }

    if (log.expression && expressionCounts[log.expression] !== undefined) {
      expressionCounts[log.expression]++;
    }

    if (log.action) {
      actionCounts[log.action] = (actionCounts[log.action] || 0) + 1;
    }
  });

  return {
    totalAppearances: appearances,
    totalClicks: clicks,
    uniqueVisitors: uniqueSessions.size,
    ctr: appearances > 0 ? Math.round((clicks / appearances) * 100) : 0,
    expressions: expressionCounts,
    actions: actionCounts,
    recentHistory: sortedLogs.slice(0, 10), // Top 10 latest interactions
  };
}
