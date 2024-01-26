const url =
    "https://www.google.com/maps/rpc/photo/listentityphotos?authuser=0&hl=en&gl=in&pb=!1e2!3m3!1s0x39f116308cb7f837%3A0xfef3fe9d6d2d453a!9e0!11s%2Fg%2F11bysjytjb!5m50!2m2!1i203!2i100!3m2!2i20!5b1!7m42!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e9!2b1!3e2!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e10!2b0!3e4!2b1!4b1!9b0!6m3!1shpmzZZmTAuCOseMPiL2KoAg!7e81!15i16698!16m4!1m1!1BCgIgARICGAI!2b1!4e1";

fetch(url)
    .then((response) => response.text())
    .then((data) => {
        // Remove the ")]}'" prefix and parse the remaining JSON data
        const jsonData = JSON.parse(data.substring(4));

        // Extract URLs from the nested structure
        const urls = jsonData[0][0].map((item) => item[6][1]);

        // Log or use the URLs as needed
        console.log(urls);
    })
    .catch((error) => console.error("Error fetching data:", error));
