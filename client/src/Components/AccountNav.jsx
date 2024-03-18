import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Button, Divider, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect } from "react";
import AccountNavTabs from "../Constants/AccountNavTabs";

export const AccountNav = ({ accountTabQuery, setAccountTabQuery }) => {
  const { accountNavTabs } = AccountNavTabs();
  const handleTabChange = (tabName) => {
    setAccountTabQuery(tabName);
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("tab", accountTabQuery);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${queryParams}`
    );
  }, [accountTabQuery]);
  return (
    <Stack alignItems="start" gap={1} className="w-60 p-2 rounded-md">
      {accountNavTabs?.map((accountTab) => (
        <Button
          size="large"
          key={accountTab.id}
          startIcon={accountTab.icon}
          onClick={() => {
            handleTabChange(accountTab.name.toLocaleLowerCase().split(" ")[0]);
          }}
          className={`w-full justify-start text-neutral-600 dark:text-neutral-300 px-3 p-2 normal-case font-semibold ${
            accountTab.name.toLocaleLowerCase().split(" ")[0] == accountTabQuery
              ? "bg-blue-500 text-white "
              : ""
          }`}
        >
          {accountTab.name}
        </Button>
      ))}
      <Divider light className="dark:border-neutral-500 border-dashed" />
      <Button
        size="large"
        startIcon={<SettingsOutlinedIcon />}
        onClick={() => {
          handleTabChange("settings");
        }}
        className={`w-full justify-start  dark:text-neutral-300 dark:hover:bg-neutral-600 px-3 hover:bg-neutral-200 p-2 normal-case font-semibold ${
          "settings" == accountTabQuery
            ? "bg-neutral-500 text-white hover:bg-neutral-700"
            : "text-neutral-600"
        }`}
      >
        Settings
      </Button>
    </Stack>
  );
};

AccountNav.propTypes = {
  accountTabQuery: PropTypes.string,
  setAccountTabQuery: PropTypes.func,
};
