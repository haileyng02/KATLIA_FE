import React,{useState} from "react";
import { Form, Checkbox, Rate, Divider, Upload, message  } from "antd";
import { LoadingOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import CountingTextArea from "./CountingTextArea";

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
  

const FeedbackForm = ({ key, item }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);

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

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log(values);
    });
  };
  return (
    <Form>
      {key > 0 && <Divider style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }} />}
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
      <Rate />
      <h2 className="rate-title mb-[23px]">Write Your Review</h2>
      <CountingTextArea maxLength={1500} placeholder="Write your review here" />
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
        <Form.Item>
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
    </Form>
  );
};

export default FeedbackForm;
