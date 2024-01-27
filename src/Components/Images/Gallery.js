import { useState, useRef, useEffect } from "react";
import {
    ImageList,
    ImageListItem,
    Dialog,
    DialogContent,
    IconButton,
    Button,
    ListSubheader,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CloseIcon from "@mui/icons-material/Close";
import GetAppIcon from "@mui/icons-material/GetApp";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useInView } from "react-intersection-observer";

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

    const downloadItem = () => {
        if (selectedItem) {
            const link = document.createElement("a");
            link.href = selectedItem.url;
            link.target = "_blank";
            link.download = "file";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handlePlayPause = () => {
        if (selectedItem?.type === "video") {
            if (playing) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setPlaying(!playing);
        }
    };

    const handleMuteUnmute = () => {
        if (selectedItem?.type === "video") {
            videoRef.current.muted = !muted;
            setMuted(!muted);
        }
    };

    return (
        <>
            <ImageList
                sx={{
                    width: isSmallScreen ? "100vw" : "70vw",
                    height: "100vh",
                    marginLeft: isSmallScreen ? "0" : "15vw",
                    marginRight: isSmallScreen ? "0" : "15vw",
                    borderRight: "2px solid black",
                    borderLeft: "2px solid black",
                }}
                transform="translateZ(0)"
            >
                {itemData.map((item) => (
                    <ImageListItem key={item.url}>
                        {item.type === "image" && (
                            <img
                                src={item.url}
                                alt={item.title}
                                loading="lazy"
                                style={{
                                    objectFit: "contain",
                                    width: "100%",
                                    height: "100%",
                                    cursor: "pointer",
                                }}
                                onClick={() => openDialog(item)}
                            />
                        )}
                        {item.type === "video" && (
                            <>
                                <div
                                    onClick={() => {
                                        setPlaying(!playing);
                                        openDialog(item);
                                    }}
                                    style={{
                                        cursor: "pointer",
                                        position: "relative",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                >
                                    <video
                                        ref={setVideoRef}
                                        preload="metadata"
                                        loop
                                        playsInline
                                        src={item.url}
                                        alt={item.title}
                                        loading="lazy"
                                        style={{
                                            objectFit: "cover",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                    {!playing && (
                                        <>
                                            <img
                                                src={item.thumbnail}
                                                loading="lazy"
                                                style={{
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                            {/* Play button SVG */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="64"
                                                height="64"
                                                viewBox="0 0 64 64"
                                                style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    left: "50%",
                                                    transform:
                                                        "translate(-50%, -50%)",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                    setPlaying(!playing);
                                                    openDialog(item);
                                                }}
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
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                        {/* {item.type === "video" && (
                            <ListSubheader
                                component="div"
                                sx={{
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    color: "white",
                                    textAlign: "center",
                                }}
                            >
                                {item.title}
                            </ListSubheader>
                        )} */}
                    </ImageListItem>
                ))}
                <div ref={ref}></div>
            </ImageList>

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
                    {selectedItem && (
                        <Button
                            className="ApplyNow"
                            variant="contained"
                            startIcon={<GetAppIcon />}
                            onClick={downloadItem}
                            sx={{
                                position: "absolute",
                                bottom: 16,
                                left: 16,
                            }}
                        >
                            Download
                        </Button>
                    )}
                    {selectedItem?.type === "video" && (
                        <>
                            <IconButton
                                sx={{
                                    position: "absolute",
                                    bottom: 16,
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    color: "white",
                                }}
                                onClick={handleMuteUnmute}
                            >
                                {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                            </IconButton>
                            <IconButton
                                sx={{
                                    position: "absolute",
                                    bottom: 16,
                                    left: "60%",
                                    transform: "translateX(-50%)",
                                    color: "white",
                                }}
                                onClick={handlePlayPause}
                            >
                                {playing ? <PauseIcon /> : <PlayArrowIcon />}
                            </IconButton>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

const itemData = [
    {
        url: "https://lh3.ggpht.com/p/AF1QipN834kKFs18kc4aQYPWqJPET6zF0dyCWg78m2CI=s1536",
        title: "Happy Teacher",
        author: "@Bharti Vidyapeeth",
        type: "image",
    },
    {
        url: "https://lh5.googleusercontent.com/p/AF1QipPurcaLAFCFYsxvdvn8AJceAKf7DOHw6secjlyO=s1536",
        title: "Rangoli November 2021",
        author: "@Bharti Vidyapeeth",
        type: "image",
    },
    {
        url: "https://lh3.ggpht.com/p/AF1QipMqOL9p8VHCnIBcvr4370uBpKqxf31J0Z0nFGDl=s1536",
        title: "Dentist May 2022",
        author: "@Bharti Vidyapeeth",
        type: "image",
    },
    {
        url: "https://lh3.ggpht.com/p/AF1QipNd9tAvQ9xtX0jHm2JsfYNg1z4oKEOm-yW9FmpB=s1536",
        title: "Dentist May 2022",
        author: "@Bharti Vidyapeeth",
        type: "image",
    },
    {
        url: "https://lh3.ggpht.com/p/AF1QipN9APNFD-CD_0j85Ppw9sel9WYZrylA2f5ZvGhJ=s1536",
        title: "Eye Checkup",
        author: "@Bharti Vidyapeeth",
        type: "image",
    },
    {
        url: "https://lh3.ggpht.com/p/AF1QipNQOQs3XaRXJIRdStAXs516i_VUh5dKOwMZaTXc=s1536",
        type: "image",
    },
    {
        url: "https://lh3.ggpht.com/p/AF1QipOjnxGFon5d-aO6oLl2cP-LiHokpa4hm-nSuOym=s1024",
        type: "image",
    },
    {
        url: "https://lh3.ggpht.com/p/AF1QipOgc1zPN6KCu7Ex1KUre1121ZcfBf-wxxHYhMrP=s1536",
        type: "image",
    },

    // Achievements
    {
        url: "https://lh3.ggpht.com/p/AF1QipNGlrr0Hp9q0ez4mYUqtCsxH_HK7oTU1SwDyY0U=s1536",
        title: "Megha Kumari",
        author: "@Bharti Vidyapeeth",
        type: "image",
    },
    {
        url: "https://lh3.ggpht.com/p/AF1QipMtbbZoayM6A8a8VTf4YUeVWRErFEJKIbQBrCm2=s1536",
        title: "Unnamed",
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
    {
        url: "https://lh3.googleusercontent.com/ggms/AF1QipM7Nownxp05oKATQAHSY5iKpXeRjfhpq4WqIzJZ=m18?cpn=1S7FKcb9K6-MszFb&c=WEB_EMBEDDED_PLAYER&cver=20210923",
        // img: "https://lh3.googleusercontent.com/ggms/AF1QipM7Nownxp05oKATQAHSY5iKpXeRjfhpq4WqIzJZ=m18?cpn=1S7FKcb9K6-MszFb",
        // img: "https://lh5.googleusercontent.com/p/AF1QipM7Nownxp05oKATQAHSY5iKpXeRjfhpq4WqIzJZ=w408-h725-k-no"
        thumbnail:
            "https://lh5.googleusercontent.com/p/AF1QipM7Nownxp05oKATQAHSY5iKpXeRjfhpq4WqIzJZ=w408-h725-k-no",
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
            "https://lh5.googleusercontent.com/p/AF1QipPAPhmKGTx4gY8sBnPH4mjLygkDCcGNvXN7ELYR=w203-h360-k-no",
        title: "January 2022",
        author: "@Bharti Vidyapeeth",
        type: "video",
    },
];
