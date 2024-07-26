import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Category, PageProps, User } from '@/types'
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

    const [data, setData] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const [open, setOpen] = useState(false); //for modal
	const [passwordVisible, setPasswordVisible] = React.useState(false);

	const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [errors, setErrors] = useState<any>({});

    const [id, setId] = useState(0);
	
	interface ApiResponse<T> {
		data: T;
	}


	const getData = async () => {
        setLoading(true)
        const params = [
			`search=${search}`,
            `perpage=${perPage}`,
            `page=${page}`
        ].join('&');

		try{
			const res = await axios.get<ApiResponse<Category[]>>(`/admin/get-categories?${params}`);
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
			const response = await axios.get<Category>(`/admin/categories/${id}`);
			form.setFields([
				{ name: 'category', value: response.data.category },
				{ name: 'active', value: response.data.active },
				
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
		const res = await axios.delete('/admin/categories/' +id);
		if(res.data.status === 'deleted'){
			openNotification('bottomRight', 'Deleted!', 'Category successfully deleted.')
			getData()
		}
	}
	

	const onFinish = async (values:Category) =>{
		if(id > 0){
			try{
				const res = await axios.put('/admin/categories/' + id, values)
				if(res.data.status === 'updated'){
					openNotification('bottomRight', 'Updated!', 'Category successfully update.')
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
				const res = await axios.post('/admin/categories', values)
				if(res.data.status === 'saved'){
					openNotification('bottomRight', 'Saved!', 'Category successfully save.')
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
			<Head title="Category Management"></Head>
			{contextHolder}
			<div className='flex mt-10 justify-center items-center'>
				{/* card */}
				<div className='p-6 w-full overflow-auto mx-2 bg-white shadow-sm rounded-md
					sm:w-[740px]'>
					{/* card header */}
					<div className="font-bold mb-4">List of Category</div>
					{/* card body */}
					<div>
						<Table dataSource={data}
							loading={loading}
							rowKey={(data) => data.category_id}
							pagination={false}>

							<Column title="Id" dataIndex="category_id"/>
							<Column title="Category" dataIndex="category" key="category"/>
							<Column title="Active" dataIndex="active" key="active" render={(active:boolean)=>(
								active ? (
									<span className='bg-green-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>YES</span>
								) : (
									<span className='bg-red-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>NO</span>
								)
							)}/>
							<Column title="Action" key="action" 
								render={(_, data:Category) => (
									<Space size="small">
										<Button shape="circle" icon={<EditOutlined/>} onClick={ ()=> handleEditClick(data.category_id) } />
										
										<Button danger shape="circle"
											onClick={()=> (
												Modal.confirm({
													title: 'Delete?',
													icon: <QuestionCircleOutlined />,
													content: 'Are you sure you want to delete this data?',
													okText: 'Yes',
													cancelText: 'No',
													onOk() {
														handleDeleteClick(data.category_id) 
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
                title="CATEGORY INFORMATION"
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
							category: '',
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
                    name="category"
                    label="Category"
                    validateStatus={errors.category ? 'error' : ''}
                    help={errors.category ? errors.category[0] : ''}
                    rules={[
                        {
                            required: true,
                            message: 'Please input category!',
                        },
                    ]}
                >
                    <Input placeholder="Category"/>
                </Form.Item>

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
