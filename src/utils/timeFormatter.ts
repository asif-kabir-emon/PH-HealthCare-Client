const timeFormatter = (time: string) => {
    const date = new Date(time);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const formattedTime = `${hours}:${minutes}`;

    return formattedTime;
};

export default timeFormatter;
