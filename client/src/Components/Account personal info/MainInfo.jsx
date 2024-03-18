import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import * as MUI from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import Select from "react-select";
import countryNameToCode from "../../Constants/CountryCodes";

export const MainInfo = ({ user }) => {
  //loop over countryNameToCode and return an array of just the names

  // const {avatar, username, email, phone, address} = user;

  const [userInfoToUpdate, setUserInfoToUpdate] = useState({
    username: "",
    phone: "",
    address: {
      country: "",
      city: "",
      streetname: "",
      postalCode: "",
    },
  });

  const [avatarCoverImage, setAvatarCoverImage] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarCoverImage(e.target.result);
      };
      reader.readAsDataURL(file);
      setAvatarFile(file);
    }
  };

  const submitUserInfo = (e) => {
    e.preventDefault();
    console.log(userInfoToUpdate);
  };

  const countryOptions = Object.entries(countryNameToCode).map(
    ([countryName, { code, phone }]) => ({
      value: countryName,
      label: (
        <MUI.Stack className="flex flex-row items-center gap-2">
          <ReactCountryFlag
            countryCode={code}
            svg
            style={{
              width: "2em",
              height: "2em",
            }}
            title={countryName}
          />
          <MUI.Typography variant="h6">{countryName}</MUI.Typography>
          <MUI.Typography variant="h6">(+{phone})</MUI.Typography>
        </MUI.Stack>
      ),
      phone,
    })
  );

  const handleCountryChange = (selectedOption) => {
    setUserInfoToUpdate({
      ...userInfoToUpdate,
      phone: selectedOption.phone,
      address: { ...userInfoToUpdate.address, country: selectedOption.value },
    });
  };

  const setUserInfo = () => {
    setUserInfoToUpdate({
      username: user?.username || "",
      phone: user?.phone || "",
      address: {
        country: user?.address?.country || "",
        city: user?.address?.city || "",
        streetname: user?.address?.streetname || "",
        postalCode: user?.address?.postalCode || "",
      },
    });
  };

  useEffect(() => {
    setUserInfo();
  }, [user]);

  const handleCancelChanges = () => {
    setUserInfo();
    setAvatarCoverImage(null);
    setAvatarFile(null);
  };

  return (
    <MUI.Stack className="flex flex-col gap-3 w-full ">
      <MUI.Typography
        variant="h4"
        className="text-neutral-900 dark:text-neutral-100 flex flex-row items-center gap-3"
      >
        <PersonOutlineOutlinedIcon
          fontSize="large"
          className="rounded-full p-1 bg-neutral-300 dark:bg-neutral-800"
        />{" "}
        Personal Information
      </MUI.Typography>
      <MUI.Box className="flex flex-col gap-3 dark:bg-neutral-800 dark:border-neutral-500 border-solid border-2 p-7 rounded-md">
        <form onSubmit={submitUserInfo}>
          <MUI.Stack className="flex flex-row gap-7 items-center rounded-md">
            <MUI.Avatar
              src={user?.avatar?.url || avatarCoverImage}
              className="size-32 cursor-pointer relative"
            />

            {user?.avatar?.url || avatarCoverImage ? (
              <MUI.Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setAvatarCoverImage(null);
                  setAvatarFile(null);
                }}
              >
                Remove
              </MUI.Button>
            ) : (
              <>
                <input
                  type="file"
                  className="hidden"
                  id="avatar"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
                <label
                  htmlFor="avatar"
                  className="cursor-pointer dark:bg-neutral-100 dark:text-black dark:hover:bg-neutral-200 dark:hover:text-black dark:border-neutral-500 dark:border-2 dark:border-solid p-3 rounded-md"
                >
                  Upload image
                </label>
              </>
            )}
          </MUI.Stack>
          <MUI.Stack className="flex flex-col gap-8 my-3 w-full">
            <MUI.Stack gap={1}>
              <label className="dark:text-neutral-300">Username*</label>
              <input
                type="text"
                className="w-3/5 bg-transparent shadow-none border-solid border-2 dark:border-neutral-500 outline-none h-[60px] dark:hover:border-white dark:focus-within:border-white
             dark:placeholder:text-neutral-500 dark:text-white p-5 rounded-md text-lg "
                placeholder="Userame"
                value={userInfoToUpdate.username}
                onChange={(e) =>
                  setUserInfoToUpdate({
                    ...userInfoToUpdate,
                    username: e.target.value,
                  })
                }
              />
            </MUI.Stack>
            <MUI.Stack gap={1} className="w-full">
              <label className="dark:text-neutral-300">Email</label>
              <MUI.Stack className="gap-2 flex flex-row">
                <input
                  disabled
                  type="text"
                  className="w-3/5 bg-transparent border-solid border-2 shadow-none dark:border-neutral-500 dark:text-neutral-400 outline-none h-[60px]  p-5 rounded-md text-lg "
                  placeholder="Userame"
                  value={user?.email}
                  onChange={(e) =>
                    setUserInfoToUpdate({
                      ...userInfoToUpdate,
                      email: e.target.value,
                    })
                  }
                />
                <MUI.Button
                  variant="contained"
                  size={"small"}
                  className="normal-case text-lg w-fit"
                >
                  Request Email Change
                </MUI.Button>
              </MUI.Stack>
              <MUI.Typography className="dark:text-white flex flex-row   items-center">
                Email is verified{" "}
                <CheckCircleOutlineOutlinedIcon
                  fontSize="small"
                  className="text-green-500"
                />
              </MUI.Typography>
            </MUI.Stack>
            <MUI.Stack className="gap-2 w-full">
              <label className="dark:text-neutral-300">Country</label>
              <Select
                className="w-1/3  border-neutral-500 hover:border-white focus-within:border-white"
                options={countryOptions}
                value={userInfoToUpdate.address.country}
                onChange={handleCountryChange}
                placeholder="Country"
              />

              {userInfoToUpdate.address.country && (
                <MUI.Stack
                  className="p-2 w-1/3 gap-2 flex flex-row rounded-md border-2 border-solid divide-x-2 divide-solid dark:divide-neutral-500 divide-y-0
            dark:border-neutral-500"
                >
                  <MUI.Typography variant="h6" className="dark:text-white">
                    +{userInfoToUpdate.address.country?.phone}
                  </MUI.Typography>
                  <input
                    maxLength={9}
                    type="number"
                    className="w-full bg-transparent px-2 text-xl dark:text-white outline-none"
                    placeholder="Phone Number"
                    value={userInfoToUpdate.phone}
                    onChange={(e) =>
                      setUserInfoToUpdate({
                        ...userInfoToUpdate,
                        phone: e.target.value,
                      })
                    }
                  />
                </MUI.Stack>
              )}
            </MUI.Stack>
            <MUI.Stack gap={1}>
              {/* address choose */}
              <label className="dark:text-neutral-300">Address</label>
              <MUI.Stack className="grid grid-cols-2 gap-2">
                <input
                  disabled={userInfoToUpdate.address.country === null}
                  type="text"
                  className="col-span-2 md:col-auto bg-transparent border-solid border-2 shadow-none dark:border-neutral-500 dark:text-neutral-400 outline-none h-[60px] p-5 rounded-md text-lg"
                  placeholder="City"
                  value={userInfoToUpdate.address.city}
                  onChange={(e) =>
                    setUserInfoToUpdate({
                      ...userInfoToUpdate,
                      address: {
                        ...userInfoToUpdate.address,
                        city: e.target.value,
                      },
                    })
                  }
                />
                <input
                  disabled={userInfoToUpdate.address.country === null}
                  type="text"
                  className="col-span-2 md:col-auto bg-transparent border-solid border-2 shadow-none dark:border-neutral-500 dark:text-neutral-400 outline-none h-[60px] p-5 rounded-md text-lg"
                  placeholder="Street Address"
                  value={userInfoToUpdate.address.streetname}
                  onChange={(e) =>
                    setUserInfoToUpdate({
                      ...userInfoToUpdate,
                      address: {
                        ...userInfoToUpdate.address,
                        streetname: e.target.value,
                      },
                    })
                  }
                />
                <input
                  disabled={userInfoToUpdate.address.country === null}
                  type="text"
                  className="col-span-2 bg-transparent border-solid border-2 shadow-none dark:border-neutral-500 dark:text-neutral-400 outline-none h-[60px] p-5 rounded-md text-lg"
                  placeholder="Postal Code"
                  value={userInfoToUpdate.address.postalCode}
                  onChange={(e) =>
                    setUserInfoToUpdate({
                      ...userInfoToUpdate,
                      address: {
                        ...userInfoToUpdate.address,
                        postalCode: e.target.value,
                      },
                    })
                  }
                />
              </MUI.Stack>
            </MUI.Stack>
            <MUI.Stack className="flex flex-row mt-4 gap-2 items-center w-full justify-end">
              <MUI.Button
                variant="text"
                className="dark:text-white bg-transparent"
                onClick={handleCancelChanges}
              >
                Cancel
              </MUI.Button>
              <MUI.Button type="submit" variant="contained">
                Save Changes
              </MUI.Button>
            </MUI.Stack>
          </MUI.Stack>
        </form>
      </MUI.Box>
    </MUI.Stack>
  );
};

MainInfo.propTypes = {
  user: PropTypes.object,
};
