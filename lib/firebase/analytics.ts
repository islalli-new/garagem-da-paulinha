"use client"

import { getAnalytics, isSupported, type Analytics } from "firebase/analytics"

import { getFirebaseApp, getFirebaseWebConfig } from "@/lib/firebase/client"

let analyticsInstance: Analytics | null = null
let analyticsPromise: Promise<Analytics | null> | null = null

export async function getFirebaseAnalyticsInstance() {
  if (analyticsInstance) {
    return analyticsInstance
  }

  if (analyticsPromise) {
    return analyticsPromise
  }

  analyticsPromise = (async () => {
    const app = getFirebaseApp()
    const measurementId = getFirebaseWebConfig().measurementId

    if (!app || !measurementId) {
      return null
    }

    const supported = await isSupported().catch(() => false)

    if (!supported) {
      return null
    }

    analyticsInstance = getAnalytics(app)
    return analyticsInstance
  })()

  return analyticsPromise
}