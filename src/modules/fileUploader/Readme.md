# File Uploader Module
Includes a form to select and upload a file, as well as backe-end part to send the file to AWS S3 service.

See them in action:
![File Uploader Module](https://github.com/saasforge/saas-forge-public-docs/blob/master/file-upload-module.png?raw=true)

## Features
You can specify:
- showFileName - bool, if you want the file name to be shown (true by default)
- noFileText - the text that should be shown if no file is selected and showFileName is true ('No file selected' by default)
- previewWidth - width of preview image
- previewHeight - height of preview image
- previewIsRound - false or true (false by default)
- generateIdName - false or true (false by default), indicates if the module should generate ID name for a newly uploaded image
- uploadOnSelection - if true (false by default), the upload is executing right after user selects a file
- showAlert - indicates if component should show its own alert with the upload success or not (true by default).


## How to use
### Set up your account on AWS
1. Create an account and get your credentials (click on your account name -> select My security credentials -> click Access keys). Copy these 2 keys into the following env variables:

**AWS_ACCESS_KEY_ID**
**AWS_SECRET_KEY**

2. Create a bucket. Add its name as another env variable:
**AWS_BUCKET_NAME**

3. Change your bucket permissions. 
- In the Block public access unblock all properties
- In the Access Control list, add Public access to read and write objects
- In the Bucket policy, add something like that:
```
{
    "Version": "2012-10-17",
    "Id": "Policy15605345364204",
    "Statement": [
        {
            "Sid": "Stmt156012333612",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<your_bucket_name>/*"
        }
    ]
}
```
It's just an example because this policy grants a right to get object. It's useful when you need to provide a public access to your files.

### Add component
```javascript
import FileUploader from '@src/modules/fileUploader/FileUploader.jsx';
```

Add the component:

```
    <FileUploader 
        showFileName={true} 
        previewWidth="200px" 
        previewHeight="120px"
        previewIsRound={false}
        generateIdName={true} />
```

### Props:
- **src** - URL to the file to show
- **showFileName** - bool, if you want the file name to be shown (true by default)
- **noFileText** - the text that should be shown if no file is selected and showFileName is true ('No file selected' by default)
- **previewWidth** - width of preview image
- **previewHeight** - height of preview image
- **previewIsRound** - false or true (false by default)
- **generateIdName** - false or true (false by default), indicates if the module should generate ID name for a newly uploaded image
- **uploadOnSelection** - if true (false by default), the upload is executing right after user selects a file
- **showAlert** - indicates if component should show its own alert with the upload success or not (true by default).