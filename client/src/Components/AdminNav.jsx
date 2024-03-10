import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Divider } from "@mui/joy";
import { Button, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect } from "react";
import AdminNavTabs from "../Constants/AdminNavTabs";

export default function AdminNav({ adminTabQuery, setAdminTabQuery }) {
  const { adminNavTabs } = AdminNavTabs();
  const handleTabChange = (tabName) => {
    setAdminTabQuery(tabName);
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("tab", adminTabQuery);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${queryParams}`
    );
  }, [adminTabQuery]);

  useEffect(() => {
    setAdminTabQuery("main");
  }, []);

  return (
    <Stack alignItems="start" gap={1} className="w-60 p-2 rounded-md">
      {adminNavTabs.map((adminTab) => (
        <Button
          key={adminTab.id}
          startIcon={adminTab.icon}
          onClick={() => {
            handleTabChange(adminTab.name.toLocaleLowerCase().split(" ")[0]);
          }}
          className={`w-full justify-start text-neutral-600 dark:text-neutral-300 px-3 p-2 normal-case font-semibold ${
            adminTab.name.toLocaleLowerCase().split(" ")[0] == adminTabQuery
              ? "bg-blue-500 text-white "
              : ""
          }`}
        >
          {adminTab.name}
        </Button>
      ))}
      <Divider />
      <Button
        startIcon={<ReportGmailerrorredOutlinedIcon />}
        onClick={() => {
          handleTabChange("reports");
        }}
        className={`w-full justify-start text-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-600 px-3 hover:bg-neutral-200 p-2 normal-case font-semibold ${
          "reports" == adminTabQuery
            ? "bg-red-100 text-red-500 dark:bg-red-500 dark:text-white hover:bg-red-300 dark:hover:bg-red-600"
            : ""
        }`}
      >
        Reports
      </Button>
      <Button
        startIcon={<SettingsOutlinedIcon />}
        onClick={() => {
          handleTabChange("settings");
        }}
        className={`w-full justify-start  dark:text-neutral-300 dark:hover:bg-neutral-600 px-3 hover:bg-neutral-200 p-2 normal-case font-semibold ${
          "settings" == adminTabQuery
            ? "bg-neutral-500 text-white hover:bg-neutral-700"
            : "text-neutral-600"
        }`}
      >
        Settings
      </Button>
    </Stack>
  );
}

AdminNav.propTypes = {
  adminTabQuery: PropTypes.string.isRequired,
  setAdminTabQuery: PropTypes.func.isRequired,
};
