import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { UploadListType } from "antd/es/upload/interface";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

interface PropType {
    fileSize: number;
    fileList: UploadFile[];
    setFileList: React.Dispatch<React.SetStateAction<UploadFile<unknown>[]>>;
    listType: UploadListType | undefined;
}

const UploadField = ({
    fileSize,
    fileList,
    setFileList,
    listType,
}: PropType) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(
            file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
        );
    };

    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const uploadButton = (
        <Button
            icon={<PlusOutlined />}
            style={{ width: 269, height: 66, marginTop: 5 }}
        >
            Upload
        </Button>
    );

    return (
        <>
            <Upload
                beforeUpload={() => {
                    return false;
                }}
                listType={listType}
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= fileSize ? null : uploadButton}
            </Upload>

            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="example" src={previewImage} />
            </Modal>
        </>
    );
};

export default UploadField;
