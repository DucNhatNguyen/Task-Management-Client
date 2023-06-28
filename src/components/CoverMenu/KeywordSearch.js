import React, { useEffect, useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import { SearchImages, GetRandomImages, GetImages } from "api/unsplash";

const KeywordSearch = ({
    setSearchedImages,
    setRandomImages,
    searchInput,
    setSearchInput,
}) => {
    const [error, setError] = useState();

    useEffect(() => {
        GetRandomImages(12)
          .then((result) => {
            setRandomImages(result);
          })
          .catch((err) => {
            console.log(err);
          });
        GetImages()
            .then((response) => {
                setRandomImages(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // useEffect(() => {
    //     setError();
    // }, [searchInput]);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setError();
    //     }, 5000);
    // }, [error]);

    const handleSearch = () => {
        setError();
        if (searchInput.trim().length > 0) {
            SearchImages(searchInput)
                .then((result) => {
                    setSearchedImages(result.results);
                })
                .catch((err) => {
                    setError(err);
                });
        } else {
            setError("Input field cannot be empty!");
        }
    };

    return (
        <div>
            <Grid style={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0px 4px 12px rgb(0 0 0 / 15%)"
            }} container>
                <Grid item xs={10}>
                    <input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Keywords..."
                        type="text"
                        onKeyDown={(e) => e.stopPropagation()}
                        style={{
                            width: "100%",
                            height: "100%",
                            paddingLeft: "16px",
                            paddingTop: "8px",
                            paddingBottom: "8px",
                            outlineWidth: "0",
                            color: "#757575",
                            letterSpacing: "-0.035em",
                            fontWeight: "500",
                            fontFamily: "Poppins",
                            fontSize: "0.875rem",
                            border: "none",
                            borderRadius: "8px"
                        }}
                    />
                </Grid>
                <Grid container alignItems="center" justifyContent="end" item xs={2}>
                    <IconButton
                        onClick={handleSearch}
                        style={{
                            backgroundColor: "#1976d2",
                            color: "white",
                            borderRadius: "8px",
                            marginRight: "1.6px",
                            height: "92%",
                            "&:hover": {
                                backgroundColor: "#1565c0",
                            },
                        }}
                        aria-label="delete"
                    >
                        <Search />
                    </IconButton>
                </Grid>
            </Grid>
            <Typography style={{
                fontSize: "0.825rem",
                marginTop: "8px",
                marginBottom: "8px",
                paddingLeft: "4px",
                color: "#f44336",
                fontWeight: "500"
            }}>{error}</Typography>
        </div>
    );
};

export default KeywordSearch;
