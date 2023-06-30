import React from "react";
import { Avatar } from "@mui/material";

const UserAvatar = ({ user, styles, isTask }) => {

    return (
        <div>
            {user && user.avatar ? (
                <Avatar
                    src={user.avatar}
                    alt={user.fullname + " avatar"}
                    style={{
                        borderRadius: "8px",
                        width: isTask && "35px",
                        height: isTask && "35px",
                    }}
                />
            ) : (
                <Avatar
                    //className={styles}
                    alt="user avatar"
                    src={user && user.avatar}
                    style={{
                        borderRadius: "8px",
                        width: isTask && "36px",
                        height: isTask && "36px",
                    }}
                >
                    {user && user.fullname && user.fullname[0].toUpperCase()}
                </Avatar>
            )}
        </div>
    );
};

export default UserAvatar;
