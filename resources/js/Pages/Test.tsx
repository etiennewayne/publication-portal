import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import axios from 'axios';

const App: React.FC = () => {
    
    console.log('how many times');
    
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image',
      status: 'done',
      url: 'storage/featured_images/cf7bae55751fbfed198469d0810872d1.jpeg',
    },
  ]);



  const uploadProps: UploadProps = {
    name: 'featured_image',
    action: '/temp-upload',
   
    beforeUpload: (file) => {
        const isPNG = file.type === 'image/png';
        const isJPG = file.type === 'image/jpeg';

        if (!isPNG && !isJPG) {
           // message.error(`${file.name} is not a png/jpg file`);
        }
        return isPNG || isJPG || Upload.LIST_IGNORE;
    },

    onChange(info) {
        console.log('info onchange', info);
        
        if (info.file.status === 'done') {
           // message.success(`${info.file.name} file uploaded successfully`);
            //form.setFieldValue('featured_image', info.file.response)
        } else if (info.file.status === 'error') {
            //message.error(`${info.file.name} file upload failed.`);
        }
    },
    onRemove(info){
        axios.post('/temp-remove/' + info.response).then(res=>{
            if(res.data.status === 'temp_deleted'){
                message.success('File removed.');
            }
        })
        }
    };
  return (
    <Upload {...uploadProps} listType='picture' fileList={fileList}>
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
};

export default App;