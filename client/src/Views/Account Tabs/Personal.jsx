import * as MUI from "@mui/material";
import { useEffect, useState } from "react";
import { DeleteAccount } from "../../Components/Account personal info/DeleteAccount";
import { MainInfo } from "../../Components/Account personal info/MainInfo";
import { ThemeChoose } from "../../Components/Account personal info/ThemeChoose";
import { GetOwnProfile } from "../../Utils/GetOwnProfile";

export const Personal = () => {
  const [user, setUser] = useState({});
  const [loadingToGetProfile, setLoadingToGetProfile] = useState(false);
  useEffect(() => {
    const getProfile = async () => {
      const { getOwnProfile } = GetOwnProfile({ setLoadingToGetProfile });
      const data = await getOwnProfile();
      setUser(data);
    };
    getProfile();
  }, []);
  return (
    <MUI.Box className="">
      <MUI.Box className="w-full dark:bg-[url('/assets/personalpagebg.png')] bg-cover p-5 shadow-md rounded-md h-44">
        <MUI.Typography
          variant="h3"
          className="text-neutral-900 dark:text-neutral-100 font-bold tracking-wider"
        >
          Personal
        </MUI.Typography>
        <MUI.Stack className="flex flex-row gap-2 items-center rounded-md p-3">
          <MUI.Avatar
            src={user?.avatar?.url}
            className="size-32 cursor-pointer"
          />
          <MUI.Stack className="flex flex-col relative bottom-7">
            <MUI.Typography
              variant="h4"
              className="text-neutral-900 dark:text-neutral-100"
            >
              {user?.username}
            </MUI.Typography>
            <MUI.Typography className="text-neutral-600 dark:text-neutral-300">
              {user?.email}
            </MUI.Typography>
          </MUI.Stack>
        </MUI.Stack>
      </MUI.Box>
      <MUI.Stack
        id="Personal nav container"
        className="flex flex-col gap-14 mt-20 w-full"
      >
        <MainInfo user={user} />
        <ThemeChoose />
        <DeleteAccount />
      </MUI.Stack>
    </MUI.Box>
  );
};
