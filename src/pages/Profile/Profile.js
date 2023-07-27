import React, { useContext } from "react";
import { UserContext } from "provider/UserProvider";
import { AppLayout } from "layouts";
import {
  Grid,
  Typography,
  Container,
  Box,
  Divider,
  Avatar,
} from "@mui/material";

const Profile = () => {
    const { userData } = useContext(UserContext);
  return (
    <AppLayout>
      <div style={{
                flexGrow: 1,
            }}>
        <Container component="main" maxWidth="md">
          <Typography style={{
                        marginTop: 80,
                        marginBottom: 40,
                        textAlign: "center",
                    }} 
                    variant="h4" gutterBottom>
            Personal info
          </Typography>
          <Box style={{
            border: "1px solid #E0E0E0",
            boxSizing: "border-box",
            borderRadius: "12px",
        }}>
            <Grid container style={{
                    paddingLeft: 32,
                    paddingRight: 32,
                    paddingTop: 24.8,
                    paddingBottom: 24.8,
                    display: "flex",
                    alignItems: "center",
                }}>
              <Grid item xs={4}>
                <Typography
                  style={{
                        color: "#BDBDBD",
                        fontSize: "1em",
                    }}
                  variant="h5"
                  gutterBottom
                >
                  PHOTO
                </Typography>
              </Grid>
              <Grid item xs={8}>
                {/* <UserAvatar user={userData} styles={{
                    width: "3em",
                    height: "3em",
                    borderRadius: "8px"
                }} /> */}
                <img
                            style={{
                                width: "200px",
                                height: "200px",
                                borderRadius: "8px",
                                objectFit: "cover"
                            }}
                            src={userData !== undefined && userData.avatar}
                            alt=""
                        />
              </Grid>
            </Grid>
            <Divider style={{
                        width: "100%",
                    }} />
            <Grid container style={{
                    paddingLeft: 32,
                    paddingRight: 32,
                    paddingTop: 24.8,
                    paddingBottom: 24.8,
                    display: "flex",
                    alignItems: "center",
                }}>
              <Grid item xs={4}>
                <Typography
                  style={{
    color: "#BDBDBD",
    fontSize: "1em",
  }}
                  variant="h5"
                  gutterBottom
                >
                  NAME
                </Typography>
              </Grid>
              <Grid container alignContent="center" item xs={8}>
                <Typography
                  style={{
    fontSize: "1.1em",
    fontWeight: "500",
  }}
                  variant="h6"
                  gutterBottom
                >
                  {userData !== undefined && userData.fullname}
                </Typography>
              </Grid>
            </Grid>
            <Divider style={{
    width: "100%",
  }} />
            <Grid container style={{
                    paddingLeft: 32,
                    paddingRight: 32,
                    paddingTop: 24.8,
                    paddingBottom: 24.8,
                    display: "flex",
                    alignItems: "center",
                    display: "none"
                }}>
              <Grid item xs={4}>
                <Typography
                  style={{
                        color: "#BDBDBD",
                        fontSize: "1em",
                    }}
                  variant="h5"
                  gutterBottom
                >
                  ADDRESS
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  style={{
                        fontSize: "1.1em",
                        fontWeight: "500",
                    }}
                  variant="h6"
                  gutterBottom
                >
                  {userData !== undefined && userData.email}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          {/* <Button style={classes.button} variant="outlined">
            Edit
          </Button> */}
        </Container>
      </div>
    </AppLayout>
  );
};

export default Profile;