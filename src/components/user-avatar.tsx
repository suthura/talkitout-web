import { Avatar } from "@nextui-org/react";
import React, { Suspense } from "react";
import useUser from "../hooks/useUser";
import { API_URL } from "../utils/api";

interface UserAvatarProps {
  link: string;
}

const UserAvatarComponent = (props: UserAvatarProps) => {
  const { user } = useUser();

  return (
    <Suspense>
      <Avatar
        src={API_URL + "/uploads/" + user.photo_file_path}
        size="xl"
        style={{ width: 128, height: 128 }}
      />
    </Suspense>
  );
};

export default UserAvatarComponent;
