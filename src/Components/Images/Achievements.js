import { useState } from "react";
import {
    ImageList,
    ImageListItem,
    Dialog,
    DialogContent,
    IconButton,
    Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CloseIcon from "@mui/icons-material/Close";
import GetAppIcon from "@mui/icons-material/GetApp";

export default function Achievements() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [selectedImage, setSelectedImage] = useState(null);

    const openImageDialog = (img) => {
        setSelectedImage(img);
    };

    const closeImageDialog = () => {
        setSelectedImage(null);
    };

    const downloadImage = () => {
        if (selectedImage) {
            const link = document.createElement("a");
            link.href = selectedImage;
            link.target = "_blank";
            link.download = "image.jpg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
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
                    <ImageListItem key={item.img}>
                        <img
                            srcSet={`${item.img}`}
                            src={`${item.img}`}
                            alt={item.title}
                            loading="lazy"
                            style={{
                                objectFit: "contain",
                                width: "100%",
                                height: "100%",
                            }}
                            onClick={() => openImageDialog(item.img)}
                        />
                    </ImageListItem>
                ))}
                {videoData.map((item) => (
                    <ImageListItem
                        key={item.vid}
                        cols={item.cols}
                        rows={item.rows}
                        style={{ width: "100%", height: "100%" }}
                    >
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            src={item.vid}
                            alt={item.title}
                            loading="lazy"
                            style={{
                                objectFit: "contain",
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>

            <Dialog
                open={!!selectedImage}
                onClose={closeImageDialog}
                maxWidth="lg" // Set the maxWidth property to 'lg' for a larger width
            >
                <DialogContent sx={{ padding: 0 }}>
                    <img
                        src={selectedImage}
                        alt="Enlarged"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                        }}
                    />
                    <IconButton
                        sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            color: "white",
                        }}
                        onClick={closeImageDialog}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Button
                        className="ApplyNow"
                        variant="contained"
                        startIcon={<GetAppIcon />}
                        onClick={downloadImage}
                        sx={{
                            position: "absolute",
                            bottom: 16,
                            right: 16,
                        }}
                    >
                        Download
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
}

const itemData = [
    {
        img: "https://lh3.ggpht.com/p/AF1QipNGlrr0Hp9q0ez4mYUqtCsxH_HK7oTU1SwDyY0U=s1536",
        title: "Megha Kumari",
        author: "@Bharti Vidyapeeth",
    },
    {
        img: "https://lh3.ggpht.com/p/AF1QipNuD7Kz7n0Mvl0BuN2xjGQa-u2Mew8UqbjnYzzU=s1536",
    },
    {
        img: "https://lh3.ggpht.com/p/AF1QipNkF4eWq9UidYcqpcbaQcSV_D8h3ob4ybgdKyRO=s4096",
        title: "unnamed",
        author: "@Bharti Vidyapeeth",
    },
    {
        img: "https://lh3.ggpht.com/p/AF1QipOfjfD2Z9ZcQWhjN88AESx5ApmS8psVqBUVol1s=s1536",
    },
    {
        img: "https://lh3.ggpht.com/p/AF1QipOmh3mv3Fv0cXvJjgKRJYfo0lUIsjwyD9H5Hy0e=s1024",
    },
    {
        img: "https://lh3.ggpht.com/p/AF1QipPVufPiKADffDc1toFkMf3nrZvcrMk3gKNhtyzT=s1536",
    },
    {
        img: "https://lh3.ggpht.com/p/AF1QipOyAbYI8Mk9oA-tVgW0yDip8sgsjtawTh88NSpZ=s1536",
        rotation: 90,
    },
    {
        img: "https://lh3.ggpht.com/p/AF1QipP2TkwgMMYFOKZNfek8KBx4CQOgEadCVNvc5HXi=s1536",
    },
    {
        img: "https://lh3.ggpht.com/p/AF1QipMtbbZoayM6A8a8VTf4YUeVWRErFEJKIbQBrCm2=s1536",
        title: "Unnamed",
        author: "@Bharti Vidyapeeth",
    },
];

const videoData = [];
