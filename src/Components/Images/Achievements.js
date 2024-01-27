import {
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Achievements() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <ImageList
            sx={{
                width: isSmallScreen ? "100vw" : "70vw",
                height: "100vh",
                marginLeft: isSmallScreen ? "0" : "15vw",
                marginRight: isSmallScreen ? "0" : "15vw",
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
                            objectFit: "contain", // Adjusted to use cover instead of scale-down
                            width: "100%",
                            height: "100%",
                        }}
                    />
                    {/* <ImageListItemBar
                        sx={{
                            background:
                                "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                                "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                        }}
                        title={item.title}
                        position="top"
                        actionIcon={
                            <IconButton
                                sx={{ color: "white" }}
                                aria-label={`star ${item.title}`}
                            ></IconButton>
                        }
                        actionPosition="left"
                    /> */}
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
                            objectFit: "contain", // Adjusted to use cover instead of scale-down
                            width: "100%",
                            height: "100%",
                        }}
                    />
                    {/* <ImageListItemBar
                        title={item.title}
                        subtitle={item.author}
                        actionIcon={
                            <IconButton
                                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                                aria-label={`info about ${item.title}`}
                            >
                                <InfoIcon />
                            </IconButton>
                        }
                    /> */}
                </ImageListItem>
            ))}
        </ImageList>
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
