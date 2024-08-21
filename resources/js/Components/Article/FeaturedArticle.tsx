import { Article } from '@/types';
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
                    <div className="h-[500px] overflow-hidden flex justify-center 
                        items-center rounded-2xl shadow-md flex-col">
                        {featuredArticle.featured_image != "" ? (
                            <img
                                src={`/storage/featured_images/${featuredArticle?.featured_image}`}
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

                <div className='my-2'>
                    {featuredArticle?.featured_image_caption}
                </div>
                
                {/* Article Content (title, article) */}
                <div className="mt-4">
                    {/* title */}
                    <div className='font-bold text-[2rem]'>
                        <a className="title" href={`/view/${featuredArticle?.slug}`}>
                            {featuredArticle.title}
                        </a>
                    </div>
                    {/* author */}
                    <div className='mb-4'>
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

                    {/* content */}
                    <div
                        className="text-justify"
                        dangerouslySetInnerHTML={{
                            __html: truncate(featuredArticle.article_content, 50)
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
