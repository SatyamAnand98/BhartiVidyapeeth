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

export default function Gallery() {
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
    }, [inView, selectedItem, videoRef]);

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

    // const downloadVideo = (videoUrl) => {
    //     fetch(videoUrl)
    //         .then((response) => response.blob())
    //         .then((blob) => {
    //             const link = document.createElement("a");
    //             link.href = window.URL.createObjectURL(blob);
    //             link.download = "bvpVideo";
    //             link.click();
    //         })
    //         .catch((error) => console.error("Error downloading video:", error));
    // };

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
                                {/* <img src={item.thumbnail} alt={item.title} /> */}
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
    align-items: center;
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
        url: "https://lh3.ggpht.com/p/AF1QipN834kKFs18kc4aQYPWqJPET6zF0dyCWg78m2CI=s1024",
        title: "Happy Teacher",
        author: "@Bharti Vidyapeeth",
        type: "image",
    },
    {
        url: "https://scontent-bom2-1.xx.fbcdn.net/v/t39.30808-6/423235899_685413137117624_3050559384930784372_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=3635dc&_nc_ohc=TRQRjeA4pSkAX84Swgn&_nc_ht=scontent-bom2-1.xx&oh=00_AfC5_WhLAN0fcAiKqE8SO95lnje1vZsPfkN2nwWFc8yQyw&oe=65CF05A8",
        title: "Picnic 29-Jan-2024",
        type: "image",
    },
    {
        url: "https://scontent-bom2-1.xx.fbcdn.net/v/t39.30808-6/423235736_685413443784260_3728842979385329283_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=3635dc&_nc_ohc=eie-Z-RDJr4AX-D00ba&_nc_ht=scontent-bom2-1.xx&oh=00_AfCcAHE7-nOtP4Q11MAo2c3eaN1DR1RWrZl9mt49CzSh6w&oe=65CF3CAA",
        title: "Picnic 29-Jan-2024",
        type: "image",
    },
    {
        url: "https://scontent-bom2-1.xx.fbcdn.net/v/t39.30808-6/423236666_685413270450944_5876442034908703307_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=3635dc&_nc_ohc=GoFd6qz_JIkAX-4cfBS&_nc_ht=scontent-bom2-1.xx&oh=00_AfBewcIRpSep01zoSt96wL5NoIKT7a3FOptoacZsfwF4cg&oe=65CF9EE8",
        title: "Picnic 29-Jan-2024",
        type: "image",
    },
    {
        url: "https://scontent-bom1-1.xx.fbcdn.net/v/t39.30808-6/423247519_685413193784285_5615562360686577331_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=3635dc&_nc_ohc=fAx7YCaKyxcAX87I3Ad&_nc_ht=scontent-bom1-1.xx&oh=00_AfCIBC2SHj_RLlBacjkSdXEC83rEW2KQgoZjmN8RjzST5Q&oe=65CF821E",
        title: "Picnic 29-Jan-2024",
        type: "image",
    },
    {
        url: "https://scontent-bom1-1.xx.fbcdn.net/v/t39.30808-6/423131728_685413173784287_1449760186751538562_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=3635dc&_nc_ohc=3YA_3vCJ3KQAX9L4fiV&_nc_oc=AQm73FQ_4TeS8qcSEx3PA_BLHcb2DExQT2lRPuWzFI3Mzk6c-Y9W9bX-srwl4rYMuuae-nlxZqaW15bTVAJWPwKg&_nc_ht=scontent-bom1-1.xx&oh=00_AfBF-Cc9HDSRy_qVh0-hSGfNk39Ic_LwHS9NzhFA-ZS4Pg&oe=65D01DB3",
        title: "Picnic 29-Jan-2024",
        type: "image",
    },
    {
        url: "https://scontent-bom2-1.xx.fbcdn.net/v/t39.30808-6/423236971_685413393784265_7239858459166875193_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=3635dc&_nc_ohc=kI0qfbjrBXcAX-egQpx&_nc_ht=scontent-bom2-1.xx&oh=00_AfBeh2foIexYeRHCQoIAjv5OWxPNgez-K0crHWsjQ310QQ&oe=65CF2517",
        title: "Picnic 29-Jan-2024",
        type: "image",
    },
    {
        url: "https://scontent-bom2-2.xx.fbcdn.net/v/t39.30808-6/423240052_685413097117628_4372121355381796103_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=3635dc&_nc_ohc=kPB8PQF3GMQAX9ItuAI&_nc_ht=scontent-bom2-2.xx&oh=00_AfDr3vWuENibgFzXDTOHO1_M82odnehoTW7ZodSHLdUcNg&oe=65CF33DF",
        title: "Picnic 29-Jan-2024",
        type: "image",
    },
    {
        url: "https://scontent-bom1-1.xx.fbcdn.net/v/t1.6435-9/64586996_2824293727586002_7086783677207674880_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=ZPhJp6fAauYAX-14r_P&_nc_ht=scontent-bom1-1.xx&oh=00_AfDXllNi_W9cML-oH0bGxRF_zJhDZCfk2WHBbXMAwAkTzA&oe=65F1A172",
        type: "image",
    },
    {
        url: "https://scontent-bom1-1.xx.fbcdn.net/v/t1.6435-9/64635249_2824293174252724_3555540842942824448_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=Cidg3QXqMtkAX9MhVKI&_nc_ht=scontent-bom1-1.xx&oh=00_AfDm6KHkgjsLbNU5mUqYtkc03PpKOZxksuhfUYIjdvmyKg&oe=65F1A458",
        type: "image",
    },
    {
        url: "https://scontent-bom1-1.xx.fbcdn.net/v/t1.6435-9/64761984_2824292540919454_3305139580956573696_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=SwXPiW_6f3cAX_pQO0w&_nc_ht=scontent-bom1-1.xx&oh=00_AfDzcDEWaYIiy0pVzkxrWBrzjtVSMbD2c8nmRAvu-ZWq6g&oe=65F1A792",
        type: "image",
    },
    {
        url: "https://scontent-bom2-1.xx.fbcdn.net/v/t1.18169-9/26992369_2064582656890450_7964322604234725660_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=YvZdH0biBTMAX-TZ4Ej&_nc_ht=scontent-bom2-1.xx&oh=00_AfAOkzEphDJRaG12ycLvnb0te6YL5x2MvbGJeZiA-hHTRg&oe=65F1A328",
        type: "image",
    },
    {
        url: "https://scontent-bom1-1.xx.fbcdn.net/v/t1.18169-9/27332595_2064582253557157_5912391752118352472_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=R6ndptYvoj0AX8lBqj-&_nc_ht=scontent-bom1-1.xx&oh=00_AfCMstY57i0WXIxfmDa26WBOhlEebNeX9vF-rQC7tBBKOg&oe=65F1AC3C",
        type: "image",
    },
    {
        url: "https://lh5.googleusercontent.com/p/AF1QipPurcaLAFCFYsxvdvn8AJceAKf7DOHw6secjlyO=s1024",
        title: "Rangoli November 2021",
        author: "@Bharti Vidyapeeth",
        type: "image",
    },
    {
        url: "https://lh3.ggpht.com/p/AF1QipMqOL9p8VHCnIBcvr4370uBpKqxf31J0Z0nFGDl=s1024",
        title: "Dentist May 2022",
        author: "@Bharti Vidyapeeth",
        type: "image",
    },
    {
        url: "https://lh3.ggpht.com/p/AF1QipNd9tAvQ9xtX0jHm2JsfYNg1z4oKEOm-yW9FmpB=s1024",
        title: "Dentist May 2022",
        author: "@Bharti Vidyapeeth",
        type: "image",
    },
    {
        url: "https://lh3.ggpht.com/p/AF1QipN9APNFD-CD_0j85Ppw9sel9WYZrylA2f5ZvGhJ=s1024",
        title: "Eye Checkup",
        author: "@Bharti Vidyapeeth",
        type: "image",
    },
    {
        url: "https://lh3.ggpht.com/p/AF1QipNQOQs3XaRXJIRdStAXs516i_VUh5dKOwMZaTXc=s1024",
        type: "image",
    },
    {
        url: "https://lh3.ggpht.com/p/AF1QipOjnxGFon5d-aO6oLl2cP-LiHokpa4hm-nSuOym=s1024",
        type: "image",
    },
    {
        url: "https://lh3.ggpht.com/p/AF1QipOgc1zPN6KCu7Ex1KUre1121ZcfBf-wxxHYhMrP=s1024",
        type: "image",
    },

    // Achievements
    /**
    {
        url: "https://lh3.ggpht.com/p/AF1QipNGlrr0Hp9q0ez4mYUqtCsxH_HK7oTU1SwDyY0U=s1024",
        title: "Megha Kumari",
        author: "@Bharti Vidyapeeth",
        type: "image",
    },
    {
        url: "https://lh3.ggpht.com/p/AF1QipNkF4eWq9UidYcqpcbaQcSV_D8h3ob4ybgdKyRO=s4096",
        title: "unnamed",
        author: "@Bharti Vidyapeeth",
        type: "image",
    },
    {
        url: "https://lh3.ggpht.com/p/AF1QipNuD7Kz7n0Mvl0BuN2xjGQa-u2Mew8UqbjnYzzU=s1536",
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
        url: "https://lh3.ggpht.com/p/AF1QipOyAbYI8Mk9oA-tVgW0yDip8sgsjtawTh88NSpZ=s1536",
        rotation: 90,
        type: "image",
    },
    {
        url: "https://lh3.ggpht.com/p/AF1QipP2TkwgMMYFOKZNfek8KBx4CQOgEadCVNvc5HXi=s1536",
        type: "image",
    },
    {
        url: "https://lh3.ggpht.com/p/AF1QipPVufPiKADffDc1toFkMf3nrZvcrMk3gKNhtyzT=s1536",
        type: "image",
    },
    */
    {
        url: "https://lh3.googleusercontent.com/ggms/AF1QipM7Nownxp05oKATQAHSY5iKpXeRjfhpq4WqIzJZ=m18?cpn=1S7FKcb9K6-MszFb&c=WEB_EMBEDDED_PLAYER&cver=20210923",
        // img: "https://lh3.googleusercontent.com/ggms/AF1QipM7Nownxp05oKATQAHSY5iKpXeRjfhpq4WqIzJZ=m18?cpn=1S7FKcb9K6-MszFb",
        // img: "https://lh5.googleusercontent.com/p/AF1QipM7Nownxp05oKATQAHSY5iKpXeRjfhpq4WqIzJZ=w408-h725-k-no"
        thumbnail:
            "https://lh5.googleusercontent.com/p/AF1QipM7Nownxp05oKATQAHSY5iKpXeRjfhpq4WqIzJZ=w529-k-no",
        title: "January 2022",
        author: "@Bharti Vidyapeeth",
        type: "video",
    },
    {
        url: "https://lh3.googleusercontent.com/ggs/AF1QipP4QXd81pUyYADrY20A7ozgk9mUpFauoq4c7gxp=m18?cpn=EqvHi_u65wV-dxdE&c=WEB_EMBEDDED_PLAYER&cver=20210923",
        thumbnail:
            "https://lh5.googleusercontent.com/p/AF1QipP4QXd81pUyYADrY20A7ozgk9mUpFauoq4c7gxp=w529-h298-k-no",
        title: "15 August 2023",
        author: "@Bharti Vidyapeeth",
        type: "video",
    },
    {
        url: "https://lh3.googleusercontent.com/ggs/AF1QipPQLD0BO0Tk3mZU9o-8hPfIqbMYLxkc7llJXbpf=m18?cpn=04M25QAL9Yg7C6Fe&c=WEB_EMBEDDED_PLAYER&cver=20210923",
        thumbnail:
            "https://lh5.googleusercontent.com/p/AF1QipPAPhmKGTx4gY8sBnPH4mjLygkDCcGNvXN7ELYR=w529-k-no",
        title: "January 2022",
        author: "@Bharti Vidyapeeth",
        type: "video",
    },
];
