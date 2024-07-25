import Authenticated from '@/Layouts/AuthenticatedLayout'
import { PageProps, User } from '@/types'
import { Head } from '@inertiajs/react'

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


    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const [open, setOpen] = useState(false); //for modal
	const [passwordVisible, setPasswordVisible] = React.useState(false);

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
			const res = await axios.get<User[]>(`/admin/get-users?${params}`);
			setData(res.data.data)
			setLoading(false)
		}catch(err){
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
			const response = await axios.get<User>(`/admin/users/${id}`);
			form.setFields([
				{ name: 'username', value: response.data.username },
				{ name: 'name', value: response.data.name },
				{ name: 'email', value: response.data.email },
				{ name: 'sex', value: response.data.sex },
				{ name: 'role', value: response.data.role },
				{ name: 'active', value: response.data.active }
			]);
		}catch(err){
            console.log(err);
		}
    }


	const handClickNew = () => {
        //router.visit('/');
		setId(0)
        setOpen(true)
    }

	const handleEditClick = (id:number) => {
		setId(id);
        setOpen(true);
        getUser(id);
	}

	const handleDeleteClick = async (id:number) => {
		const res = await axios.delete('/admin/users/{id}');
		if(res.data.status === 'deleted'){
			getData()
		}
	}
	

	const onFinish = async (values:User) =>{
		console.log(values)
		if(id > 0){
			try{
				const res = await axios.put('/admin/users/' + id, values)
				if(res.data.status === 'saved'){
					openNotification('bottomRight', 'Updated!', 'User successfully update.')
					form.resetFields()
					setOpen(false)
					getData()
				}
			}catch(err:any){
				if(err.response.status === 422){
	
				}
			}
		}else{
			try{
				const res = await axios.post('/admin/users', values)
				if(res.data.status === 'saved'){
					openNotification('bottomRight', 'Saved!', 'User successfully save.')
					form.resetFields()
					setOpen(false)
					getData()
				}
			}catch(err:any){
				if(err.response.status === 422){
	
				}
			}
		}
		

		//throw new Error('Function not implemented.');
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
					<div className="font-bold mb-4">List of Users</div>
					{/* card body */}
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
								render={(_, data:User) => (
									<Space size="small">
										<Button shape="circle" icon={<EditOutlined/>} onClick={ ()=> handleEditClick(data.user_id) } />
										
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
				{/* card */}

			</div>


			{/* Modal */}
			<Modal
                open={open}
                title="USER INFORMATION"
                okText="Save"
                cancelText="Cancel"
                okButtonProps={{
                    autoFocus: true,
                    htmlType: 'submit',
                }}
                onCancel={() => setOpen(false)}
                destroyOnClose
                modalRender={(dom) => (
                    <Form
                        layout="vertical"
                        form={form}
                        name="form_in_modal"
						autoComplete='off'
                        initialValues={{
							username: '',
							password: '',
							email: '',
							name: '',
                            sex: 'MALE',
                            role: 'USER',
                            active: true,
                        }}
                        clearOnDestroy
                        onFinish={(values) => onFinish(values)}
                    >
                        {dom}
                    </Form>
                )}
            >
                <Form.Item
                    name="username"
                    label="Username"
                    validateStatus={errors.username ? 'error' : ''}
                    help={errors.username ? errors.username[0] : ''}
                    rules={[
                        {
                            required: true,
                            message: 'Please input username!',
                        },
                    ]}
                >
                    <Input placeholder="Username"/>
                </Form.Item>

				{id < 1 ? (
					<>
					<Form.Item
						name="password"
						label="Password"
						validateStatus={errors.password ? 'error' : ''}
						
						help={errors.password ? errors.password[0] : ''}
						rules={[
							{
								required: true,
								message: 'Please input Password!',
							},
						]}
					>
						<Input.Password iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} 
							placeholder="Re-type Password"/>
					</Form.Item>

					<Form.Item
						name="password_confirmation"
						label="Re-type Password"
						validateStatus={errors.password_confirmation ? 'error' : ''}
						help={errors.password_confirmation ? errors.password_confirmation[0] : ''}
						rules={[
							{
								required: true,
								message: 'Please input Re-type Password!',
							},
						]}
					>
						<Input.Password iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} 
							placeholder="Re-type Password"/>
					</Form.Item></>

				) : ''}

                

                <Form.Item
                    name="name"
                    label="Name"
                    validateStatus={errors.name ? 'error' : ''}
                    help={errors.name ? errors.name[0] : ''}
                    rules={[
                        {
                            required: true,
                            message: 'Please input name!',
                        },
                    ]}
                >
                    <Input placeholder="Name"/>
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    validateStatus={errors.email ? 'error' : ''}
                    help={errors.email ? errors.email[0] : ''}
                    rules={[
                        {
                            required: true,
                            message: 'Please input email!',
                        },
                    ]}
                >
                    <Input placeholder="Email"/>
                </Form.Item>

                
                <div className='flex gap-4'>
                    <Form.Item
                        name="sex"
                        label="Sex"
                        className='w-full'
                        validateStatus={errors.sex ? 'error' : ''}
                        help={errors.sex ? errors.sex[0] : ''}
                        rules={[
                            {
                                required: true,
                                message: 'Please select sex!',
                            },
                        ]}
                    >
                        <Select
                            options={[
                                { value: 'MALE', label: 'MALE' },
                                { value: 'FEMALE', label: 'FEMALE' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        name="role"
                        label="Role"
                        className='w-full'
                        validateStatus={errors.role ? 'error' : ''}
                        help={errors.role ? errors.role[0] : ''}
                        rules={[
                            {
                                required: true,
                                message: 'Please select role!',
                            },
                        ]}
                    >
                        <Select
                            options={[
                                { value: 'USER', label: 'USER' },
                                { value: 'STAFF', label: 'STAFF' },
                                { value: 'ADMINISTRATOR', label: 'ADMINISTRATOR' },
                            ]}
                        />
                    </Form.Item>
                </div>

                <Form.Item
                    name="active"
                    valuePropName="checked"
                >
                    <Checkbox>Active</Checkbox>
                </Form.Item>
                
            </Modal>



		</Authenticated>
	)
}
