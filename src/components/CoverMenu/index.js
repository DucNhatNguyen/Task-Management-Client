import React, { useState } from "react";
import { Typography, Grid } from "@mui/material";
import KeywordSearch from "./KeywordSearch";
import { PopMenu } from "./styles";

const CoverMenu = ({ anchorEl, handleClose, handleImageClick }) => {
    const [searchedImages, setSearchedImages] = useState([]);
    const [randomImages, setRandomImages] = useState([]);

    const [searchInput, setSearchInput] = useState("");

    return (
        <div>
            <PopMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Grid style={{
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    paddingTop: "14.4px",
                    outlineWidth: "0"
                }} container>
                    <Grid item xs={12}>
                        <Typography style={{
                            color: "black",
                            fontWeight: "600",
                            fontSize: "1rem"
                        }} component="p">
                            Photo Search
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{
                            marginTop: "4px",
                            color: "#828282",
                            fontSize: "0.875rem"
                        }} component="p">
                            Search Unsplash for photos
                        </Typography>
                    </Grid>
                </Grid>
                <Grid style={{
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    paddingTop: "14.4px",
                    paddingBottom: "14.4px"
                }} container>
                    <Grid item xs={12}>
                        <KeywordSearch
                            setSearchedImages={setSearchedImages}
                            setRandomImages={setRandomImages}
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                        />
                    </Grid>
                </Grid>
                <Grid style={{
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    paddingTop: "14.4px",
                    paddingBottom: "14.4px"
                }} container>
                    {randomImages !== undefined &&
                        searchedImages.length <= 0 &&
                        randomImages.map((val, key) => {
                            return (
                                <Grid
                                    key={key}
                                    style={{
                                        marginBottom: "10px"
                                    }}
                                    container
                                    justify="center"
                                    item
                                    xs={3}
                                >
                                    <img
                                        onClick={() =>
                                            handleImageClick(val.urls.regular, val.urls.raw)
                                        }
                                        key={key}
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                            transition: "all .2s ease-in-out",
                                            "&:hover": {
                                                cursor: "pointer",
                                                transform: "scale(1.05)"
                                            }
                                        }}
                                        alt={val.alt_description}
                                        src={val.urls.thumb}
                                    />
                                </Grid>
                            );
                        })}
                    {searchedImages !== undefined &&
                        searchedImages.length > 0 &&
                        searchedImages.map((val, key) => {
                            return (
                                <Grid
                                    key={key}
                                    style={{
                                        marginBottom: "10px"
                                    }}
                                    container
                                    justify="center"
                                    item
                                    xs={3}
                                >
                                    <img
                                        onClick={() =>
                                            handleImageClick(val.urls.regular, val.urls.raw)
                                        }
                                        key={key}
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                            transition: "all .2s ease-in-out",
                                            "&:hover": {
                                                cursor: "pointer",
                                                transform: "scale(1.05)"
                                            }
                                        }}
                                        alt={val.alt_description}
                                        src={val.urls.thumb}
                                    />
                                </Grid>
                            );
                        })}
                </Grid>
            </PopMenu>
        </div>
    );
};

export default CoverMenu;
