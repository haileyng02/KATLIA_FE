import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Form, Upload, Checkbox, Rate, Divider, Spin } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import appApi from "../../api/appApi";
import * as routes from "../../api/apiRoutes";
import CountingTextArea from "../CountingTextArea";
import { openNotification } from "../../actions/notification";

const RateProductModal = ({
  open,
  handleCancel,
  currentUser,
  orderId,
  getOrderDetail,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesDone, setImagesDone] = useState(0);
  const [writeDone, setwriteDone] = useState(false);
  const [items,setItems] = useState();

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

  //Get products for feedback
  const getProductsForFeedback = async () => {
    setLoading(true);
    try {
      const token = currentUser.token;
      const result = await appApi.get(routes.PRODUCTS_FOR_FEEDBACK(orderId), {
        ...routes.getAccessTokenHeader(token),
        ...routes.getProductsForFeedbackParamsId(orderId),
      });
      setItems(result.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
    setLoading(false);
  };

  //Write feedback
  const writeFeedback = async (feedbackArray) => {
    try {
      const token = currentUser.token;
      const result = await appApi.post(
        routes.WRITE_FEEDBACK(orderId),
        routes.getWriteFeedbackBody(feedbackArray),
        {
          ...routes.getAccessTokenHeader(token),
          ...routes.getWriteFeedbackParamsId(orderId),
        }
      );
      console.log(result.data);
      setwriteDone(true);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(err.message);
      }
    }
  };

  //Up image for feedback
  const upImageForFeedback = async (file, productId) => {
    if (file) {
      try {
        //Call api upload image
        const token = currentUser.token;
        const formData = new FormData();

        formData.append("file", file);
        const result = await appApi.patch(
          routes.UP_IMAGE_FOR_FEEDBACk,
          formData,
          {
            ...routes.getAccessTokenHeader(token),
            ...routes.getUpImageForFeedbackParams(orderId, productId),
          }
        );
        console.log(result.data);
        setImagesDone(imagesDone + 1);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(err.message);
        }
      }
    }
  };

  const handleChange = (value, i) => {
    if (i >= images.length) {
      var temp = images;
      temp[i] = value.file.originFileObj;
      setImages(temp);
    } else {
      setImages(
        images.map((image, index) =>
          index === i ? value.file.originFileObj : image
        )
      );
    }
  };

  const handleUpload = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      setLoading(true);
      console.log(
        values.feedbacks.map((value, i) => {
          return {
            productId: items[i].productId,
            hideUsername: value.hideUsername,
            comment: value.textarea,
            rate: value.rate,
          };
        })
      );
      writeFeedback(
        values.feedbacks.map((value, i) => {
          return {
            productId: items[i].productId,
            hideUsername: value.hideUsername,
            comment: value.textarea,
            rate: value.rate,
          };
        })
      );
      handleUploadFeedbackImage();
    });
  };

  const handleUploadFeedbackImage = () => {
    for (let i = 0; i < images.length; i++) {
      if (images[i]) {
        upImageForFeedback(images[i], items[i].productId);
      } else {
        setImagesDone(imagesDone + 1);
      }
    }
  };

  const onCancel = () => {
    handleCancel();
    form.resetFields();
    setImagesDone(0);
    setwriteDone(false);
  };

  useEffect(() => {
    if (orderId) getProductsForFeedback();
  }, [orderId]);

  useEffect(() => {
    if (imagesDone === images.length && writeDone) {
      setLoading(false);
      onCancel();
      dispatch(
        openNotification({
          type: "success",
          message: "Feedback recorded!",
          description: "You have written a feedback for the products.",
        })
      );
      getOrderDetail();
    }
  }, [imagesDone, writeDone]);

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      centered
      footer={[
        <button
          onClick={onCancel}
          className="py-1 px-4 border-[0.5px] border-black70 rounded-[7px] font-semibold text-[20px] text-black70 hover:border-1 hover:border-black hover:text-black"
        >
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
        <Spin spinning={loading}>
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
                    {item.name}
                  </h3>
                </div>
                <h2 className="rate-title">Product Quality</h2>
                <Form.Item
                  name={["feedbacks", i, "rate"]}
                  rules={[
                    {
                      required: true,
                      message: "Please rate from 1 to 5",
                    },
                  ]}
                >
                  <Rate />
                </Form.Item>
                <h2 className="rate-title mb-[23px]">Write Your Review</h2>
                <CountingTextArea
                  maxLength={1500}
                  placeholder="Write your review here"
                  index={i}
                />
                <h2 className="rate-title">Add Photo</h2>
                <Form.Item
                  name={["feedbacks", i, "image"]}
                  getValueFromEvent={(value) => handleChange(value, i)}
                >
                  <Upload
                    customRequest={handleUpload}
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    accept="image/*"
                    handleChange={(info) => handleChange(info, i)}
                  >
                    {images[i] ? (
                      <img
                        src={URL.createObjectURL(images[i])}
                        alt="avatar"
                        className="aspect-square object-cover object-center"
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
        </Spin>
      </div>
    </Modal>
  );
};

export default RateProductModal;
