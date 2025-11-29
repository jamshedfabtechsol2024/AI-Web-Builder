import client from "./client";

export const imageS3API = {
  uploadProfileImage: async (file) => {
    const formData = new FormData();
    formData.append("profile_image", file);

    const { data } = await client.post("auth/upload-image/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return data;
  },
};
