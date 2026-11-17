import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  /** Nombre de la sección, para el log en desarrollo. */
  name: string
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

/** Único componente de clase permitido (constitución): si una sección falla, no se muestra y el resto sigue. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error(`[ErrorBoundary] Falló la sección "${this.props.name}"`, error, info.componentStack)
    }
  }

  render() {
    return this.state.hasError ? null : this.props.children
  }
}
