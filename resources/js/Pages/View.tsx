import GuestLayout from '@/Layouts/GuestLayout'
import { Article, PageProps } from '@/types'

import React from 'react'

export default function View(
    content: Article,
) {
  return (

    <GuestLayout>
        <div className='mt-6'>
            Title {content.title}
        </div>

    </GuestLayout>
   
  )
}
