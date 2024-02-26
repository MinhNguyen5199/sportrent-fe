import React, { Component } from "react";
import ManagerRoutes from "./ManagerRoutes";
import SideBar from "./SideBar";

import "../../Styles/ManageInvRes.css";

class ManagerLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  render() {
    return (
      <React.Fragment>
        {/* sidebar section */}
        <section>
          <div className="row ">
            <div className="col-2 h-screen SideBar">
              <SideBar />
            </div>

            <div className="col-9 col-lg-10 mt-4 h-screen">
              <ManagerRoutes />
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default ManagerLayout;
