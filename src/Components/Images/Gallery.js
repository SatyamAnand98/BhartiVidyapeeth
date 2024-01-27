import {
    ImageList,
    ImageListItem,
    ImageListItemBar,
    ListSubheader,
    IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Gallery() {
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
        img: "https://lh3.ggpht.com/p/AF1QipN834kKFs18kc4aQYPWqJPET6zF0dyCWg78m2CI=s1536",
        title: "Happy Teacher",
        author: "@Bharti Vidyapeeth",
    },
    {
        img: "https://lh5.googleusercontent.com/p/AF1QipPurcaLAFCFYsxvdvn8AJceAKf7DOHw6secjlyO=s1536",
        title: "Rangoli November 2021",
        author: "@Bharti Vidyapeeth",
    },
    {
        img: "https://lh3.ggpht.com/p/AF1QipMqOL9p8VHCnIBcvr4370uBpKqxf31J0Z0nFGDl=s1536",
        title: "Dentist May 2022",
        author: "@Bharti Vidyapeeth",
    },
    {
        img: "https://lh3.ggpht.com/p/AF1QipNd9tAvQ9xtX0jHm2JsfYNg1z4oKEOm-yW9FmpB=s1536",
        title: "Dentist May 2022",
        author: "@Bharti Vidyapeeth",
    },
    {
        img: "https://lh3.ggpht.com/p/AF1QipN9APNFD-CD_0j85Ppw9sel9WYZrylA2f5ZvGhJ=s1536",
        title: "Eye Checkup",
        author: "@Bharti Vidyapeeth",
    },
    {
        img: "https://lh3.ggpht.com/p/AF1QipNQOQs3XaRXJIRdStAXs516i_VUh5dKOwMZaTXc=s1536",
    },
    {
        img: "https://lh3.ggpht.com/p/AF1QipOjnxGFon5d-aO6oLl2cP-LiHokpa4hm-nSuOym=s1024",
    },
    {
        img: "https://lh3.ggpht.com/p/AF1QipOgc1zPN6KCu7Ex1KUre1121ZcfBf-wxxHYhMrP=s1536",
    },

    // Achievements
    {
        img: "https://lh3.ggpht.com/p/AF1QipNGlrr0Hp9q0ez4mYUqtCsxH_HK7oTU1SwDyY0U=s1536",
        title: "Megha Kumari",
        author: "@Bharti Vidyapeeth",
    },
    {
        img: "https://lh3.ggpht.com/p/AF1QipMtbbZoayM6A8a8VTf4YUeVWRErFEJKIbQBrCm2=s1536",
        title: "Unnamed",
        author: "@Bharti Vidyapeeth",
    },
    {
        img: "https://lh3.ggpht.com/p/AF1QipNkF4eWq9UidYcqpcbaQcSV_D8h3ob4ybgdKyRO=s4096",
        title: "unnamed",
        author: "@Bharti Vidyapeeth",
    },
    {
        img: "https://lh3.ggpht.com/p/AF1QipNuD7Kz7n0Mvl0BuN2xjGQa-u2Mew8UqbjnYzzU=s1536",
    },
    {
        img: "https://lh3.ggpht.com/p/AF1QipOfjfD2Z9ZcQWhjN88AESx5ApmS8psVqBUVol1s=s1536",
    },
    {
        img: "https://lh3.ggpht.com/p/AF1QipOmh3mv3Fv0cXvJjgKRJYfo0lUIsjwyD9H5Hy0e=s1024",
    },
    {
        img: "https://lh3.ggpht.com/p/AF1QipOyAbYI8Mk9oA-tVgW0yDip8sgsjtawTh88NSpZ=s1536",
        rotation: 90,
    },
    {
        img: "https://lh3.ggpht.com/p/AF1QipP2TkwgMMYFOKZNfek8KBx4CQOgEadCVNvc5HXi=s1536",
    },
    {
        img: "https://lh3.ggpht.com/p/AF1QipPVufPiKADffDc1toFkMf3nrZvcrMk3gKNhtyzT=s1536",
    },
];

const videoData = [
    {
        vid: "https://lh3.googleusercontent.com/ggms/AF1QipM7Nownxp05oKATQAHSY5iKpXeRjfhpq4WqIzJZ=m18?cpn=1S7FKcb9K6-MszFb&c=WEB_EMBEDDED_PLAYER&cver=20210923",
        // img: "https://lh3.googleusercontent.com/ggms/AF1QipM7Nownxp05oKATQAHSY5iKpXeRjfhpq4WqIzJZ=m18?cpn=1S7FKcb9K6-MszFb",
        // img: "https://lh5.googleusercontent.com/p/AF1QipM7Nownxp05oKATQAHSY5iKpXeRjfhpq4WqIzJZ=w408-h725-k-no"
        title: "January 2022",
        author: "@Bharti Vidyapeeth",
    },
    {
        vid: "https://lh3.googleusercontent.com/ggs/AF1QipP4QXd81pUyYADrY20A7ozgk9mUpFauoq4c7gxp=m18?cpn=EqvHi_u65wV-dxdE&c=WEB_EMBEDDED_PLAYER&cver=20210923",
        title: "15 August 2023",
        author: "@Bharti Vidyapeeth",
    },
    {
        vid: "https://lh3.googleusercontent.com/ggs/AF1QipPQLD0BO0Tk3mZU9o-8hPfIqbMYLxkc7llJXbpf=m18?cpn=04M25QAL9Yg7C6Fe&c=WEB_EMBEDDED_PLAYER&cver=20210923",
        title: "January 2022",
        author: "@Bharti Vidyapeeth",
    },
];
