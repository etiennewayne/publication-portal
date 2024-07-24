import Authenticated from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import React from 'react'

export default function ArticleIndex( {auth}: PageProps) {
  return (
    <Authenticated user={auth.user}>
        <div className='flex mt-10 justify-center items-center'>
            <div className='p-6 w-[600px] mx-2 bg-white shadow-sm rounded-md'>
                <div className="font-bold">List of Articles</div>
            </div>

            <div>
                
            </div>
        </div>
       

    </Authenticated>
  )
}
