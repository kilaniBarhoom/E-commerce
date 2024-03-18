import * as MUI from "@mui/material";
import { useEffect, useState } from "react";
import FadeIn from "react-fade-in/lib/FadeIn";
import { useNavigate } from "react-router-dom";
import { AccountNav } from "../Components/AccountNav";
import { Personal } from "../Views/Account Tabs/Personal";
import { Security } from "../Views/Account Tabs/Security";
import { Apply } from "../Views/Account Tabs/Apply";

export const Account = () => {
  const nav = useNavigate();
  const [accountTabQuery, setAccountTabQuery] = useState("personal");
  const tabRender = (tabName) => {
    if (tabName === "personal") {
      return <Personal />;
    }
    // } else if (tabName === "orders") {
    //   localStorage.setItem("adminTabQuery", "orders");
    //   return <Orders />;
    else if (tabName === "security") {
      return <Security />;
    } else if (tabName === "apply") {
      return <Apply />;
    }
    // } else if (tabName === "reviews") {
    //   localStorage.setItem("adminTabQuery", "reviews");
    //   return <Reviews />;
    // } else {
    //   localStorage.setItem("adminTabQuery", "main");
    // }
  };
  return (
    <MUI.Box className=" h-fit ">
      <MUI.Box mt={3} role="presentation">
        <MUI.Breadcrumbs
          aria-label="breadcrumb"
          className="dark:text-white"
          mb={2}
        >
          <MUI.Link
            underline="hover"
            className="cursor-pointer"
            color="inherit"
            onClick={() => nav("/")}
          >
            Home
          </MUI.Link>
          <MUI.Link
            underline="none"
            color="inherit"
            className="dark:text-neutral-400"
            // onClick={() => setAdminTabQuery("main")}
          >
            Account
          </MUI.Link>
          <MUI.Link
            underline="none"
            className="dark:text-neutral-400"
            aria-current="page"
            // onClick={() => nav("/admin")}
          >
            {accountTabQuery[0]?.toUpperCase()}
            {accountTabQuery?.slice(1).toLowerCase()}
          </MUI.Link>
        </MUI.Breadcrumbs>
      </MUI.Box>
      <FadeIn>
        <MUI.Stack className="flex gap-3 flex-row w-11/12 mx-auto">
          <MUI.Box
            sx={{
              display: { xs: "none", md: "flex" },
              flex: 0.25,
            }}
          >
            <AccountNav
              accountTabQuery={accountTabQuery}
              setAccountTabQuery={setAccountTabQuery}
            />
          </MUI.Box>

          <MUI.Box className="w-full mb-10 flex-1">
            {tabRender(accountTabQuery)}
          </MUI.Box>
        </MUI.Stack>
      </FadeIn>
    </MUI.Box>
  );
};
