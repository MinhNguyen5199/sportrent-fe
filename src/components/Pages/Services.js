import React from 'react';
import './Services.css'; // Import your CSS file
import { SummerServices } from './SummerServices';
import { WinterServices } from './WinterServices';

function SportRentPage() {
  return (
    <div className="container-sm">
      <header>
        <h1>Services</h1>
      </header>

      <div className="row mt-1">
        <div className="col-md-12 col-md-offset-2">
          <div className="tabs">
            <ul
              id="myTab"
              role="tablist"
              className="nav nav-tabs nav-pills  "
            >
              <li className="nav-item">
                <a
                  id="summer-tab"
                  data-toggle="tab"
                  href="#summer"
                  role="tab"
                  aria-controls="summer"
                  aria-selected="true"
                  className="nav-link nav-style  text-uppercase font-weight-bold active"
                >
                  Summer Services
                </a>
              </li>

              <li className="nav-item ">
                <a
                  id="winter-tab"
                  data-toggle="tab"
                  href="#winter"
                  role="tab"
                  aria-controls="winter"
                  aria-selected="false"
                  className="nav-link nav-style border-0 text-uppercase font-weight-bold"
                >
                  Winter Services
                </a>
              </li>

            </ul>
          </div>
        </div>
      </div>

      <div className="container-sm">
        <div id="myTabContent" className="tab-content  ">
          <div
            id="summer"
            role="tabpanel"
            aria-labelledby="summer-tab"
            className="tab-pane fade px-2 py-1 show active"
          >
            <SummerServices />
          </div>
          <div
            id="winter"
            role="tabpanel"
            aria-labelledby="winter-tab"
            className="tab-pane fade px-2 py-1"
          >
            <WinterServices />
          </div>
        
        </div>
      </div>






    </div>
  );
}

export default SportRentPage;
