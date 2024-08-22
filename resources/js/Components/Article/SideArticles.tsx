import { Article } from '@/types';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function SideArticles() {

    const [sideArticles, setSideArticles] = useState<Article[]>([]);

    useEffect(()=>{
        loadSideArticles()
    },[])

    const loadSideArticles = () => {
        axios.get<Article[]>('/load-side-articles').then(res=>{
            setSideArticles(res.data)
        })
        .catch(error => console.error('Error fetching articles:', error));
    }

    const truncate = (text: string, limit: number) => {
		const words = text.split(' ');
		if (words.length > limit) {
			return words.slice(0, limit).join(' ') + '...';
		}
		return text;
	};

    
  return (
    <>
        {sideArticles ? (
            <div>
                { sideArticles.map(article => (
                    <div key={article.article_id} className='mb-4'>
                        <div className="mb-2 font-bold text-lg text-textColorDefault-1">
                            {article.category.category}
                        </div>
                        <div>
                            {/* image container */}
                            <div className="h-[200px] overflow-hidden flex justify-center 
                                items-center rounded-2xl shadow-md flex-col">
                                {article.featured_image ? (
                                    <img
                                    src={`/storage/featured_images/${article?.featured_image}`}
                                        alt="featured image"
                                    />
                                
                                ): (
                                    <img
                                        src='/img/default.jpg'
                                        alt="featured image"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="">
                            {/* title */}
                            <div className='font-bold text-[1.6rem] mt-2'>
                                <Link className="title" href={`/view/${article.slug}`}>
                                    {article.title}
                                </Link>
                            </div>
                            {/* author */}
                            <div className='mb-4'>
                                <small>
                                    By: &nbsp;
                                
                                        {article.author && (
                                            <span>
                                                {article.author?.lname}, &nbsp;
                                                {article.author?.fname}
                                            </span>
                                        )}
                                </small>
                            </div>

                            {/* content */}
                            <div
                                className="text-justify"
                                dangerouslySetInnerHTML={{
                                    __html: article.excerpt ? truncate(article.excerpt, 20) : ''
                                }}>

                            </div>
                        </div>
                    </div>
                    
                ))}
            </div>
                
             
        ) : (
            <div className='flex justify-center items-center'>
                <div className='font-bold text-2xl'>Loading...</div>
            </div>
        )}
        
    </>
  )
}
