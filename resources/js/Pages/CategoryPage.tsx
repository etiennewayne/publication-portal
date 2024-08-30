import GuestLayout from '@/Layouts/GuestLayout'
import { Article, CategoryArticles } from '@/types'
import { Link } from '@inertiajs/react';
import React from 'react'

export default function CategoryPage(

    { categoryArticles }: {categoryArticles:CategoryArticles[] }
) 
{

    
    const truncate = (text: string, limit: number) => {
		const words = text.split(' ');
		if (words.length > limit) {
			return words.slice(0, limit).join(' ') + '...';
		}
		return text;
	};
    
    return (
        <GuestLayout>
            <div className="h-full">
                
                {categoryArticles.map((category) => {
                    return(
                        <>
                            <div className='mt-8' key={category.category_id}>

                                <div className='font-bold mb-2'>{category.category}</div>

                                <div className='flex gap-6 flex-wrap'>
                                    {category.articles.map((article:Article) => {
                                        return (
                                            
                                            <div key={article.article_id} className='w-[300px]'>
                                                {article.featured_image ? (
                                                        <Link
                                                            href={`/view/${article.slug}`}>
                                                            <div className="h-[200px] w-[300px] overflow-hidden flex justify-center 
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
                                                <div className='font-bold my-2'>
                                                    {article.title}
                                                </div>
                                                <div className='text-justify'>
                                                    { truncate(article.excerpt, 20)}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </>
                    )
                        
                })}


                
            </div>
            
        </GuestLayout>


    )
}
