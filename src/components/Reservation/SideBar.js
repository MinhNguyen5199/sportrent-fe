import React from "react";
import "../Inventory/sidebar.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import EventIcon from "@material-ui/icons/Event";

const SideBar = () => {
  const menuItems = [
    {
      title: "Overview",
      link: "/StaffLayout/reservationList",
      icon: <DashboardIcon style={{ fontSize: "20px" }} />,
    },
    {
      title: "Transaction",
      link: "/StaffLayout/transactions",
      icon: <ShoppingCartIcon style={{ fontSize: "20px" }} />,
    },
    {
      title: "Calendar",
      link: "/StaffLayout/reservationCalender",
      icon: <EventIcon style={{ fontSize: "20px" }} />,
    },
  ];

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} className="sb-tooltip">
      {props.msg}
    </Tooltip>
  );

  const menuItemList = menuItems.map((menuItem) =>
    menuItem.title === "hr" ? (
      <li key={menuItem.title}>
        <hr />
      </li>
    ) : (
      <li key={menuItem.title} className="sb-items">
        <OverlayTrigger
          placement="right"
          overlay={renderTooltip({ msg: menuItem.title })}
        >
          <a href={menuItem.link} className="sidebar-nav-links nav-link text-white">
            {menuItem.icon}
            <span className="sb-item">{menuItem.title}</span>
          </a>
        </OverlayTrigger>
      </li>
    )
  );

  return (
    <section className="sec-sb vh-100">
      <div className="sideNav">
        <ul className="nav nav-pills flex-column mb-auto">{menuItemList}</ul>
      </div>
    </section>
  );
};

export default SideBar;
