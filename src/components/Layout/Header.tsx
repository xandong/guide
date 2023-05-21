import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "phosphor-react";

import { AuthContext } from "../../utils/contexts/AuthProvider";
import AfterHeader from "./AfterHeader";
import { Button, Menu, MenuItem } from "@mui/material";

const Header: React.FC = () => {
  const { authenticated, logoutGoogleAuth } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <header className="w-screen border-b rounded-b-xl shadow flex justify-between items-center sm:px-10 px-6 py-2 bg-zinc-50">
        <img className="h-10 aspect-auto" src="guide-logo.svg" alt="" />

        {authenticated ? (
          <div className="relative">
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <User
                className="hover:bg-blue-300/50 transition-colors rounded-full p-2"
                size={40}
                color="#000"
              />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Link to="/profile">
                <MenuItem>
                  Profile
                </MenuItem>
              </Link>
              <MenuItem onClick={logoutGoogleAuth}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <Link
            to="/login"
            className="text-blue-500 border-2 border-blue-500 font-semibold px-6 py-1.5 hover:bg-blue-500 hover:text-white rounded transition-colors hover:shadow-md"
          >
            Entrar
          </Link>
        )}
      </header>

      <AfterHeader />
    </React.Fragment>
  );
};

export default Header;
