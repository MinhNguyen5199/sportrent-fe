import React, { Component } from "react";
import StaffRoutes from "./StaffRoutes";
import SideBar from "./SideBar";
import "../../Styles/ManageInvRes.css";
class StaffLayout extends Component {
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
        <div className="row">
            <div className="col-2 h-screen SideBar" >
              <SideBar />
            </div>

            <div className="col-10  h-screen">
              <StaffRoutes />
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default StaffLayout;
