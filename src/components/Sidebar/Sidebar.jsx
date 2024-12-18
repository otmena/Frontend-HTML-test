/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/logo.png";

const routes = [
	{ title: "Home", icon: "fas-solid fa-house", path: "/" },
	{ title: "Sales", icon: "chart-line", path: "/sales" },
	{ title: "Costs", icon: "chart-column", path: "/costs" },
	{ title: "Payments", icon: "wallet", path: "/payments" },
	{ title: "Finances", icon: "chart-pie", path: "/finances" },
	{ title: "Messages", icon: "envelope", path: "/messages" },
];

const bottomRoutes = [
	{ title: "Settings", icon: "sliders", path: "/settings" },
	{ title: "Support", icon: "phone-volume", path: "/support" },
];

const themes = {
	light: {
		sidebarBackground: "var(--color-sidebar-background-light-default)",
		sidebarHover: "var(--color-sidebar-background-light-hover)",
		sidebarActive: "var(--color-sidebar-background-light-active)",
		textColor: "var(--color-text-light-default)",
		textHover: "var(--color-text-light-hover)",
		textActive: "var(--color-text-light-active)",
		textLogo: "var(--color-text-logo-light-default)",
	},
	dark: {
		sidebarBackground: "var(--color-sidebar-background-dark-default)",
		sidebarHover: "var(--color-sidebar-background-dark-hover)",
		sidebarActive: "var(--color-sidebar-background-dark-active)",
		textColor: "var(--color-text-dark-default)",
		textHover: "var(--color-text-dark-hover)",
		textActive: "var(--color-text-dark-active)",
		textLogo: "var(--color-text-logo-dark-default)",
	},
};

const SidebarWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: ${(props) => (props.isOpen ? "250px" : "80px")};
	background-color: ${(props) => props.theme.sidebarBackground};
	padding: 10px 14px;
	display: flex;
	flex-direction: column;
	transition: width 0.3s ease, transform 0.3s ease;
	transform: ${(props) => (props.isOpen ? "translateX(0)" : "translateX(-10px)")};
	box-shadow: ${(props) => (props.isOpen ? "5px 0 15px rgba(0, 0, 0, 0.2)" : "none")};
`;

const SidebarHeader = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
	justify-content: ${(props) => (props.isOpen ? "flex-start" : "center")};
	transition: justify-content 0.3s ease-in-out;
`;

const SidebarMenu = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	align-items: ${(props) => (props.isOpen ? "stretch" : "center")};
`;

const SidebarBottomMenu = styled.div`
	margin-top: auto;
	display: flex;
	flex-direction: column;
	align-items: ${(props) => (props.isOpen ? "stretch" : "center")};
`;

const SidebarMenuItem = styled.div`
	display: flex;
	align-items: center;
	padding: ${(props) => (props.isOpen ? "10px 20px" : "10px 10px")};
	border-radius: 20px;
	cursor: pointer;
	transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, transform 0.3s ease-in-out,
		padding 0.5s ease-in-out;
	margin: 1rem 0rem;
	background-color: ${(props) => (props.active ? props.theme.sidebarActive : "transparent")};
	color: ${(props) => (props.active ? props.theme.textActive : props.theme.textColor)};
	position: relative;

	&:hover {
		background-color: ${(props) => props.theme.sidebarHover};
		transform: scale(1.05);
	}

	.sidebar__menu-icon {
		font-size: 1.2rem;
		margin-right: ${(props) => (props.isOpen ? "10px" : "0")};
		color: ${(props) => props.theme.textColor};
		transition: margin 0.3s ease-in-out, color 0.3s ease-in-out;
	}

	.sidebar__menu-title {
		font-size: 1rem;
		font-weight: bold;
		display: ${(props) => (props.isOpen ? "inline" : "none")};
		transition: opacity 0.3s ease-in-out;
		opacity: ${(props) => (props.isOpen ? 1 : 0)};
	}

	/* Появление текста рядом с иконкой при ховере */
	&:hover::after {
		content: ${(props) => (!props.isOpen ? `"${props.title}"` : "none")};
		position: absolute;
		left: 70px; /* Смещение вправо от иконки */
		background-color: ${(props) => props.theme.sidebarHover};
		color: ${(props) => props.theme.textHover};
		padding: 5px 10px;
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		white-space: nowrap;
		font-size: 0.9rem;
	}
`;

const SidebarTitle = styled.h1`
	color: ${(props) => props.theme.textLogo};
	font-size: 1.5rem;
	font-weight: bold;
	display: ${(props) => (props.isOpen ? "inline" : "none")};
`;

const SidebarLogo = styled.img`
	width: 50px;
	height: auto;
	margin-right: ${(props) => (props.isOpen ? "10px" : "0")};
	transition: margin-right 0.3s ease-in-out;
`;

const ToggleButton = styled.button`
	position: absolute;
	top: 20px;
	right: ${(props) => (props.isOpen ? "-20px" : "-20px")};
	width: 40px;
	height: 40px;
    color: ${(props) => props.theme.textColor}
	border: 1px solid ${(props) => props.theme.textColor};
	background-color: ${(props) => props.theme.sidebarBackground};
	border-radius: 50%;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: right 0.3s ease-in-out, background-color 0.3s ease-in-out,
		border-color 0.3s ease-in-out, transform 0.3s ease-in-out;

	&:hover {
		background-color: ${(props) => props.theme.sidebarHover};
	}
`;

const Sidebar = ({ color }) => {
	const [isOpen, setIsOpen] = useState(true);
	const [activePath, setActivePath] = useState("/");

	const goToRoute = (path) => {
		setActivePath(path);
		console.log(`Navigating to "${path}"`);
	};

	const theme = themes[color] || themes.light;

	return (
		<SidebarWrapper theme={theme} isOpen={isOpen}>
			<ToggleButton onClick={() => setIsOpen(!isOpen)} theme={theme} isOpen={isOpen}>
				<FontAwesomeIcon icon={isOpen ? "chevron-left" : "chevron-right"} />
			</ToggleButton>

			<SidebarHeader isOpen={isOpen}>
				<SidebarLogo src={logo} alt='TensorFlow logo' isOpen={isOpen} />
				<SidebarTitle theme={theme} isOpen={isOpen}>
					TensorFlow
				</SidebarTitle>
			</SidebarHeader>

			<SidebarMenu isOpen={isOpen}>
				{routes.map((route) => (
					<SidebarMenuItem
						key={route.title}
						onClick={() => goToRoute(route.path)}
						active={activePath === route.path}
						isOpen={isOpen}
						theme={theme}
						title={route.title}>
						<FontAwesomeIcon icon={route.icon} className='sidebar__menu-icon' isOpen={isOpen} />
						<span className='sidebar__menu-title'>{route.title}</span>
					</SidebarMenuItem>
				))}
			</SidebarMenu>

			<SidebarBottomMenu isOpen={isOpen}>
				{bottomRoutes.map((route) => (
					<SidebarMenuItem
						key={route.title}
						onClick={() => goToRoute(route.path)}
						active={activePath === route.path}
						isOpen={isOpen}
						theme={theme}
						title={route.title}>
						<FontAwesomeIcon icon={route.icon} className='sidebar__menu-icon' isOpen={isOpen} />
						<span className='sidebar__menu-title'>{route.title}</span>
					</SidebarMenuItem>
				))}
			</SidebarBottomMenu>
		</SidebarWrapper>
	);
};

export default Sidebar;
