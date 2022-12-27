import React from "react";
import { Input, Form } from "antd";
import { useNavigate } from "react-router-dom";

const SearchField = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSearch = ({ search }) => {
    if (search !== "") navigate(`/search=${search}/page=1`);
  };

  const handleSearchWithButton = () => {
    const search = form.getFieldValue("search");
    if (search !== "") navigate(`/search=${search}/page=1`);
  };

  return (
    <div className="w-[18%] h-[50%] mr-2">
      <Form form={form} onFinish={handleSearch}>
        <Form.Item name={"search"}>
          <Input
            className="w-full h-full rounded-[30px] pl-5 pr-2 text-[20px] placeholder:text-placeholder"
            placeholder="Search..."
            suffix={
              <div
                className="hover:bg-primary rounded-full p-1 group"
                onClick={handleSearchWithButton}
              >
                <svg
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 cursor-pointer "
                >
                  <path
                    d="M26.425 24.7031L18.3094 16.5875C19.5688 14.9594 20.25 12.9688 20.25 10.875C20.25 8.36875 19.2719 6.01875 17.5031 4.24688C15.7344 2.475 13.3781 1.5 10.875 1.5C8.37188 1.5 6.01563 2.47812 4.24688 4.24688C2.475 6.01563 1.5 8.36875 1.5 10.875C1.5 13.3781 2.47812 15.7344 4.24688 17.5031C6.01563 19.275 8.36875 20.25 10.875 20.25C12.9688 20.25 14.9563 19.5688 16.5844 18.3125L24.7 26.425C24.7238 26.4488 24.7521 26.4677 24.7832 26.4806C24.8143 26.4935 24.8476 26.5001 24.8813 26.5001C24.9149 26.5001 24.9482 26.4935 24.9793 26.4806C25.0105 26.4677 25.0387 26.4488 25.0625 26.425L26.425 25.0656C26.4488 25.0418 26.4677 25.0136 26.4806 24.9825C26.4935 24.9514 26.5001 24.918 26.5001 24.8844C26.5001 24.8507 26.4935 24.8174 26.4806 24.7863C26.4677 24.7552 26.4488 24.7269 26.425 24.7031ZM15.825 15.825C14.5 17.1469 12.7438 17.875 10.875 17.875C9.00625 17.875 7.25 17.1469 5.925 15.825C4.60313 14.5 3.875 12.7438 3.875 10.875C3.875 9.00625 4.60313 7.24688 5.925 5.925C7.25 4.60313 9.00625 3.875 10.875 3.875C12.7438 3.875 14.5031 4.6 15.825 5.925C17.1469 7.25 17.875 9.00625 17.875 10.875C17.875 12.7438 17.1469 14.5031 15.825 15.825Z"
                    className="opacity-[0.33] group-hover:opacity-100 fill-black group-hover:fill-white"
                  />
                </svg>
              </div>
            }
            type="text"
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default SearchField;
