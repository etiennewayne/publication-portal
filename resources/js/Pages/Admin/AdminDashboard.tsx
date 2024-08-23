import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import React from 'react'

export default function AdminDashboard({ auth }: PageProps) {
    return (
        <>
            <AuthenticatedLayout user={auth.user}>

                <div className='m-10'>
                    <div className='bg-white p-5 border rounded-md'>
                        Admin Dashboard
                    </div>
                </div>

            </AuthenticatedLayout>

        </>
    )
}
