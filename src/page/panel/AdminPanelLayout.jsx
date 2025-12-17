import React, {useMemo, useState} from "react";
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import {NavLink, Outlet} from "react-router";

const SIDEBAR_WIDTH_OPEN = 260;
const SIDEBAR_WIDTH_COLLAPSED = 76;

function AdminPanelLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [selected, setSelected] = useState({}); // "question" | "answer"

    const sidebarWidth = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_OPEN;

    const menuItems = useMemo(
        () => [
            {key: "question", label: "Sorular", to: "/admin/panel", icon: <QuizOutlinedIcon/>},
            {key: "answer", label: "Cevaplar", to: "/admin/panel/answer", icon: <CheckCircleOutlineIcon/>},
        ],
        []
    );

    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline/>
            <Paper
                elevation={8}
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: "100vh",
                    width: sidebarWidth,
                    borderRadius: 0,
                    overflow: "hidden",
                    transition: "width 200ms ease",
                    zIndex: (theme) => theme.zIndex.appBar - 1,
                }}
            >
                <Toolbar
                    sx={{
                        px: 1.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: collapsed ? "center" : "space-between",
                        gap: 1,
                    }}
                >
                    {!collapsed && (
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 800,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            Menü
                        </Typography>
                    )}

                    <IconButton
                        onClick={() => setCollapsed((v) => !v)}
                        size="small"
                    >

                        {collapsed ? <MenuIcon/> : <KeyboardDoubleArrowLeftIcon/>}
                    </IconButton>
                </Toolbar>

                <Divider/>

                <List sx={{p: 1}}>
                    {menuItems.map((item) => {
                        const button = (
                            <ListItemButton
                                component={NavLink}
                                key={item.key}
                                selected={selected.key === item.key}
                                onClick={() => setSelected(item)}
                                to={item.to}
                                sx={{
                                    borderRadius: 2,
                                    mx: 0.5,
                                    my: 0.5,
                                    justifyContent: collapsed ? "center" : "flex-start",
                                    px: collapsed ? 1.25 : 2,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: collapsed ? "unset" : 40,
                                        justifyContent: "center",
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>

                                {!collapsed && <ListItemText primary={item.label}/>}
                            </ListItemButton>
                        );

                        return collapsed ? (
                            <Tooltip key={item.key} title={item.label} placement="right">
                                <Box>{button}</Box>
                            </Tooltip>
                        ) : (
                            button
                        );
                    })}
                </List>
            </Paper>

            {/* ÜST BAR */}
            <AppBar
                position="fixed"
                sx={{
                    ml: `${sidebarWidth}px`,
                    width: `calc(100% - ${sidebarWidth}px)`,
                    transition: "width 200ms ease, margin-left 200ms ease",
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap sx={{fontWeight: 700}}>
                        {selected?.label}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box
                component="main"
                sx={{
                    ml: `${sidebarWidth}px`,
                    width: `calc(100% - ${sidebarWidth}px)`,
                    p: 3,
                    transition: "width 200ms ease, margin-left 200ms ease",
                }}
            >
                <Toolbar/>
                <Outlet/>
            </Box>
        </Box>
    );
}

export default AdminPanelLayout;