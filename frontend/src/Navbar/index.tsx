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
import Link from "@mui/material/Link";
import {useNavigate} from "react-router-dom";
import { InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const pageNames = ["About", "Hurricanes", "Counties", "Aid Organizations", "Our Visualizations", "Provider Visualizations"];
const pageRoutes = [
    "About",
    "Hurricanes/1",
    "Counties/1",
    "Aid Organizations/1",
    "Our Visualizations/1",
    "Provider Visualizations/1",
];

function Navbar() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = React.useState("");
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate(`/Search/${searchTerm}`)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* img element replacing AdbIcon */}
                    <img
                        src={"/img/hurricane.png"}
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
                                    href={`/${pageRoutes[index]}`}
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
                                href={`/${pageRoutes[index]}`}
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

                        <Paper
                            component="form"
                            onSubmit={handleSearchSubmit}
                        >
                            <InputBase
                                sx={{ ml: 1, mb: 1, flex: 1 }}
                                placeholder={"Search"}
                                onChange={handleInputChange}
                                value={searchTerm}
                            />
                            <Link
                                href={`/Search/${searchTerm}`}
                                style={{ textDecoration: "none" }}
                            >
                                <IconButton
                                    size="large"
                                    aria-label="search"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleCloseNavMenu}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </Link>
                        </Paper>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
