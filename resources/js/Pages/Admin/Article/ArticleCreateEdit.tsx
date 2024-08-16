import React, { useEffect, useState } from 'react'
import { Head, router, usePage } from '@inertiajs/react'

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

import { 
	UploadOutlined, SaveOutlined
} from '@ant-design/icons';

import {
	Button, Modal,
    Form, Input, Select, Checkbox,
	UploadProps,
    notification, 
	message,
	Upload,
	DatePicker,
	Flex} from 'antd';

import { Article, Category, PageProps, Status } from '@/types';

import { NotificationPlacement } from 'antd/es/notification/interface';

import axios from 'axios';
import Authenticated from '@/Layouts/AuthenticatedLayout';


export default function ArticleCreateEdit({ id, auth, statuses }: {id:number, auth:PageProps, statuses: Status[]}) {

	const { props } = usePage<PageProps>();
	const csrfToken: string = props.auth.csrf_token ?? ''; // Ensure csrfToken is a string
  
	console.log('id', id)
	
	const [form] = Form.useForm();

	const [errors, setErrors] = useState<any>(false);
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState<boolean>(false);


	useEffect(()=>{
		loadCategories()
	},[])

	
	const uploadProps: UploadProps = {
		name: 'featured_image',
		action: '/temp-upload',
		listType: 'picture',
		headers: {
			'X-CSRF-Token':  csrfToken,
		},
		beforeUpload: (file) => {
			const isPNG = file.type === 'image/png';
			const isJPG = file.type === 'image/jpeg';

			if (!isPNG && !isJPG) {
			  message.error(`${file.name} is not a png/jpg file`);
			}
			return isPNG || isJPG || Upload.LIST_IGNORE;
		},
		onChange(info) {
			// if (info.file.status !== 'uploading') {
			// 	console.log(info.file, info.fileList);
			// }
			if (info.file.status === 'done') {
				message.success(`${info.file.name} file uploaded successfully`);
				form.setFieldValue('featured_image', info.file.response)
				console.log('set fields ', form)
			} else if (info.file.status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		onRemove(info){
			console.log('filename', info.response);
			axios.post('/temp-remove/' + info.response).then(res=>{
				if(res.data.status === 'temp_deleted'){
					message.success('File removed.');
				}
			})
		}
	};


    // this for notifcation
	const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement:NotificationPlacement, title:string, msg:string) => {
        api.info({
            message: title,
            description: msg,
            placement,
        });
    };


    const submit = async (values:object) =>{
		// setLoading(true)
		//console.log(values)
		setErrors({})

		if(id > 0){
			try{
				const res = await axios.patch('/admin/articles/' + id, values)
				if(res.data.status === 'updated'){
					openNotification('bottomRight', 'Updated!', 'Article successfully update.')
					form.resetFields()
					setLoading(false)

				}
			}catch(err:any){
				if(err.response.status === 422){
					setErrors(err.response.data.errors)
					
				}
				setLoading(false)
			}
		}else{
			try{
				const res = await axios.post('/admin/articles', values)
				if(res.data.status === 'saved'){
					openNotification('bottomRight', 'Saved!', 'Article successfully save.')
					form.resetFields()
					setLoading(false)
				}
			}catch(err:any){
				if(err.response.status === 422){
					setErrors(err.response.data.errors)
				}
				setLoading(false)
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


	const onChangePublishDate = () => {
		console.log('change date');
		
	}

	return (
		<Authenticated user={auth.user}>

			<Head title="Article" />
			{contextHolder}

			<div className='flex justify-center mt-6'>

				{/* card */}
				<div className='w-full sm:w-[990px] bg-white p-6 mx-2'>

					<Form layout='vertical'
						form={form} 
						autoComplete='off'
						onFinish={submit}
						initialValues={{
							title: '',
							author: '',
							article_content: '',
							featured_image: '',
							featured_image_caption: '',
							category: null,
							date_published: null,
							is_featured: false,
							is_published: false,
							upload: null
                        }}>
						
						<Form.Item
							name="title"
							label="Title"
							validateStatus={errors.title ? 'error' : ''}
							help={errors.title ? errors.title[0] : ''}>
							<Input placeholder="Title"/>
						</Form.Item>

						<div className="flex gap-2">
							<Form.Item
								name="author"
								className='w-full'
								label="Author"
								validateStatus={errors.author ? 'error' : ''}
								help={errors.author ? errors.author[0] : ''}>
								<Input placeholder="Author"/>
							</Form.Item>

							<Form.Item
								name="category"
								className='w-full'
								label="Select Category"
								validateStatus={errors.category ? 'error' : ''}
								help={errors.category ? errors.category[0] : ''}>
								<Select>
									{
										categories?.map(cat => (
											<Select.Option key={cat.category_id} value={cat.category_id}>
												{cat.category}
											</Select.Option>
										))
									}
								</Select>
							</Form.Item>
						</div>

						<Form.Item
							name="upload"
							valuePropName="fileList"
							className='w-full'
							label="Select Featured Image"
							getValueFromEvent={(e) => {
								// Normalize the value to fit what the Upload component expects
								if (Array.isArray(e)) {
								return e;
								}
								return e?.fileList;
							}}
							validateStatus={errors.upload ? 'error' : ''}
							help={errors.upload ? errors.upload[0] : ''}>
								<Upload maxCount={1} {...uploadProps}>
									<Button icon={<UploadOutlined />}>Click to Upload</Button>
								</Upload>
						</Form.Item>

						<Form.Item
							name="featured_image_caption"
							className='w-full'
							label="Featured Image Caption"
							validateStatus={errors.featured_image_caption ? 'error' : ''}
							help={errors.featured_image_caption ? errors.featured_image_caption[0] : ''}>
							<Input placeholder="Featured Image Caption"/>
						</Form.Item>
						
						
						{/* EDITOR CK WYSIWYG */}
						<Form.Item
							label="Content"
							name="article_content"
							validateStatus={errors.content ? 'error' : ''}
							help={errors.content ? errors.content[0] : ''}>

							<CKEditor
								editor={ ClassicEditor }
								onChange={(event, editor) => {
									const data = editor.getData();
									//setEditorData(data);
									form.setFieldsValue({ article_content: data });
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
											// 'uploadImage',
											// 'resizeImage',
											// 'ckbox',
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

						<Flex gap="middle">
							<Form.Item
								name="status"
								className='w-full'
								label="Select Status"
								validateStatus={errors.status ? 'error' : ''}
								help={errors.status ? errors.status[0] : ''}>
								<Select>
									{
										statuses?.map(item => (
											<Select.Option key={item.status_id} value={item.status}>
												{item.status}
											</Select.Option>
										))
									}
								</Select>
							</Form.Item>

							<Form.Item
								name="date_published"
								label="Date Publish"
								className='w-full'
								validateStatus={errors.date_published ? 'error' : ''}
								help={errors.date_published ? errors.date_published[0] : ''}
							>
								<DatePicker className='w-full' onChange={onChangePublishDate} />
							</Form.Item>

							<Form.Item
								name='is_featured'
								valuePropName='checked'
								className='w-full'
								label="Featured"
								validateStatus={errors.is_featured ? 'error' : ''}
								help={errors.is_featured ? errors.is_featured[0] : ''}
							>
								<Checkbox>Featured Artlce</Checkbox>
								
							</Form.Item>
						</Flex>
						


						<Button 
							htmlType="submit"
							className='mt-4' 
							icon={<SaveOutlined />}
							loading={loading}
							type='primary'>
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
