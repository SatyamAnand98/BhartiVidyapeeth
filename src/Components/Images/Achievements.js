import CloseIcon from "@mui/icons-material/Close";
import GetAppIcon from "@mui/icons-material/GetApp";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import {
    Button,
    Dialog,
    DialogContent,
    IconButton,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

export default function Achievements() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [selectedItem, setSelectedItem] = useState(null);
    const [muted, setMuted] = useState(true);
    const [playing, setPlaying] = useState(false);
    const [videoRef, setVideoRef] = useState(null);
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: "100px 0px",
    });

    useEffect(() => {
        if (!inView && selectedItem?.type === "video") {
            videoRef.current.pause();
            setPlaying(false);
            setSelectedItem(null);
        }
    }, [inView]);

    const openDialog = (item) => {
        setSelectedItem(item);
        setPlaying(true);
        setMuted(false);
    };

    const closeDialog = () => {
        if (selectedItem?.type === "video") {
            videoRef.current.pause();
            setPlaying(false);
        }
        setSelectedItem(null);
    };

    const downloadImage = (imageUrl) => {
        fetch(imageUrl)
            .then((response) => response.blob())
            .then((blob) => {
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = "bvpImage";
                link.click();
            })
            .catch((error) => console.error("Error downloading image:", error));
    };

    const downloadItem = (event) => {
        event.preventDefault();
        if (selectedItem?.type === "image") {
            downloadImage(selectedItem.url);
        } else if (selectedItem?.type === "video") {
            downloadImage(selectedItem.thumbnail);
        }
    };

    const handlePlayPause = () => {
        const video = videoRef.current;

        if (selectedItem?.type === "video" && video) {
            // Check if the video is loaded
            if (video.readyState >= 2) {
                // ReadyState 2 means the video has enough data to start playing
                if (video.paused || video.ended) {
                    video
                        .play()
                        .then(() => setPlaying(true))
                        .catch((error) =>
                            console.error("Error playing video:", error)
                        );
                } else {
                    video.pause();
                    setPlaying(false);
                }
            } else {
                console.warn(
                    "Video is not loaded yet. Wait for it to be ready before playing."
                );
            }
        }
    };

    const handleMuteUnmute = () => {
        if (selectedItem?.type === "video") {
            videoRef.current.muted = !muted;
            setMuted(!muted);
        }
    };

    return (
        <GalleryStyled>
            <ImageListContainer
                sx={{
                    display: "grid",
                    gridTemplateColumns: isSmallScreen
                        ? "1fr"
                        : "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "16px",
                    gridAutoRows: "auto",
                    height: "100%",
                    padding: "2rem",
                    boxSizing: "border-box",
                    justifyContent: "center",
                }}
            >
                {itemData.map((item) => (
                    <GalleryCard
                        key={item.url}
                        sx={{
                            cursor: "pointer",
                            position: "relative",
                            overflow: "hidden",
                            borderRadius: "10px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.3s ease",
                            "&:hover": {
                                transform: "scale(1.05)",
                            },
                        }}
                        onClick={() => openDialog(item)}
                    >
                        {item.type === "image" && (
                            <img
                                src={item.url}
                                alt={item.title}
                                loading="lazy"
                            />
                        )}
                        {item.type === "video" && (
                            <video
                                ref={setVideoRef}
                                preload="metadata"
                                loop
                                playsInline
                                src={item.url}
                                alt={item.title}
                                loading="lazy"
                            />
                        )}
                        {item.type === "video" && (
                            <PlayOverlay>
                                <img src={item.thumbnail} alt={item.title} />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="64"
                                    height="64"
                                    viewBox="0 0 64 64"
                                >
                                    <circle
                                        cx="32"
                                        cy="32"
                                        r="32"
                                        fill="rgba(0,0,0,0.6)"
                                    />
                                    <polygon
                                        points="25.6,16 25.6,48 48,32"
                                        fill="#fff"
                                    />
                                </svg>
                            </PlayOverlay>
                        )}
                    </GalleryCard>
                ))}
                <div ref={ref}></div>
            </ImageListContainer>

            <Dialog open={!!selectedItem} onClose={closeDialog} maxWidth="lg">
                <DialogContent sx={{ padding: 0 }}>
                    {selectedItem?.type === "image" && (
                        <img
                            src={selectedItem.url}
                            alt="Enlarged"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                            }}
                        />
                    )}
                    {selectedItem?.type === "video" && (
                        <video
                            ref={videoRef}
                            autoPlay
                            muted={muted}
                            loop
                            playsInline
                            src={selectedItem.url}
                            alt="Enlarged"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    )}
                    <IconButton
                        sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            color: "white",
                        }}
                        onClick={closeDialog}
                    >
                        <CloseIcon />
                    </IconButton>
                    {selectedItem && selectedItem.type !== "video" && (
                        <DownloadButton
                            className="ApplyNow"
                            variant="contained"
                            startIcon={<GetAppIcon />}
                            onClick={(e) => downloadItem(e)}
                            sx={{
                                position: "absolute",
                                bottom: 16,
                                left: 16,
                            }}
                        >
                            Download
                        </DownloadButton>
                    )}
                    {selectedItem?.type === "video" && (
                        <>
                            <IconButton
                                sx={{
                                    position: "absolute",
                                    bottom: 16,
                                    left: "65%",
                                    transform: "translateX(-65%)",
                                    color: "white",
                                    background: "rgba(0, 0, 0, 0.5)",
                                }}
                                onClick={handleMuteUnmute}
                            >
                                {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                            </IconButton>
                            <IconButton
                                sx={{
                                    position: "absolute",
                                    bottom: 16,
                                    left: "85%",
                                    transform: "translateX(-85%)",
                                    color: "white",
                                    background: "rgba(0, 0, 0, 0.5)",
                                }}
                                onClick={handlePlayPause}
                            >
                                {playing ? <PauseIcon /> : <PlayArrowIcon />}
                            </IconButton>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </GalleryStyled>
    );
}

const GalleryStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
`;

const ImageListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center; /* Add this line to center items vertically */
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 0 0 10px 0 black;
    width: 100%;
    height: 100%;
    h2 {
        color: white;
        margin-bottom: 1rem;
    }
    @media (max-width: 768px) {
        padding: 1rem;
        width: 100%;
    }
    @media (max-width: 500px) {
        padding: 1rem;
        width: 100%;
    }
`;

const GalleryCard = styled.div`
    display: flex;
    justify-content: center;
    align-items: center; /* Add this line to center content vertically */
    flex-direction: column;
    padding: 0.5rem;
    border-radius: 1rem;
    box-shadow: 0 0 10px 0 black;
    width: 100%;
    max-width: 30%;
    height: 30%;
    max-height: 30%;
    margin: 1rem;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.15);
        z-index: 1;
    }

    @media (max-width: 768px) {
        padding: 0.5rem;
        width: 100%;
        max-width: 100%;
        height: 100%;
        max-height: 100%;
    }

    @media (max-width: 500px) {
        padding: 0.5rem;
        width: 100%;
        max-width: 100%;
        height: 100%;
        max-height: 100%;
    }

    img,
    video {
        border-radius: 1rem;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const PlayOverlay = styled.div`
    position: absolute;
    cursor: pointer;
    z-index: 1;
    display: ${({ playing }) => (playing ? "none" : "block")};

    img {
        width: 100%;
        height: 100%;
        object-fit: fill;
        border-radius: 1rem;
    }

    svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &:hover {
        svg {
            transform: scale(1.1) translate(-50%, -50%);
        }
    }

    &:active {
        svg {
            transform: scale(1) translate(-50%, -50%);
        }
    }

    &:focus {
        svg {
            transform: scale(1) translate(-50%, -50%);
        }
    }
`;

const DownloadButton = styled(Button)`
    position: absolute;
    bottom: 16px;
    left: 16px;
`;
const itemData = [
    {
        url: "https://scontent-bom2-1.xx.fbcdn.net/v/t1.6435-9/83521739_3294315427250494_6223347259023556608_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=fNZft_TIlBYAX_4Y1rG&_nc_ht=scontent-bom2-1.xx&oh=00_AfAu2Q-uFxr-eJJJYBxnfNYj0NqYdOgtvpNTtNdDfwHEbA&oe=65F1A608",
        type: "image",
    },
    {
        url: "https://scontent-bom2-1.xx.fbcdn.net/v/t1.6435-9/83123164_3298518553496848_83554839237230592_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=_ZeUAb6ZErIAX_VQhQ2&_nc_ht=scontent-bom2-1.xx&oh=00_AfDLBngpbHW7xNeil0zROj_l1Sjbx5gtROW1AMyAPSpn-Q&oe=65F1C5F2",
        type: "image",
    },
    {
        url: "https://scontent-bom2-1.xx.fbcdn.net/v/t1.6435-9/83217332_3294315623917141_1654275751488258048_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=Vrxi_wMeR9wAX-ey-23&_nc_ht=scontent-bom2-1.xx&oh=00_AfCAfRrV2qYvsazM1NCan0GLbLq--hfXSbRS4tEmCLe2dw&oe=65F1C3C5",
        type: "image",
    },
    {
        url: "https://scontent-bom1-1.xx.fbcdn.net/v/t39.30808-6/423239751_685410773784527_4450919815821559924_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=3635dc&_nc_ohc=zyNKLfisWhwAX8h8JPF&_nc_oc=AQmdcoRRhPy4A9WiSqQh8Bn9CD3gMnaGXEjc1-L3SF8A8FYjhkzSzsBd2PH3o2AnajwojzDQrBgz6XYIULEBCSsp&_nc_ht=scontent-bom1-1.xx&oh=00_AfCGiUuVErf6pQrGbsQcYd_4JIoX8qgJAMZSfeJSaEpP2A&oe=65CEC24A",
        type: "image",
    },
    {
        url: "https://scontent-bom1-1.xx.fbcdn.net/v/t39.30808-6/423131961_685405937118344_6507006670486626221_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=3635dc&_nc_ohc=Ars4ztVI3ugAX9KlqPX&_nc_ht=scontent-bom1-1.xx&oh=00_AfCrzHRVffnIgYm5Pn_vFL9LdLJ2G8oL3BWz5T9dlIMEbA&oe=65CFDF5A",
        type: "image",
    },
    {
        url: "https://scontent-bom1-1.xx.fbcdn.net/v/t31.18172-8/28336734_2101222759893106_5531758201628385898_o.jpg?_nc_cat=111&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=VJfom5SzGKgAX_W1T3_&_nc_oc=AQnP4Xr_KWBBesReYJL-BU7yYM2EXklv4G81ut6liIvKABTHbMHA2l0epJqu4uaTSLfioLKmuunhU1Qu6hFcafLh&_nc_ht=scontent-bom1-1.xx&oh=00_AfAOpwxB8hSUJC-DZtgs3xR6G0MRN9p_vExnypV8Ea9cAg&oe=65F1B69A",
        type: "image",
    },
    {
        url: "https://scontent-bom1-1.xx.fbcdn.net/v/t1.18169-9/25508171_2023685780980138_973250303921260045_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=Wq2EUTSyaWcAX9VbI9t&_nc_ht=scontent-bom1-1.xx&oh=00_AfCWx72Ka_vSct2Y9uIIrzb3cuHBzM9pK7ikaTBRebqlMQ&oe=65F1B8F1",
        type: "image",
    },
    {
        url: "https://scontent-bom1-1.xx.fbcdn.net/v/t1.18169-9/25552224_2023686167646766_6210370870192898540_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=8YD3D0I4a3cAX8O5G9X&_nc_oc=AQnwOqwBJWZGVW6b48tU6qUC72j-jIqAr3g6bZYNdO8aNeMtNR0En9QB-CR9nUMibzeQ1yAGyjEvjl1jgl6JwORR&_nc_ht=scontent-bom1-1.xx&oh=00_AfAJQeBx1uAcmOOsoMJqSlPGsny_wcSR0hODupZMTdxl1g&oe=65F1BDD9",
        type: "image",
    },
    {
        url: "https://scontent-bom2-1.xx.fbcdn.net/v/t39.30808-6/241319600_5021805101168176_8698694858411083470_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=xetJL6oqkikAX_yNGG6&_nc_ht=scontent-bom2-1.xx&oh=00_AfBD36HDEa0ON11KNrPmYZQmmqTQoFpNlRwwt69JiktteA&oe=65CFB924",
        type: "image",
    },
    {
        url: "https://scontent-bom2-1.xx.fbcdn.net/v/t39.30808-6/423240264_685405933785011_2156868312315752315_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=3635dc&_nc_ohc=ksB8sbnXYaMAX_8E5EJ&_nc_ht=scontent-bom2-1.xx&oh=00_AfAxCbDDpNSL8GetzpL1LJ4F5ulNtXKMS0FGLxuMxWH4xA&oe=65CE5CDA",
        type: "image",
    },
    {
        url: "https://scontent-bom1-2.xx.fbcdn.net/v/t39.30808-6/423237179_685416523783952_3822731738507096987_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=3635dc&_nc_ohc=rYjqyyQwYnQAX-IA9aH&_nc_ht=scontent-bom1-2.xx&oh=00_AfBhSM8ZoeJJs8MvgQgDwUczMItetW2ofUVqATzr2cHx2A&oe=65CEF3CA",
        type: "image",
    },
    {
        url: "https://lh3.ggpht.com/p/AF1QipNGlrr0Hp9q0ez4mYUqtCsxH_HK7oTU1SwDyY0U=s1536",
        title: "Megha Kumari",
        author: "@Bharti Vidyapeeth",
        type: "image",
    },
    {
        url: "https://lh3.ggpht.com/p/AF1QipNuD7Kz7n0Mvl0BuN2xjGQa-u2Mew8UqbjnYzzU=s1536",
        type: "image",
    },
    {
        url: "https://lh3.ggpht.com/p/AF1QipNkF4eWq9UidYcqpcbaQcSV_D8h3ob4ybgdKyRO=s4096",
        title: "unnamed",
        author: "@Bharti Vidyapeeth",
        type: "image",
    },
    {
        url: "https://lh3.ggpht.com/p/AF1QipOfjfD2Z9ZcQWhjN88AESx5ApmS8psVqBUVol1s=s1536",
        type: "image",
    },
    {
        url: "https://lh3.ggpht.com/p/AF1QipOmh3mv3Fv0cXvJjgKRJYfo0lUIsjwyD9H5Hy0e=s1024",
        type: "image",
    },
    {
        url: "https://lh3.ggpht.com/p/AF1QipPVufPiKADffDc1toFkMf3nrZvcrMk3gKNhtyzT=s1536",
        type: "image",
    },
    {
        url: "https://lh3.ggpht.com/p/AF1QipOyAbYI8Mk9oA-tVgW0yDip8sgsjtawTh88NSpZ=s1536",
        type: "image",
        rotation: 90,
    },
    {
        url: "https://lh3.ggpht.com/p/AF1QipP2TkwgMMYFOKZNfek8KBx4CQOgEadCVNvc5HXi=s1536",
        type: "image",
    },
    // {
    //     url: "https://lh3.ggpht.com/p/AF1QipMtbbZoayM6A8a8VTf4YUeVWRErFEJKIbQBrCm2=s1536",
    //     title: "Unnamed",
    //     author: "@Bharti Vidyapeeth",
    // type: "image",
    // },
];
