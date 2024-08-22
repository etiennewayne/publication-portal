import { Article } from '@/types';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function LatestArticle() {

    const [latestArticles, setLatestArticles] = useState<Article[]>([]);

    useEffect(()=>{
        loadArticles()
    },[])

    const loadArticles = () => {
        axios.get<Article[]>('/load-latest-articles').then(res=>{
            setLatestArticles(res.data)
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
        {latestArticles ? (
            <div>
                <div className='font-bold text-green-950 mb-6'>
                    THE LATEST
                </div>

                <div  className='flex flex-wrap mb-6 gap-8'>

                    { latestArticles.map(article => (
                        <div className="flex gap-4 w-[580px]" key={article.article_id}>
                        
                            {article.featured_image ? (
                                <Link
                                    href={`/view/${article.slug}`}>
                                    <div className="h-[200px] w-[200px] overflow-hidden flex justify-center 
                                        items-center rounded-2xl shadow-md flex-col"
                                        style={{
                                            background: `url(/storage/featured_images/${article?.featured_image.trim()}) no-repeat`,
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover'
                                        }}></div>
                                </Link>
                            
                            ): (
                                <div className="h-[200px] overflow-hidden flex justify-center 
                                    items-center rounded-2xl shadow-md flex-col"
                                    style={{
                                        background: `url('/img/default.jpg') no-repeat`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover'
                                    }}></div>

                            )}
                            
                            <div className="">
                                {/* title */}
                                <div className='font-bold text-[1.2rem]'>
                                    <Link className="" href={`/view/${article.slug}`}>
                                        {article.title}
                                    </Link>
                                </div>
                                {/* author */}
                                <div className=''>
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

                                <div className='mb-4'>
                                    <small>
                                        DATE PUBLISHED: &nbsp;
                                    
                                            {article.date_published && (
                                                <span>
                                                    {article.date_published}
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
                </div> {/* container of the loop */}

            </div>
                
             
        ) : (
            <div className='flex justify-center items-center'>
                <div className='font-bold text-2xl'>Loading...</div>
            </div>
        )}
        
    </>
  )
}
