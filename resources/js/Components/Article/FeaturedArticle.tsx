import { Article } from '@/types';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function FeaturedArticle() {

    const [featuredArticle, setFeaturedArtcle] = useState<Article>();

    useEffect(()=>{
        loadFeatureArticle()
    },[])

    const loadFeatureArticle = () => {
        axios.get<Article>('/load-featured-article').then(res=>{
            setFeaturedArtcle(res.data)
        })
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
        {featuredArticle ? (
            <div className="">

                {/* image and caption container */}
                <div className="">

                    {/* image container */}
                
                        {featuredArticle.featured_image ? (
                          <Link
                            href={`/view/${featuredArticle.slug}`}>
                                <div className="h-[500px] overflow-hidden flex justify-center 
                                    items-center rounded-2xl shadow-md flex-col"
                                    style={{
                                        background: `url(/storage/featured_images/${featuredArticle?.featured_image.trim()}) no-repeat`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover'
                                    }}
                                ></div>

                            </Link>
                          
                        ): (
                            <div className="h-[500px] overflow-hidden flex justify-center 
                            items-center rounded-2xl shadow-md flex-col"
                            style={{
                                background: `url(/img/default.jpg) no-repeat`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover'
                            }}></div>
                        )}
                </div>

                <div className='my-2'>
                    {featuredArticle?.featured_image_caption}
                </div>
                
                {/* Article Content (title, article) */}
                <div className="mt-4">
                    {/* title */}
                    <div className='font-bold text-[2rem]'>
                        <Link className="title" href={`/view/${featuredArticle?.slug}`}>
                            {featuredArticle.title}
                        </Link>
                    </div>
                    {/* author */}
                    <div className=''>
                        <small>
                            By: &nbsp;
                        
                                {featuredArticle.author && (
                                    <span>
                                        {featuredArticle.author?.lname}, &nbsp;
                                        {featuredArticle.author?.fname}
                                    </span>
                                )}
                        </small>
                    </div>
                    <div className='mb-4'>
                        <small>
                            DATE PUBLISHED: &nbsp;
                                {featuredArticle.date_published && (
                                    <span>
                                        {featuredArticle.date_published}
                                    </span>
                                )}
                        </small>
                    </div>

                    {/* content */}
                    <div
                        className="text-justify prose !max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: featuredArticle.excerpt ? truncate(featuredArticle.excerpt, 40) : ''
                        }}
                    ></div>
                        
                    
                </div>
            </div>
        ) : (
            <div className='flex justify-center items-center'>
                <div className='font-bold text-2xl'>Loading...</div>
            </div>
        )}
        
    </>
  )
}
