import { ArticleComment } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { Button, Input } from 'antd'
import axios from 'axios';
import React, { FormEventHandler, useEffect, useState } from 'react'

export default function Comment( {articleId} : {articleId:number} ) {
    
    const  user:any = usePage().props;

    const  { data, setData, errors, reset } = useForm({
        article_id: articleId,
        user_id: 0,
        comment: ''
    });

    const [comments, setComments] = useState<ArticleComment[]>();

    const  [loading, setLoading]= useState<boolean>(false);


    const loadComments = () => {
        axios.get('/get-comment-by-article/' + articleId).then(res=>{
            setComments(res.data);
        })
    }

    useEffect(()=>{
        loadComments()
    }, [])

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true)
        axios.post(route('comment.store'), data).then(res=>{
            console.log(data)
            if(res.data.status === 'saved'){
                reset()
                loadComments()
                setLoading(false)
            }
        }).catch(err=>{
            setLoading(false)
        })
    };
    
    return (
        <>
            <div className='my-5'>
                {comments && (
                    <div className="font-bold">COMMENTS: </div>
                )}

                {comments?.map((comment: ArticleComment)=>{
                    return (
                        <div className='my-5 flex gap-3' key={comment.comment_id}>
                            <div>
                                <img src="/img/user.png" alt="avatar" width={30}/>
                            </div>
                            <div className='flex-1 flex flex-col'>
                                <div className='font-bold text-[.7rem] text-green-950'>{comment.user.lname},  {comment.user.fname}</div>
                                <div>{comment.comment}</div>
                            </div>
                        </div>
                    )
                })}
               

               {user.auth.user && (
                    <>
                        <hr />

                        <form onSubmit={submit}>
                            <div className='my-5 flex gap-3'>
                                <div>
                                    <img src="/img/user.png" alt="avatar" width={30}/>
                                </div>
                                <div className='flex-1 flex flex-col gap-2'>
                                    <Input.TextArea
                                        placeholder="Add a comment..."
                                        required
                                        onChange={(e) => setData('comment', e.target.value)} />
                                    <Button htmlType='submit' loading={loading} className='ml-auto'>Comment</Button>
                                </div>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </>
    )
}
