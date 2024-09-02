import "./__dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard__containerKPIs">
        <div className="dashboard__containerKPIs__pack">
          <div className="dashboard__containerKPIs__pack__img">
            <img src="" />
          </div>
          <div className="dashboard__containerKPIs__pack__text">
            <p>Nº of reservations received</p>
            <p>New Booking</p>
          </div>
        </div>
        
        <div className="dashboard__containerKPIs__pack">
          <div className="dashboard__containerKPIs__pack__img">
            <img src="" />
          </div>
          <div className="dashboard__containerKPIs__pack__text">
            <p>Percentage of rooms occupied out of the total.</p>
            <p>Scheduled Room</p>
          </div>
        </div>

        <div className="dashboard__containerKPIs__pack">
          <div className="dashboard__containerKPIs__pack__img">
            <img src="" />
          </div>
          <div className="dashboard__containerKPIs__pack__text">
            <p>Nº of check-ins</p>
            <p>Check in</p>
          </div>
        </div>
        
        <div className="dashboard__containerKPIs__pack">
          <div className="dashboard__containerKPIs__pack__img">
            <img src="" />
          </div>
          <div className="dashboard__containerKPIs__pack__text">
            <p>Nº of check-outs</p>
            <p>Check out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
