import React, { useState } from 'react'
import { Head, router } from '@inertiajs/react'


import { FileAddOutlined, LikeOutlined, 
    DeleteOutlined, EditOutlined, 
	EyeInvisibleOutlined,EyeTwoTone,
    QuestionCircleOutlined } from '@ant-design/icons';

import { Card, Space, Table, 
    Pagination, Button, Modal,
    Form, Input, Select, Checkbox,
    notification } from 'antd';

import { Article, PageProps } from '@/types';

import { NotificationPlacement } from 'antd/es/notification/interface';

import axios from 'axios';
import Authenticated from '@/Layouts/AuthenticatedLayout';
    
export default function ArticleCreateEdit({ id, auth }: {id:number, auth:PageProps}) {

	const [form] = Form.useForm();
	const [errors, setErrors] = useState<any>(false);

    // this for notifcation
	const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement:NotificationPlacement, title:string, msg:string) => {
        api.info({
            message: title,
            description: msg,
            placement,
        });
    };


    const onFinish = async (values: Article) =>{
		console.log(values)
		if(id > 0){
			try{
				const res = await axios.post('/admin/articles-update/' + id, values)
				if(res.data.status === 'saved'){
					openNotification('bottomRight', 'Updated!', 'User successfully update.')
					form.resetFields()
				}
			}catch(err:any){
				if(err.response.status === 422){
	
				}
			}
		}else{
			try{
				const res = await axios.post('/admin/articles', values)
				if(res.data.status === 'saved'){
					openNotification('bottomRight', 'Saved!', 'User successfully save.')
					form.resetFields()
				}
			}catch(err:any){
				if(err.response.status === 422){
	
				}
			}
		}
	}


	return (
		<Authenticated user={auth.user}>

			<div className='flex justify-center mt-6'>

				{/* card */}
				<div className='w-full sm:w-[600px] bg-white p-6'>

					<Form layout='vertical'
						form={form} autoComplete='off'>
						

						<Form.Item
							name="title"
							label="Title"
							validateStatus={errors.title ? 'error' : ''}
							help={errors.title ? errors.title[0] : ''}
							rules={[
								{
									required: true,
									message: 'Please input title',
								}
							]}>

							<Input placeholder="Title"/>

						</Form.Item>

						<Form.Item
							name="article_content"
							label="Content"
							validateStatus={errors.article_content ? 'error' : ''}
							help={errors.article_content ? errors.article_content[0] : ''}
							rules={[
								{
									required: true,
									message: 'Please input content',
								}
							]}>

							<Input.TextArea placeholder="Content"/>

						</Form.Item>

						
						<Form.Item
							name="author"
							label="Author"
							validateStatus={errors.author ? 'error' : ''}
							help={errors.author ? errors.author[0] : ''}
							rules={[
								{
									required: true,
									message: 'Please input content',
								}
							]}>

							<Input placeholder="Author"/>
						</Form.Item>

						<Button htmlType='submit' type='primary'>
							Save Article
						</Button>
					</Form>
				</div>
				{/* end card */}
			</div>
			{/* card container */}



		</Authenticated>
	)
}
