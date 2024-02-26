import React from 'react'

export const OrderOverview = () => {
  return (
    <div className="orderOverviewLg">
    <div class=" card-widget">
    <div class="card-body">
        <h5 class="text-muted chartTitle ">Order Overview </h5>
        <h2 class="mt-4 overViewMoney">5680</h2>
        <span className='orderOverViewTitle'>Total Revenue</span>
        <div class="mt-4">
            <h5>30</h5>
            <h6 className='orderOverViewTitle'>Online Order <span class="pull-right">30%</span></h6>
            <div class="progress mb-3" style={{height: "7px"}}>
                <div class="progress-bar bg-primary" style={{width: "30%"}} role="progressbar"><span class="sr-only">30% Order</span>
                </div>
            </div>
        </div>
        <div class="mt-4">
            <h5>50</h5>
            <h6 class="m-t-10 text-muted orderOverViewTitle">Offline Order <span class="pull-right">50%</span></h6>
            <div class="progress mb-3" style={{height: "7px"}}>
                <div class="progress-bar bg-success" style={{width: "50%"}} role="progressbar"><span class="sr-only">50% Order</span>
                </div>
            </div>
        </div>
        <div class="mt-4">
            <h5>20</h5>
            <h6 class="m-t-10 text-muted orderOverViewTitle">Cash On Develery <span class="pull-right">20%</span></h6>
            <div class="progress mb-3" style={{height: "7px"}}>
                <div class="progress-bar bg-warning" style={{width: "20%"}} role="progressbar"><span class="sr-only">20% Order</span>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
  )
}
export default  OrderOverview;