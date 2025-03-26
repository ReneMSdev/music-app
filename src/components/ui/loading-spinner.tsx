'use client'

import { Spinner } from './spinner'

export function LoadingSpinner() {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <Spinner size='xxl' />
    </div>
  )
}
