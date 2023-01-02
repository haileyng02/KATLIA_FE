import React, { useState } from "react";
import { Modal, Form, Upload, message, Checkbox, Rate } from "antd";
import { LoadingOutlined, PlusOutlined,StarFilled } from "@ant-design/icons";
import CountingTextArea from "../CountingTextArea";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const RateProductModal = ({ open, handleCancel, items }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      centered
      footer={null}
      width="50%"
    >
      <div className="overflow-modal">
        <h1 className="font-inter font-semibold text-[30px]">RATE PRODUCT</h1>
        <p
          className="font-inter font-medium text-[18px]"
          style={{ color: "rgba(0, 0, 0, 0.71)" }}
        >
          Please write Overall level of satisfaction with your Delivery Service
        </p>
        <div className="flex gap-x-[12px] mt-[46px]">
          <img
            src="https://s3-alpha-sig.figma.com/img/c77d/c1ef/cb082f299254063d53ddae687a0b7d47?Expires=1673222400&Signature=pJXAwsw8Yw6wuiAGnrhNgrDrbXdVQZTWzRbqx7KwXRgKX8M-ZGi9F~lvjPfUdlMBLEjDxJPcLimW5ebDBgQbYP8yk~7RnT5W5Fon2xfD1u9Y3eLXAh4lcGSRYFrqH2xcVa~AO7eeUnrC~Xe0e7MyTuZ7kBb70G9KbR5oRTSf2g5yIFZEz-geyHObR~9eFlMf~MLXqkPuBSufuEST204vmqg3EqUIY7~nBq3DywkdDIFSksygiXyVUyOnJO-MT3Tq2AcdRV~qs768UumaIdXvuiIJX6yu1f~gdZ~C-2LymD3HPMBfnPCSRu862DFUQwXrzz6FTY~2FTEY3M7QQN5nMQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            alt="Product"
            className="w-[42px] h-[67px] object-fit object-center"
          />
          <h3 className="font-inter font-semibold text-[18px]">
            Basic Knit Sweater
          </h3>
        </div>
        <h2 className="rate-title">Product Quality</h2>
        <Rate />
        <h2 className="rate-title mb-[23px]">Write Your Review</h2>
        <CountingTextArea
          maxLength={1500}
          placeholder="Write your review here"
        />
        <h2 className="rate-title">Add Photo</h2>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="avatar"
              style={{
                width: "100%",
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
        <div className="row gap-x-[10px] mt-[20px]">
          <Checkbox />
          <div>
            <h2 className="font-inter font-semibold text-[20px]">
              Show username on your review
            </h2>
            <p className="font-inter text-[12px] text-[#9098B1]">
              Your username will be shown as n*****2
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RateProductModal;
