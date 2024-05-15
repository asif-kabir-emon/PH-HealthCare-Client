// export const modifyPayload = (values: any) => {
//     const file = values.file ? values.file : null;
//     const data = values.data ? JSON.stringify(values.data) : null;
//     const formData = new FormData();
//     if (data) {
//         formData.append("data", data);
//     }
//     if (file) {
//         formData.append("file", file as Blob);
//     }

//     return formData;
// };

export const modifyPayload = (values: any) => {
    const obj = { ...values };
    const file = obj["file"];
    delete obj["file"];
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("data", data);
    formData.append("file", file as Blob);

    return formData;
};
