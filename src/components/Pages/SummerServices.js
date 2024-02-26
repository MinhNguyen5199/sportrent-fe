import React from 'react'

export const SummerServices = () => {
  return (
    <div>
      <p className='header-desc'>Professional Bike Repair, Fast Service & Competitive Rates</p>

      <section className="services-section">
        <div className="services-content">
          <h3>Our Services</h3>
          <p className='our-services'>
            With a large variety of services, Sports Rent can get your bike out of the garage and on to the trails in no time. We offer services for those who just need specific repairs or a complete bike repair.
          </p>
          <p className='our-services-disclaimer'>
            We do not require appointments and simply ask for you to leave your bike for a few days until the bike repairs are completed (3-5 Days).
          </p>
        </div>
      </section>

      <section className="tune-up-section">
        <div className="tune-up-content">
          <div className="tune-up-text">
            <h3 className='complete-tune-up'>
              Complete Bicycle Tune <span className='complete-tune-up-price'>$85!</span>
            </h3>
            <p className='complete-tune-up-desc'>Services included in our complete bicycle tune-up:</p>
            <ul>
              <li><span className="fa fa-check-circle mr-2"></span>Brakes & Levers Adjustments</li>
              <li><span className="fa fa-check-circle mr-2"></span>Handle Bar Safety Check</li>
              <li><span className="fa fa-check-circle mr-2"></span>Headset Check and Minor Adjustments</li>
              <li><span className="fa fa-check-circle mr-2"></span>Bottom Bracket Check & Minor Adjustments</li>
              <li><span className="fa fa-check-circle mr-2"></span>Cranks & Pedals Safety Check & Adjustments</li>
              <li><span className="fa fa-check-circle mr-2"></span>Derailleur Adjustments</li>
              <li><span className="fa fa-check-circle mr-2"></span>Minor Wheel Truing, Hub Check and Minor Adjustments</li>
              <li><span className="fa fa-check-circle mr-2"></span>Chain Check, Clean & Lubrication</li>
              <li><span className="fa fa-check-circle mr-2"></span>Tire Pressure Check</li>
              <li><span className="fa fa-check-circle mr-2"></span>Saddle Tight and Straight Check</li>
              <li><span className="fa fa-check-circle mr-2"></span>Full Bike Wash, Detail and Degrease</li>
              <li><span className="fa fa-check-circle mr-2"></span>Test Ride</li>
            </ul>

          </div>
          <div className="tune-up-image">
            <img src='https://i0.wp.com/sportsrent.ca/wp-content/uploads/2016/01/DSC1443.jpg?resize=1110%2C474&ssl=1' alt="Bike" />
          </div>
        </div>
      </section>

      <section className="service-rates-section">
        <div className="service-rates-content">
          <h3>Bike Service Rates</h3>
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Rates</th>
              </tr>
            </thead>
            <tbody>
              {/* Add your table rows here */}
              <tr>
                <td>Change Tire & Tube (Per Wheel)</td>
                <td className="winter-price">$15</td>
              </tr>
              <tr>
                <td>Adjust Gears</td>
                <td className="winter-price">$30</td>
              </tr>
              <tr>
                <td>Adjust Brakes</td>
                <td className="winter-price">$30</td>
              </tr>
              <tr>
                <td>Wheel Truing (By estimate)</td>
                <td className="winter-price">$30+</td>
              </tr>
              <tr>
                <td>Adjust Bottom Bracket</td>
                <td className="winter-price">$20</td>
              </tr>
              <tr>
                <td>Adjust Wheel Hubs</td>
                <td className="winter-price">$20</td>
              </tr>
              <tr>
                <td>Adjust Headset</td>
                <td className="winter-price">$20</td>
              </tr>
              <tr>
                <td>Cable Installation</td>
                <td className="winter-price">$20</td>
              </tr>
              <tr>
                <td>Spoke Installation – Front</td>
                <td className="winter-price">$35<span> + Spokes ($5 each)</span></td>
              </tr>
              <tr>
                <td>Spoke Installation – Rear</td>
                <td className="winter-price">$50 <span>+ Spokes ($5 each)</span></td>
              </tr>
              <tr>
                <td>Install Grips</td>
                <td className="winter-price">$10</td>
              </tr>
              <tr>
                <td>Wrap Road grip tape</td>
                <td className="winter-price">$20</td>
              </tr>
              <tr>
                <td>Brake Bleed (per brake) With TUNE UP</td>
                <td className="winter-price">$30</td>
              </tr>
              <tr>
                <td>Brake Bleed (per brake) Without TUNE UP</td>
                <td className="winter-price">$40</td>
              </tr>
              <tr>
                <td>Install Chain</td>
                <td className="winter-price">$20</td>
              </tr>
              <tr>
                <td>BB Repack</td>
                <td className="winter-price">$35</td>
              </tr>
              <tr>
                <td>HS Repack</td>
                <td className="winter-price">$30</td>
              </tr>
              <tr>
                <td>Front Hub Repack</td>
                <td className="winter-price">$30</td>
              </tr>
              <tr>
                <td>Rear Hub Repack</td>
                <td className="winter-price">$30</td>
              </tr>
              {/* Add more rows for other services here */}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  )
}
// export default SummerService;