import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import * as MUI from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Images({ updateProductData }) {
  const [coverImages, setCoverImages] = useState([]);
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    const remainingSlots = 5 - coverImages.length;
    const filesToAdd = acceptedFiles.slice(0, remainingSlots);
    setFiles(files.concat(filesToAdd));
    updateProductData("images", [...files, ...filesToAdd]);

    filesToAdd.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        setCoverImages((prevImages) => [...prevImages, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    onDrop: onDrop,
  });

  return (
    <>
      {coverImages?.length > 0 ? (
        <MUI.Box className="flex flex-row gap-5 relative">
          {coverImages.map((image, index) => (
            <MUI.Box key={index} className="relative">
              <img
                src={image}
                className="w-20 h-20 object-cover rounded-lg"
                alt=""
              />
              <MUI.IconButton
                size="small"
                className="absolute bg-neutral-700 p-0 dark:bg-neutral-800 dark:hover:bg-red-500 text-white hover:bg-red-500 rounded-full border-solid border-2 border-white"
                sx={{ top: -10, right: -10 }}
                onClick={() => {
                  setCoverImages(coverImages.filter((_, i) => i !== index));
                  updateProductData(
                    "images",
                    files.filter((_, i) => i !== index)
                  );
                }}
              >
                <CloseIcon fontSize="small" />
              </MUI.IconButton>
            </MUI.Box>
          ))}
          {coverImages.length < 5 && (
            <MUI.Box
              {...getRootProps()}
              className={`w-20 h-20 dark:text-white border-dashed dark:border-neutral-400 rounded-lg dark:hover:border-white border-2  flex flex-row items-center justify-center cursor-pointer order-2 ${
                isDragActive ? "bg-neutral-700" : ""
              } `}
            >
              <AddIcon />
              <input
                type="file"
                multiple
                {...getInputProps()}
                id="addMoreImages"
                onChange={(e) => onDrop(e.target.files)}
                className="hidden"
              />
            </MUI.Box>
          )}
          <MUI.Typography className="absolute bottom-0 right-0 dark:text-white text-sm font-semibold">
            {coverImages.length}/5
          </MUI.Typography>
        </MUI.Box>
      ) : (
        <MUI.Box
          className={`flex flex-row relative items-center justify-center w-full border-neutral-400 border-dashed bg-neutral-600 rounded-lg p-5 hover:border-white hover:bg-neutral-700 ${
            isDragActive ? "bg-neutral-700" : ""
          } border-2 min-h-[300px] `}
        >
          <MUI.Box
            {...getRootProps()}
            className="absolute w-full flex-col h-full flex items-center justify-center cursor-pointer gap-3"
          >
            <img
              src="/assets/draganddropareacloudimage-removebg-preview.png"
              width={150}
              height={100}
              className=""
              alt=""
            />
            <MUI.Typography
              variant="subtitle1"
              className="dark:text-white text-center"
            >
              drag and drop files or{" "}
              <span className="underline text-blue-500">click</span> to browse
              files
            </MUI.Typography>
          </MUI.Box>
          <input
            {...getInputProps()}
            type="file"
            multiple
            onChange={(e) => onDrop(e.target.files)}
            className="hidden"
          />
        </MUI.Box>
      )}
    </>
  );
}

Images.propTypes = {
  updateProductData: PropTypes.func.isRequired,
};
