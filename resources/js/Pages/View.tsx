import GuestLayout from '@/Layouts/GuestLayout'
import { Article, PageProps } from '@/types'
import { Head } from '@inertiajs/react'

import React from 'react'

export default function View(
    
    { article } : { article: Article }
    
) {
  return (

    <GuestLayout>

        <Head title="View Article" />

        <div className='my-6'>

            <div className='mb-10'>
                <img className='mx-auto rounded-2xl' src={`/storage/featured_images/${article?.featured_image}`} />
                <div className='text-center'>{article.featured_image_caption}</div>
            </div>

            <div className='font-bold text-[2.5rem]'>
                {article.title}
            </div>
            <hr />

            <div className='font-bold text-[1.5rem]'>
                {article.excerpt}
            </div>

            <div
                className="text-justify mt-6 prose !max-w-none"
                dangerouslySetInnerHTML={{
                    __html: article.article_content
                }}
            ></div>
            
        </div>

    </GuestLayout>
   
  )
}
