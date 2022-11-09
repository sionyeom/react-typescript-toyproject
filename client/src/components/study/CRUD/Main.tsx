import React, { useEffect, useState } from "react";
import axios from "axios";

type Props = {};

type DataType = {
  id: string;
  createdAt: string;
  title: string;
  description: string;
  [propName: string]: any;
};

type InputType = {
  title: string;
  description: string;
};

const Main = (props: Props) => {
  const [data, setData] = useState<DataType | null>(null);
  const [input, setInput] = useState<InputType>({
    title: "",
    description: "",
  });

  const [isUpdated, setIsUpdates] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<string>("");

  const { title, description } = input;

  useEffect(() => {
    axios({
      url: "/tutorial",
      method: "get",
    }).then((res) => {
      setData(res.data);
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onSubmit = (form: { title: string; description: string }) => {
    axios({
      method: "post",
      url: "tutorial",
      data: {
        title: form.title,
        description: form.description,
      },
    }).then((res) => {
      if (res.status === 200) {
        console.log("등록완료");
      }
    });
  };

  const onClickDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    setData(data?.filter((d: DataType) => d.id !== id));
    axios({
      method: "delete",
      url: `/tutorial/${id}`,
    }).then((res) => {
      if (res.status === 200) console.log("삭제 성공");
    });
  };

  const onClickSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (title === "" || description === "") {
      return;
    }

    e.preventDefault();
    onSubmit(input);
    setInput({
      title: "",
      description: "",
    });
  };

  const onClickUpdate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    arr: any
  ) => {
    setIsUpdates(!isUpdated);
    setInput({
      title: arr.title,
      description: arr.description,
    });
    setUpdateId(arr.id);
  };

  const onUpdate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    updateId: string
  ) => {
    console.log(updateId);
    console.log(input);
    axios({
      method: "patch",
      url: `/tutorial/${updateId}`,
      data: {
        title: title,
        description: description,
      },
    }).then((res) => {
      if (res.status === 200) {
      }
    });
  };

  return (
    <div>
      <div>
        <div>
          제목 :
          <input type="text" name="title" value={title} onChange={onChange} />
        </div>
        <div>
          내용 :
          <input
            type="text"
            name="description"
            value={description}
            onChange={onChange}
          />
        </div>
        <div>
          <button onClick={onClickSubmit}>작성</button>
          {isUpdated && (
            <button onClick={(e) => onUpdate(e, updateId)}>수정</button>
          )}
        </div>
      </div>
      <div>
        {data?.map((e: DataType) => {
          let dataForUpdate: any = {
            id: e.id,
            title: e.title,
            description: e.description,
          };

          return (
            <div key={e.id}>
              <p>id: {e.id}</p>
              <p>제목 : {e.title}</p>
              <p>내용 : {e.description}</p>
              <p>작성일자 : {e.createdAt}</p>
              <span>
                <button onClick={(ele) => onClickUpdate(ele, dataForUpdate)}>
                  수정
                </button>
                <button onClick={(ele) => onClickDelete(ele, e.id)}>
                  삭제
                </button>
              </span>
            </div>
          );
        })}
      </div>
      <div></div>
    </div>
  );
};

export default Main;
