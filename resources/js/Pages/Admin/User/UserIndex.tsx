import Authenticated from '@/Layouts/AuthenticatedLayout'
import { PageProps, User } from '@/types'
import { Head } from '@inertiajs/react'

import { FileAddOutlined, LikeOutlined, 
    DeleteOutlined, EditOutlined, 
    QuestionCircleOutlined } from '@ant-design/icons';

import { Card, Space, Table, 
    Pagination, Button, Modal,
    Form, Input, Select, Checkbox,
    notification } from 'antd';


import React, { useEffect, useState } from 'react'
import axios from 'axios';



export default function UserIndex({ auth }: PageProps) {
	
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [open, setOpen] = useState(false); //for modal

	const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

	
	const getData = (): void => {
        setLoading(true)
        const params = [
            `perpage=${perPage}`,
            `page=${page}`
        ].join('&');
        axios.get<User>(`/get-users?${params}`).then(res => {
            setData(res.data.data)
            setLoading(false)

        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(()=>{
        getData()
    },[perPage, search, page])


    const onPageChange = (index, perPage) => {
        setPage(index)
        setPerPage(perPage)
        loadDataAsync;   
    }
	
	return (
		<Authenticated user={auth.user}>
			<Head title="User Management"></Head>

			<div className='flex mt-10 justify-center items-center'>
				<div className='p-6 w-[600px] mx-2 bg-white shadow-sm rounded-md'>
					<div className="font-bold">List of Users</div>
				</div>

				<div>
					<Table dataSource={data}
						loading={loading}
						rowKey={(data) => data.user_id}
						pagination={false}>

						<Column title="Id" dataIndex="user_id"/>
						<Column title="Username" dataIndex="username" key="username"/>
						<Column title="Name" dataIndex="name" key="name"/>
						<Column title="Email" dataIndex="email" key="email"/>
						<Column title="Sex" dataIndex="sex" key="sex"/>
						<Column title="Role" dataIndex="role" key="role"/>
						<Column title="Active" dataIndex="active" key="active" render={(_, active)=>(
							active ? (
								<span className='bg-green-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>YES</span>
							) : (
								<span className='bg-red-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>NO</span>
							)
						)}/>
						<Column title="Action" key="action" 
							render={(_, data) => (
								<Space size="small">
									<Button shape="circle" icon={<EditOutlined/>} onClick={ ()=> handleEditClick(data.user_id) } />
									<Button shape="circle" icon={<LikeOutlined/>} onClick={ ()=> handleActiveClick(data.user_id) } />
									<Button danger shape="circle"
										onClick={()=> (
											Modal.confirm({
												title: 'Delete?',
												icon: <QuestionCircleOutlined />,
												content: 'Are you sure you want to delete this data?',
												okText: 'Yes',
												cancelText: 'No',
												onOk() {
													handleDeleteClick(data.user_id) 
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


		</Authenticated>
	)
}
