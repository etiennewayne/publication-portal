import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Article, PageProps } from '@/types'
import { Head, router } from '@inertiajs/react'

import { FileAddOutlined, LikeOutlined, 
    DeleteOutlined, EditOutlined, 
	EyeInvisibleOutlined,EyeTwoTone,
    QuestionCircleOutlined } from '@ant-design/icons';

import { Card, Space, Table, 
    Pagination, Button, Modal,
    Form, Input, Select, Checkbox,
    notification } from 'antd';


import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { NotificationPlacement } from 'antd/es/notification/interface';

const { Column } = Table;


export default function UserIndex({ auth }: PageProps) {
	
	const [form] = Form.useForm();

    const [data, setData] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

	const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [errors, setErrors] = useState<any>({});

    const [id, setId] = useState(0);
	
	const getData = async () => {

        setLoading(true)
        const params = [
            `perpage=${perPage}`,
            `page=${page}`
        ].join('&');

		try{
			const res = await axios.get<{ data: Article[] }>(`/admin/get-articles?${params}`);
			setData(res.data.data)
			setLoading(false)
		}catch(err){
			setLoading(false)
			console.log(err)
		}
    }

    useEffect(()=>{
        getData()
    },[perPage, search, page])


    const onPageChange = (index:number, perPage:number) => {
        setPage(index)
        setPerPage(perPage)
    }


	// this for notifcation
	const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement:NotificationPlacement, title:string, msg:string) => {
        api.info({
            message: title,
            description: msg,
            placement,
        });
    };


	const getUser = async (id:number) => {
		try{
			const response = await axios.get<Article>(`/admin/articles/${id}`);
			form.setFields([
				{ name: 'title', value: response.data.title },
				{ name: 'article_content', value: response.data.article_content },
				{ name: 'author', value: response.data.author },
				{ name: 'encoded_by', value: response.data.encoded_by },
				{ name: 'modified_by', value: response.data.modified_by },
				{ name: 'date_published', value: response.data.date_published },
				{ name: 'is_published', value: response.data.is_published },
				{ name: 'views', value: response.data.views }
			]);
		}catch(err){
            console.log(err);
		}
    }


	const handClickNew = () => {
		router.visit('/admin/articles/create');
    }
	const handleEditClick = (id:number) => {
		router.visit('/admin/articles/' + id + '/edit');
	}
	const handleDeleteClick = async (id:number) => {
		const res = await axios.delete('/admin/articles/' + id);
		if(res.data.status === 'deleted'){
			getData()
		}
	}
	

	

	return (
		<Authenticated user={auth.user}>
			<Head title="User Management"></Head>

			{contextHolder}
			
			<div className='flex mt-10 justify-center items-center'>
				{/* card */}
				<div className='p-6 w-full overflow-auto mx-2 bg-white shadow-sm rounded-md
					sm:w-[740px]
					md:w-[990px]'>
					{/* card header */}
					<div className="font-bold mb-4">List of Articles</div>
					{/* card body */}
					<div>
						<Table dataSource={data}
							loading={loading}
							rowKey={(data) => data.article_id}
							pagination={false}>

							<Column title="Id" dataIndex="article_id"/>
							<Column title="Title" dataIndex="title" key="title"/>
							<Column title="Name" dataIndex="article_content" key="article_content"/>
							<Column title="Author" dataIndex="author" key="author"/>
						
							<Column title="Active" dataIndex="active" key="active" render={(_, active)=>(
								active ? (
									<span className='bg-green-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>YES</span>
								) : (
									<span className='bg-red-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>NO</span>
								)
							)}/>
							<Column title="Action" key="action" 
								render={(_, data: Article) => (
									<Space size="small">
										<Button shape="circle" icon={<EditOutlined/>} onClick={ ()=> handleEditClick(data.article_id) } />
										
										<Button danger shape="circle"
											onClick={()=> (
												Modal.confirm({
													title: 'Delete?',
													icon: <QuestionCircleOutlined />,
													content: 'Are you sure you want to delete this data?',
													okText: 'Yes',
													cancelText: 'No',
													onOk() {
														handleDeleteClick(data.article_id) 
													}
												})
											)}
											icon={<DeleteOutlined/>} />
									</Space>
								)}
							/>
						</Table>

						<Pagination className='mt-4' 
							onChange={onPageChange}
							defaultCurrent={1} 
							total={total} />

						<div className='flex flex-end mt-2'>
							<Button className='ml-auto' 
								shape="round" icon={<FileAddOutlined />} 
								type="primary" onClick={handClickNew}>
								New
							</Button>     
						</div>
					</div>
				</div>
				{/* card */}
			</div>

		</Authenticated>
	)
}
