import * as Clipboard from "expo-clipboard";

export const share = () => {
    Share.share({
        message: image,
        title: "Check out this photo",
        url: image,
    });
};

export const copyToClipboard = () => {
    Clipboard.setString(image);
    alert("Copied image URL to clipboard");
};