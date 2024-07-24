import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import React from 'react'

export default function AdminDashboard({ auth }: PageProps) {
  return (
    <>
        <AuthenticatedLayout user={auth.user}>

            <div>Admin Dashboard</div>

        </AuthenticatedLayout>

    </>
  )
}
