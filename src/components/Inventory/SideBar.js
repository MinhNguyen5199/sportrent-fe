import React from "react";
import "./sidebar.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CategoryIcon from "@material-ui/icons/Category";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";
import GroupIcon from "@material-ui/icons/Group";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import PaymentIcon from "@material-ui/icons/Payment";
import AssessmentIcon from "@material-ui/icons/Assessment";
import BarChartIcon from "@material-ui/icons/BarChart";

const SideBar = () => {
  const menuItems = [
    {
      title: "Dashboard",
      link: "/ManagerLayout/",
      icon: <DashboardIcon style={{ fontSize: "16px" }}/>,
    },
    {
      title: "Category",
      link: "/ManagerLayout/categoryList",
      icon: <CategoryIcon style={{ fontSize: "16px" }}/>,
    },
    {
      title: "Products",
      link: "/ManagerLayout/productList",
      icon: <ShoppingCartIcon style={{ fontSize: "16px" }}/>,
    },
    {
      title: "Customer",
      link: "/ManagerLayout/customerList",
      icon: <PersonIcon style={{ fontSize: "16px" }}/>,
    },
    {
      title: "Staff",
      link: "/ManagerLayout/StaffList",
      icon: <GroupIcon style={{ fontSize: "16px" }} />,
    },
    {
      title: "Reservation",
      link: "/ManagerLayout/reservation",
      icon: <EventSeatIcon style={{ fontSize: "16px" }}/>,
    },
    {
      title: "Payment",
      link: "/ManagerLayout/payment",
      icon: <PaymentIcon style={{ fontSize: "16px" }}/>,
    },
    { title: "hr" },
    {
      title: "Reports",
      link: "/ManagerLayout/Payment",
      icon: <AssessmentIcon style={{ fontSize: "16px" }}/>,
    },
    {
      title: "Analytics",
      link: "/ManagerLayout/Payment",
      icon: <BarChartIcon style={{ fontSize: "16px" }}/>,
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
        <ul className="nav nav-pills flex-column mb-auto ">{menuItemList}</ul>
      </div>
    </section>
  );
};

export default SideBar;
