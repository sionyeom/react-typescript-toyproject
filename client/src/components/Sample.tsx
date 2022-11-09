import React, { useEffect, useState } from "react";
import axios from "axios";

type Props = {};

type DataType = {
  id: string | undefined;
  createdAt: string | undefined;
  title: string | undefined;
  description: string | undefined;
};

const Sample = (props: Props) => {
  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    axios({
      url: "/tutorial",
      method: "get",
    }).then((res) => {
      setData(res.data);
    });
  }, []);

  return <div>Sample</div>;
};

export default Sample;
