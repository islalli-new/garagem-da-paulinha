import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app"

const firebaseEnvKeys = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
  "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID",
] as const

type FirebaseEnvKey = (typeof firebaseEnvKeys)[number]

type FirebaseWebConfig = {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId?: string
}

function readEnvValue(key: FirebaseEnvKey) {
  return process.env[key] ?? ""
}

export function getFirebaseWebConfig(): FirebaseWebConfig {
  return {
    apiKey: readEnvValue("NEXT_PUBLIC_FIREBASE_API_KEY"),
    authDomain: readEnvValue("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
    projectId: readEnvValue("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
    storageBucket: readEnvValue("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: readEnvValue("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
    appId: readEnvValue("NEXT_PUBLIC_FIREBASE_APP_ID"),
    measurementId: readEnvValue("NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID") || undefined,
  }
}

export function getFirebaseDiagnostics() {
  const config = getFirebaseWebConfig()

  return firebaseEnvKeys.map((key) => ({
    key,
    available: Boolean(config[toFirebaseConfigField(key)]),
  }))
}

export function hasFirebaseWebConfig() {
  return getFirebaseDiagnostics()
    .filter((entry) => entry.key !== "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID")
    .every((entry) => entry.available)
}

export function getFirebaseApp(): FirebaseApp | null {
  if (!hasFirebaseWebConfig()) {
    return null
  }

  return getApps().length > 0 ? getApp() : initializeApp(getFirebaseWebConfig())
}

function toFirebaseConfigField(key: FirebaseEnvKey) {
  switch (key) {
    case "NEXT_PUBLIC_FIREBASE_API_KEY":
      return "apiKey"
    case "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN":
      return "authDomain"
    case "NEXT_PUBLIC_FIREBASE_PROJECT_ID":
      return "projectId"
    case "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET":
      return "storageBucket"
    case "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID":
      return "messagingSenderId"
    case "NEXT_PUBLIC_FIREBASE_APP_ID":
      return "appId"
    case "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID":
      return "measurementId"
  }
}