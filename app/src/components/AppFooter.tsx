import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <p>This is a footer</p>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)