import React from 'react'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import SimpleBar from 'simplebar-react'
// import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
const AppSidebar = () => {
  
  return (
    <CSidebar
      position="fixed"
    >
      <CSidebarBrand className="d-none d-md-flex" >
        <CIcon className="sidebar-brand-full"  height={35} />
        <CIcon className="sidebar-brand-narrow"  height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <p>This is a Dashboard</p>
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
