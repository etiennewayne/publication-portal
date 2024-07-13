import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

function AdminDashboard() {
  return (
    <>
        <AuthenticatedLayout>
            <div>
                ADMIN DASHBOARD
            </div>
        </AuthenticatedLayout>
    </>
  )
}

export default AdminDashboard