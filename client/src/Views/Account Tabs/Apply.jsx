import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import WorkIcon from "@mui/icons-material/Work";
import * as MUI from "@mui/material";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export const Apply = () => {
  const [resume, setResume] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const onDrop = (acceptedFiles) => {
    setError(null);
    const file = acceptedFiles[0];
    if (
      file.type !== "application/pdf" &&
      file.type !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
      file.type !== "application/msword" &&
      file.type !== "text/plain"
    ) {
      setError("Only PDF, DOCX, DOC, and TXT files are allowed");
      return;
    }
    setFile(file);

    const reader = new FileReader();

    reader.onload = () => {
      setResume(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    onDrop: onDrop,
  });
  return (
    <MUI.Box>
      <MUI.Box className="w-full  bg-[url('/assets/applypage.png')] bg-cover bg-bottom relative p-5 shadow-md rounded-md h-60">
        <MUI.Typography
          variant="h3"
          className="text-white font-bold tracking-wider p-5 absolute top-0 left-0 w-full h-full bg-black/50 "
        >
          Apply to be a salesman
        </MUI.Typography>
      </MUI.Box>
      <MUI.Stack className="flex flex-col gap-3 mt-10">
        <MUI.Typography
          variant="h4"
          className="text-neutral-900 dark:text-neutral-100 flex flex-row items-center gap-3"
        >
          <WorkIcon
            fontSize="large"
            className="rounded-full p-1 bg-neutral-300 dark:bg-neutral-800"
          />{" "}
          Would you like to be a salesman?
        </MUI.Typography>
        <MUI.Box className="flex flex-col gap-3 dark:bg-neutral-800 dark:border-neutral-500 border-solid border-2 p-7 rounded-md">
          {error && (
            <MUI.Alert severity="error" color="error" variant="filled">
              {error}
            </MUI.Alert>
          )}
          {!file && (
            <MUI.Typography
              variant="subtitle1"
              className="dark:text-neutral-300"
            >
              Upload your resume
            </MUI.Typography>
          )}
          {file ? (
            <MUI.Box className="flex flex-row gap-3 dark:bg-neutral-700 w-fit p-2 rounded-md items-center">
              <PictureAsPdfIcon />
              <MUI.Typography variant="subtitle1" className="dark:text-white">
                {file.name}
              </MUI.Typography>
              <MUI.Button
                variant="text"
                color="error"
                onClick={() => {
                  setFile(null);
                  setResume(null);
                }}
              >
                Remove
              </MUI.Button>
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
                  drag and drop your resume here or{" "}
                  <span className="underline text-blue-500">click</span> to
                  browse files
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

          <MUI.Button
            variant="contained"
            color="primary"
            className="w-fit normal-case"
          >
            Apply Now
          </MUI.Button>
          <MUI.Typography
            variant="subtitle2"
            className="text-neutral-600 dark:text-neutral-300"
          >
            By applying, you agree to our terms and conditions
          </MUI.Typography>
        </MUI.Box>
      </MUI.Stack>
    </MUI.Box>
  );
};
