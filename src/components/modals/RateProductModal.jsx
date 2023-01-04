import React, { useState } from "react";
import { Modal, Form, Upload, message, Checkbox, Rate, Divider } from "antd";
import { LoadingOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import CountingTextArea from "../CountingTextArea";

const getBase64 = (img) => {
  const reader = new FileReader();
  reader.readAsDataURL(img);
  return reader.result;
};

const RateProductModal = ({ open, handleCancel, items }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(false);

  const handleChange = (info, i) => {
    console.log(info);
    console.log(i);
    var temp = images;
    temp[i] = URL.createObjectURL(info.file.originFileObj);
    console.log(temp);
    setImages(temp);
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

  const handleUpload = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
      //   console.log(file);
    }, 0);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log(form.getFieldsValue().feedbacks[0].image.file.originFileObj);
    });
  };
  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      centered
      footer={[
        <button className="py-1 px-4 border-[0.5px] border-black70 rounded-[7px] font-semibold text-[20px] text-black70 hover:border-1 hover:border-black hover:text-black">
          Cancel
        </button>,
        <button
          onClick={handleOk}
          className="py-1 px-4 rounded-[7px] bg-primary hover:bg-secondary text-[20px] text-white ml-[25px] mr-7"
        >
          Confirm
        </button>,
      ]}
      width="50%"
      title={
        <>
          <h1 className="font-inter font-semibold text-[30px]">RATE PRODUCT</h1>
          <p
            className="font-inter font-medium text-[18px]"
            style={{ color: "rgba(0, 0, 0, 0.71)" }}
          >
            Please write Overall level of satisfaction with your Delivery
            Service
          </p>
        </>
      }
    >
      <div className="overflow-modal">
        <Form form={form}>
          {items?.map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <Divider style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }} />
              )}
              <div className="flex gap-x-[12px] mt-[46px]">
                <img
                  src={item.image}
                  alt="Product"
                  className="w-[42px] h-[67px] object-fit object-center"
                />
                <h3 className="font-inter font-semibold text-[18px]">
                  Basic Knit Sweater
                </h3>
              </div>
              <h2 className="rate-title">Product Quality</h2>
              <Form.Item name={["feedbacks", i, "rate"]}>
                <Rate />
              </Form.Item>
              <h2 className="rate-title mb-[23px]">Write Your Review</h2>
              <CountingTextArea
                maxLength={1500}
                placeholder="Write your review here"
                index={i}
              />
              <h2 className="rate-title">Add Photo</h2>
              <Form.Item name={["feedbacks", i, "image"]}>
                <Upload
                  customRequest={handleUpload}
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  accept="image/*"
                  handleChange={(info) => handleChange(info, i)}
                >
                  {form.getFieldsValue().feedbacks &&
                  form.getFieldsValue().feedbacks[i].image ? (
                    <img
                      src={images[0]}
                      alt="avatar"
                      style={{
                        width: "100%",
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
              <div className="row gap-x-[10px] mt-[20px]">
                <Form.Item
                  name={["feedbacks", i, "hideUsername"]}
                  valuePropName="checked"
                  initialValue={false}
                >
                  <Checkbox />
                </Form.Item>
                <div>
                  <h2 className="font-inter font-semibold text-[20px]">
                    Show username on your review
                  </h2>
                  <p className="font-inter text-[12px] text-[#9098B1]">
                    Your username will be shown as n*****2
                  </p>
                </div>
              </div>
            </React.Fragment>
          ))}
        </Form>
      </div>
    </Modal>
  );
};

export default RateProductModal;
