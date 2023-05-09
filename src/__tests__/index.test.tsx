import React, { useRef } from 'react'
import { useTapable } from '../index'
import { fireEvent, render, screen } from '@testing-library/react'

function Tapable(props) {
  let ref = useRef()
  let aria = useTapable(props, ref)

  return <div {...aria} />
}

test('it gives back all the props we expect', () => {
  render(<Tapable data-testid="init" />)
  expect(screen.getByTestId('init').getAttribute('role')).toBe('button')
  expect(screen.getByTestId('init').getAttribute('tabIndex')).toBe('0')
  expect(screen.getByTestId('init').getAttribute('aria-disabled')).toBeFalsy()
})

test('it gives back all the props we expect when disabled', () => {
  render(<Tapable data-testid="init" disabled />)
  expect(screen.getByTestId('init').getAttribute('role')).toBe('button')
  expect(screen.getByTestId('init').getAttribute('tabIndex')).toBe('-1')
  expect(screen.getByTestId('init').getAttribute('aria-disabled')).toBe('true')
})

test('it focuses the element if called with autoFocus', () => {
  let prevAnimationFrame = globalThis.requestAnimationFrame
  globalThis.requestAnimationFrame = (cb) => (cb(0), 0)
  render(<Tapable autoFocus data-testid="autofocus" />)
  expect(document.activeElement).toBe(screen.getByTestId('autofocus'))
  globalThis.requestAnimationFrame = prevAnimationFrame
})

test('calls onClick handler if focused and the user presses enter', () => {
  let clickHandler = jest.fn()
  render(<Tapable data-testid="key-enter" onClick={clickHandler} />)
  screen.getByTestId('key-enter').focus()
  fireEvent.keyDown(screen.getByTestId('key-enter'), {
    key: 'Enter',
    code: 'Enter',
    charCode: 13,
  })
  expect(clickHandler).toHaveBeenCalledTimes(1)
})

test('calls onClick handler if focused and the user presses spacebar', () => {
  let clickHandler = jest.fn()
  render(<Tapable data-testid="key-space" onClick={clickHandler} />)
  screen.getByTestId('key-space').focus()
  fireEvent.keyDown(screen.getByTestId('key-space'), {
    key: ' ',
    code: ' ',
  })
  expect(clickHandler).toHaveBeenCalledTimes(1)
})

test('calls onClick handler when clicked', () => {
  let clickHandler = jest.fn()
  render(<Tapable data-testid="click" onClick={clickHandler} />)
  fireEvent.click(screen.getByTestId('click'))
  expect(clickHandler).toHaveBeenCalledTimes(1)
})
