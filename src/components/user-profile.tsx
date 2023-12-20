import { User } from "@nextui-org/react";
import { API_URL } from "../utils/api";

interface UserProfileProps {
  user: any;
}

const UserProfileComponent = (props: UserProfileProps) => {
  return (
    <User
      src={API_URL + "/uploads/" + props.user.photo_file_path}
      name={`${props.user.fname} ${props.user.lname}`}
      css={{ p: 0 }}
    >
      {props.user.email}
    </User>
  );
};

export default UserProfileComponent;
