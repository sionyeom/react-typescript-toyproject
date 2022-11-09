import React from "react";
import { UserType } from "./UserList";

type UserProps = { user: UserType };

const User = ({ user }: UserProps) => {
  const { name, age, position } = user;
  return (
    <div>
      <p>이름 : {name}</p>
      <p>나이 : {age}</p>
      <p>포지션 : {position}</p>
    </div>
  );
};

export default User;
