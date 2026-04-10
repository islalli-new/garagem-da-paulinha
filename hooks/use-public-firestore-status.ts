"use client"

import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"

import { getFirebaseFirestore } from "@/lib/firebase/firestore"

type PublicFirestoreStatus = {
  loading: boolean
  available: boolean
  exists: boolean
  error: string | null
  data: Record<string, unknown> | null
}

const initialState: PublicFirestoreStatus = {
  loading: true,
  available: false,
  exists: false,
  error: null,
  data: null,
}

export function usePublicFirestoreStatus() {
  const [state, setState] = useState<PublicFirestoreStatus>(initialState)

  useEffect(() => {
    let cancelled = false

    async function load() {
      const db = getFirebaseFirestore()

      if (!db) {
        if (!cancelled) {
          setState({
            loading: false,
            available: false,
            exists: false,
            error: "Firebase nao inicializado.",
            data: null,
          })
        }

        return
      }

      try {
        const snapshot = await getDoc(doc(db, "app_public", "status"))

        if (cancelled) {
          return
        }

        setState({
          loading: false,
          available: true,
          exists: snapshot.exists(),
          error: null,
          data: snapshot.exists() ? (snapshot.data() as Record<string, unknown>) : null,
        })
      } catch (error) {
        if (cancelled) {
          return
        }

        setState({
          loading: false,
          available: true,
          exists: false,
          error: error instanceof Error ? error.message : "Falha ao ler o Firestore.",
          data: null,
        })
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [])

  return state
}