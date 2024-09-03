import GuestLayout from '@/Layouts/GuestLayout'
import { Article, Category, CategoryArticles } from '@/types'
import { Head, Link, usePage } from '@inertiajs/react';
import { Button, Input } from 'antd';
import Search from 'antd/es/input/Search';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function CategoryPage(

    { 
        slug,
        propCategory
       
    }: {
        slug:string,
        propCategory: Category
    }
) 
{
    const [articles, setArtcles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    
    const  user:any = usePage().props;

    const getArticlesByCategory = () => {
        const params = [
            `slug=${slug}`,
            `search=${search}`
        ].join('&')

        axios.get<Article[]>(`/get-articles-by-category?${params}`).then(res=>{
            setArtcles(res.data)
            setLoading(false)
        })
    }

    useEffect(() => {
        getArticlesByCategory()
    }, [])

    const handleSearch = () => {
        setLoading(true)
        getArticlesByCategory()
    }

    const truncate = (text: string, limit: number) => {
		const words = text.split(' ');
		if (words.length > limit) {
			return words.slice(0, limit).join(' ') + '...';
		}
		return text;
	};
    
    return (
        <GuestLayout>
            <Head title="Categories Page" />

            <div className="h-full">

                <div className='mt-8'>


                    <div className='font-bold mb-2'>CATEGORY: {propCategory.category}</div>

                    <div className='flex gap-2 my-4'>
                    

                        <Input placeholder="Search Title" onChange={(e) => setSearch(e.target.value)} />
                        <Button loading={loading} onClick={handleSearch}>Search</Button>
                    </div>
                   

                    {articles ? (

                        <>
                            <div className='flex gap-6 flex-wrap'>
                                {articles.map((article:Article) => {
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
                                                {article?.title}
                                            </div>
                                            <div className='text-justify'>
                                                { truncate(article?.excerpt, 20)}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                        </>
                    ) : (
                        <div>LOADING...</div>
                    )}
                </div>
            </div>
            
        </GuestLayout>


    )
}
