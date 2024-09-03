import TextInput from '@/Components/TextInput'
import Comment from '@/Components/View/Comment'
import GuestLayout from '@/Layouts/GuestLayout'
import { Article, Category, PageProps } from '@/types'
import { Head, usePage } from '@inertiajs/react'
import { Button, Input } from 'antd'
import axios from 'axios'
import moment from 'moment'

import React, { useEffect, useState } from 'react'

export default function View(
    
    { article } : { article: Article }
    
) {
    const  user:any = usePage().props;

    const  [comment, setComment]= useState<string>('');
    const datePublished = new Date(article.date_published);

    useEffect(() => {

        if(article){
            handleCountView()
        }

    },[])


    const handleCountView = async () => {
        try {
            const res = await axios.post('/count-view/' + article.article_id)

        }catch(err){

        }
    }

  return (

    <GuestLayout>

        <Head title="View Article" />

        <div className='my-6 mx-4 '>

            {/* image */}
            <div className='mb-10'>
                <img className='mx-auto rounded-2xl' src={`/storage/featured_images/${article?.featured_image}`} />
                <div className='text-center'>{article.featured_image_caption}</div>
            </div>

            {/* category */}
            <div className='font-bold text-green-950 text-xl'>{article.category.category}</div>

            {/* title */}
            <div className='font-bold text-[2.4rem] mb-6'>
                {article.title}
            </div>

            {/* horizontal line */}
            <div className='bg-green-950 h-[1px]'></div>

            {/* excerpt */}
            <div className='font-bold text-[1.5rem] my-6'>
                {article?.excerpt}
            </div>

            {/* horizontal line */}
            <div className='bg-green-950 h-[1px]'></div>
            
            {/* extra details */}
            <div className='mt-2'>
                <div>Date Published: { article.date_published }</div>
                <div>Author: {article.author.lname}, {article.author.fname}</div>
                <div>Views: {article.views}</div>
            </div>

            {/* content */}
            <div
                className="text-justify text-xl mt-6 prose !max-w-none"
                dangerouslySetInnerHTML={{
                    __html: article.article_content
                }}>
            </div>
            
            <Comment articleId={article.article_id} />
   

        </div>

    </GuestLayout>
   
  )
}
