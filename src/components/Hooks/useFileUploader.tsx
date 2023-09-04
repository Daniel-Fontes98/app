import { type ChangeEvent, useState } from "react";

const useFileUploader = () => {
  const [fileState, setFileState] = useState<File | null>(null);

  const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (!fileInput.files) {
      alert("No file was chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      alert("Files list is empty");
      return;
    }

    const file = fileInput.files[0];
    console.log(file);
    if (!file) {
      return;
    }

    /** File validation */
    if (
      !file.type.startsWith("application/pdf") &&
      !file.type.startsWith("image/jpeg")
    ) {
      alert("Por favor seleciona um ficheiro pdf ou jpeg");
      return;
    }

    /** Setting file state */
    setFileState(file); // we will use the file state, to send it later to the server
  };

  const onUploadFile = async () => {
    if (!fileState) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("media", fileState);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const {
        data,
        error,
      }: {
        data: {
          url: string | string[];
        } | null;
        error: string | null;
      } = await res.json();

      if (error || !data) {
        alert(error || "Sorry! something went wrong.");
        return;
      }
      return data.url;
    } catch (error) {
      console.error(error);
      alert("Sorry! Something went wrong");
    }
  };

  return { onFileUploadChange, onUploadFile };
};

export default useFileUploader;
