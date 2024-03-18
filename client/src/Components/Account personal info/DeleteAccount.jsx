import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import * as MUI from "@mui/material";

export const DeleteAccount = () => {
  return (
    <MUI.Stack className="flex flex-col gap-3 w-full ">
      <MUI.Typography
        variant="h4"
        className="text-neutral-900 dark:text-neutral-100 flex flex-row items-center gap-3"
      >
        <ReportProblemOutlinedIcon
          fontSize="large"
          className="rounded-full p-1 bg-neutral-300 dark:bg-neutral-800"
        />{" "}
        Delete Account
      </MUI.Typography>
      <MUI.Box className=" gap-5 flex flex-col dark:bg-neutral-800 dark:border-neutral-500 border-solid border-2 p-7 rounded-md">
        <MUI.Typography
          variant="h6"
          className="text-neutral-900 dark:text-neutral-100"
        >
          Are you sure you want to delete your account? This action cannot be
          undone.
        </MUI.Typography>
        <MUI.Button
          variant="outlined"
          size="large"
          className={`w-fit  h-fit text-red-500 border-red-500 hover-bg-red-300 normal-case`}
        >
          Delete Account
        </MUI.Button>
      </MUI.Box>
    </MUI.Stack>
  );
};
