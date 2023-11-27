import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";

const pageNames = ["About", "Hurricanes", "Counties", "Aid Organizations"];
const pageRoutes = [
    "About",
    "Hurricanes/1",
    "Counties/1",
    "Aid Organizations/1",
];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    
    // const handleSearchButtonClick = () => {
    //     // Use Link component to navigate to the Search page
    //     return (
    //         <Link to="/Search" style={{ textDecoration: "none" }} />
    //     );
    // };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* img element replacing AdbIcon */}
                    <img
                        src={"img/hurricane.png"}
                        alt="Hurricane Icon"
                        style={{
                            width: "30px", // Set the width as needed
                            height: "30px", // Set the height as needed
                            marginRight: "10px", // Optional: Add some spacing between the icon and text
                        }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        HOME
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pageNames.map((page, index) => (
                                <Link
                                    to={`/${pageRoutes[index]}`}
                                    style={{ textDecoration: "none" }}
                                >
                                    <MenuItem
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <Typography textAlign="center">
                                            {page}
                                        </Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        HOME
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pageNames.map((pageName, index) => (
                            <Link
                                to={`/${pageRoutes[index]}`}
                                style={{ textDecoration: "none" }}
                            >
                                <Button
                                    key={pageName}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        mr: 1.5,
                                        color: "white",
                                        display: "block",
                                    }}
                                >
                                    {pageName}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            flexGrow: 1,
                        }}
                    >
                        <Box sx={{ display: { xs: "none", md: "flex" } }}>
                            <input
                                type="text"
                                placeholder="Search"
                                style={{
                                    padding: "5px",
                                    borderRadius: "5px",
                                    marginRight: "5px",
                                }}
                            />
                            
                            <Link
                                to={"/Search"}
                                style={{ textDecoration: "none" }}
                            >
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    style={{ backgroundColor: "#f0f0f0", color: "#333" }}
                                    onClick={handleCloseNavMenu}
                                >
                                    Search
                                </Button>
                            </Link>
                        </Box>
                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="search"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
