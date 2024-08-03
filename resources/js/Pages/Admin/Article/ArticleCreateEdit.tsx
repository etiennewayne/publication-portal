import React, { useEffect, useState } from 'react'
import { Head, router } from '@inertiajs/react'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
	ClassicEditor,
	Autoformat,
	Bold,
	Italic,
	Underline,
	BlockQuote,
	Base64UploadAdapter,
	CKFinder,
	CKFinderUploadAdapter,
	CloudServices,
	CKBox,
	Essentials,
	Heading,
	Image,
	ImageCaption,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	PictureEditing,
	Indent,
	IndentBlock,
	Link,
	List,
	MediaEmbed,
	Mention,
	Paragraph,
	PasteFromOffice,
	Table,
	TableColumnResize,
	TableToolbar,
	TextTransformation,
    Undo

} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

import { FileAddOutlined, LikeOutlined, 
    DeleteOutlined, EditOutlined, 
	EyeInvisibleOutlined,EyeTwoTone,
    QuestionCircleOutlined } from '@ant-design/icons';

import { Card, Space, 
    Pagination, Button, Modal,
    Form, Input, Select, Checkbox,
    notification } from 'antd';

import { Article, Category, PageProps } from '@/types';

import { NotificationPlacement } from 'antd/es/notification/interface';

import axios from 'axios';
import Authenticated from '@/Layouts/AuthenticatedLayout';
    
export default function ArticleCreateEdit({ id, auth }: {id:number, auth:PageProps}) {

	const [form] = Form.useForm();
	const [errors, setErrors] = useState<any>(false);
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(()=>{
		//load categories upon mounting the component
		loadCategories()

	},[])

    // this for notifcation
	const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement:NotificationPlacement, title:string, msg:string) => {
        api.info({
            message: title,
            description: msg,
            placement,
        });
    };


    const submit = async (values:any) =>{
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

	// Load Categories
	const loadCategories = async ()  =>{
		setLoading(true)
		try{
			const res = await axios.get<Category[]>('/load-categories')
			setCategories(res.data);
			setLoading(false)
		}catch(err:any){
			setLoading(false)
			throw err
		}
	}


	return (
		<Authenticated user={auth.user}>

			<div className='flex justify-center mt-6'>

				{/* card */}
				<div className='w-full sm:w-[990px] bg-white p-6'>

					<Form layout='vertical'
						form={form} autoComplete='off'
						onFinish={submit}
						initialValues={{
							title: '',
							author: '',
							content: '',
                        }}>
						

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
							name="author"
							label="Author"
							validateStatus={errors.author ? 'error' : ''}
							help={errors.author ? errors.author[0] : ''}
							rules={[
								{
									required: true,
									message: 'Please input author',
								}
							]}>

							<Input placeholder="Author"/>
						</Form.Item>

						<Form.Item
							name="category"
							label="Select Category"
							validateStatus={errors.category ? 'error' : ''}
							help={errors.category ? errors.category[0] : ''}
							rules={[
								{
									required: true,
									message: 'Please select category'
								}
							]}>

							<Select>

								{
									categories?.map(cat => (
										<Select.Option key={cat.category_id} value={cat.category}>
											{cat.category}
										</Select.Option>
									))
								}
							</Select>
							

						</Form.Item>

						{/* EDITOR CK WYSIWYG */}
						<Form.Item
							label="Content"
							name="content"
							validateStatus={errors.content ? 'error' : ''}
							help={errors.content ? errors.content[0] : ''}
							rules={[{ required: true, message: 'Please input the content!' }]}>

							<CKEditor
								editor={ ClassicEditor }
								onChange={(event, editor) => {
									const data = editor.getData();
									//setEditorData(data);
									form.setFieldsValue({ content: data });
								}}
								config={ {
									toolbar: {
										items: [ 
											'undo',
											'redo',
											'|',
											'heading',
											'|',
											'bold',
											'italic',
											'underline',
											'|',
											'link',
											'uploadImage',
											'resizeImage',
											'ckbox',
											'blockQuote',
											'mediaEmbed',
											'|',
											'bulletedList',
											'numberedList',
											'|',
											'outdent',
											'indent',
										],
									},

									heading: {
										options: [
											{
												model: 'paragraph',
												title: 'Paragraph',
												class: 'ck-heading_paragraph',
											},
											{
												model: 'heading1',
												view: 'h1',
												title: 'Heading 1',
												class: 'ck-heading_heading1',
											},
											{
												model: 'heading2',
												view: 'h2',
												title: 'Heading 2',
												class: 'ck-heading_heading2',
											},
											{
												model: 'heading3',
												view: 'h3',
												title: 'Heading 3',
												class: 'ck-heading_heading3',
											},
											{
												model: 'heading4',
												view: 'h4',
												title: 'Heading 4',
												class: 'ck-heading_heading4',
											},
										],
									},

									image: {
										resizeOptions: [
											{
												name: 'resizeImage:original',
												label: 'Default image width',
												value: null,
											},
											{
												name: 'resizeImage:50',
												label: '50% page width',
												value: '50',
											},
											{
												name: 'resizeImage:75',
												label: '75% page width',
												value: '75',
											},
										],
										toolbar: [
											'imageTextAlternative',
											'toggleImageCaption',
											'|',
											'imageStyle:inline',
											'imageStyle:wrapText',
											'imageStyle:breakText',
											'|',
											'resizeImage',
										],
									},

									link: {
										addTargetToExternalLinks: true,
										defaultProtocol: 'https://',
									},
									table: {
										contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
									},
								
									plugins: [
										Autoformat,
										BlockQuote,
										Bold,
										CKFinder,
										CKFinderUploadAdapter,
										CloudServices,
										Essentials,
										Heading,
										Image,
										ImageCaption,
										ImageResize,
										ImageStyle,
										ImageToolbar,
										ImageUpload,
										Base64UploadAdapter,
										Indent,
										IndentBlock,
										Italic,
										Link,
										List,
										MediaEmbed,
										Mention,
										Paragraph,
										PasteFromOffice,
										PictureEditing,
										Table,
										TableColumnResize,
										TableToolbar,
										TextTransformation,
										Underline,
									],
									//licenseKey: '<YOUR_LICENSE_KEY>',
									// mention: { 
									//     // Mention configuration
									// },
									initialData: '',
								} }
							/>
						</Form.Item>

						<Button htmlType='submit' className='mt-4' type='primary'>
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
