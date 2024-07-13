import Authenticated from '@/Layouts/AuthenticatedLayout'
import React from 'react'

export default function AdminDashboard() {
  return (
    <>
        <Authenticated user={prop.auth.user}>
          <div>AdminDashboard</div>
        </Authenticated>
       
    </>
  )
}
