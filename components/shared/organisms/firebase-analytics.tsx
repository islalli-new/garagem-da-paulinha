"use client"

import { useEffect } from "react"

import { getFirebaseAnalyticsInstance } from "@/lib/firebase/analytics"

export function FirebaseAnalytics() {
  useEffect(() => {
    void getFirebaseAnalyticsInstance()
  }, [])

  return null
}