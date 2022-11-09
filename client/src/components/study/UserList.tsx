import React, { useState } from "react";
import User from "./User";
type Props = {};

export type UserType = {
  id: number;
  name: string;
  age: number;
  position: string;
};

const UserList = (props: Props) => {
  const [userList, setUserList] = useState<UserType[]>([
    {
      id: 0,
      name: "철수",
      age: 27,
      position: "front-end",
    },
    {
      id: 1,
      name: "민성",
      age: 24,
      position: "back-end",
    },
  ]);
  return (
    <div>
      {userList.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
