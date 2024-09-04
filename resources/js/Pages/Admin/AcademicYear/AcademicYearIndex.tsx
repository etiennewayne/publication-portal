import Authenticated from '@/Layouts/AuthenticatedLayout'
import { AcademicYear, PageProps, User } from '@/types'
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


export default function AcademicYearIndex({auth} : PageProps) {
	
	const [form] = Form.useForm();

    const [data, setData] = useState<AcademicYear[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const [open, setOpen] = useState(false); //for modal


	const [perPage, setPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [errors, setErrors] = useState<any>({});

    const [id, setId] = useState(0);
	
	interface PaginateResponse {
		data: AcademicYear[];
		total: number;
	}

	const getData = async () => {

        setLoading(true)
        const params = [
            `perpage=${perPage}`,
            `search=${search}`,
            `page=${page}`
        ].join('&');

		try{
			const res = await axios.get<PaginateResponse>(`/admin/get-academic-years?${params}`);
			setData(res.data.data)
			setTotal(res.data.total)
			setLoading(false)
		}catch(err){
			console.log(err)
		}
    }

    useEffect(()=>{
        getData()
    },[perPage, page])


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
			const response = await axios.get<AcademicYear>(`/admin/academic-years/${id}`);
			form.setFields([
				{ name: 'academic_year_code', value: response.data.academic_year_code },
				{ name: 'academic_year_description', value: response.data.academic_year_description },
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
		const res = await axios.delete('/admin/academic-years/' + id);
		if(res.data.status === 'deleted'){
			getData()
		}
	}
	

	const onFinish = async (values:User) =>{
		console.log(values)
		if(id > 0){
			try{
				const res = await axios.put('/admin/academic-years/' + id, values)
				if(res.data.status === 'updated'){
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
				const res = await axios.post('/admin/academic-years', values)
				if(res.data.status === 'saved'){
					openNotification('bottomRight', 'Saved!', 'User successfully saved.')
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
					<div className="font-bold mb-4">List of Academic Year</div>
					{/* card body */}
					<div>
						<Table dataSource={data}
							loading={loading}
							rowKey={(data) => data.academic_year_id}
							pagination={false}>

							<Column title="Id" dataIndex="academic_year_id"/>
							<Column title="Code" dataIndex="academic_year_code" key="academic_year_code"/>
							<Column title="Description" dataIndex="academic_year_description" key="academic_year_description"/>
							<Column title="Active" dataIndex="active" key="active" render={(active)=>(
								active ? (
									<span className='bg-green-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>YES</span>
								) : (
									<span className='bg-red-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>NO</span>
								)
							)}/>
							<Column title="Action" key="action" 
								render={(_, data: AcademicYear) => (
									<Space size="small">
										<Button shape="circle" icon={<EditOutlined/>} 
											onClick={ ()=> handleEditClick(data.academic_year_id) } />
										
										<Button danger shape="circle"
											onClick={()=> (
												Modal.confirm({
													title: 'Delete?',
													icon: <QuestionCircleOutlined />,
													content: 'Are you sure you want to delete this data?',
													okText: 'Yes',
													cancelText: 'No',
													onOk() {
														handleDeleteClick(data.academic_year_id) 
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
								type='primary'
								icon={<FileAddOutlined />} 
								onClick={handClickNew}>
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
                title="ACADEMIC YEAR INFORMATION"
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
							academic_year_code: '',
							academic_year_desctiption: '',
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
                    name="academic_year_code"
                    label="Academic Year Code"
                    validateStatus={errors.academic_year_code ? 'error' : ''}
                    help={errors.academic_year_code ? errors.academic_year_code[0] : ''}
                    rules={[
                        {
                            required: true,
                            message: 'Please input academic year code!',
                        },
                    ]}
                >
                    <Input placeholder="Academic Year Code"/>
                </Form.Item>

                <Form.Item
                    name="academic_year_description"
                    label="Academic Year Description"
                    validateStatus={errors.academic_year_description ? 'error' : ''}
                    help={errors.academic_year_description ? errors.academic_year_description[0] : ''}
                    rules={[
                        {
                            required: true,
                            message: 'Please input academic year description!',
                        },
                    ]}
                >
                    <Input placeholder="Academic Year Description"/>
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
