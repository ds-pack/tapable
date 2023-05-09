'use client'
import {
  useEffect,
  useCallback,
  useState,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEventHandler,
  MouseEvent,
} from 'react'
import { useSharedRef } from '@ds-pack/use-refs'

export interface UseTapableProps {
  disabled?: boolean
  autoFocus?: boolean
  onClick?: MouseEventHandler
  onKeyDown?: (e: KeyboardEvent | MouseEvent) => void
  [key: string]: unknown
}

function noop() {}

export function useTapable(
  {
    disabled = false,
    autoFocus = false,
    onClick = noop,
    onKeyDown = noop,
    ...props
  }: UseTapableProps,
  ref: any,
) {
  let sharedRef = useSharedRef(ref)
  let [focused, setFocused] = useState(autoFocus)

  useEffect(() => {
    if (focused) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          sharedRef.current.focus()
        })
      })
    }
  }, [focused])

  let handleClick = useCallback(
    function handleClick(event: MouseEvent) {
      onClick(event)
      setFocused(true)
    },
    [onClick],
  )

  let handleKeyDown = useCallback(
    function handleKeyDown(event: KeyboardEvent) {
      onKeyDown(event)
      if (event.key === 'Enter' || event.key === ' ') {
        if (event.key === ' ') {
          event.preventDefault()
        }
        onClick(event as unknown as MouseEvent)
      }
    },
    [onClick, onKeyDown],
  )

  return {
    ...props,
    onKeyDown: disabled ? noop : handleKeyDown,
    onClick: disabled ? noop : handleClick,
    ref: sharedRef,
    role: 'button',
    tabIndex: disabled ? -1 : 0,
    'data-disabled': String(disabled),
    'aria-disabled': disabled ? true : undefined,
  }
}

export default useTapable
