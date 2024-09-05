import { VictoryBar, VictoryChart, VictoryGroup, VictoryStack } from "victory";

const BarChart = () => {
  const getBarData = () => {
    return [1, 2].map(() => {
      return [
        { x: "Monday", y: Math.random() },
        { x: "Tuesday", y: Math.random() },
        { x: "Wednesday", y: Math.random() },
        { x: "Thursday", y: Math.random() },
        { x: "Friday", y: Math.random() },
        { x: "Saturday", y: Math.random() },
        { x: "Sunday", y: Math.random() },
      ];
    });
  };

  return (
    <div className="reservationStats">
      <div className="reservationStats__container">
        <h2>Reservation Stats</h2>
        <div className="reservationStats__container__select">
          <div className="reservationStats__container__select__option">
            <p>Daily</p>
          </div>

          <div className="reservationStats__container__select__option">
            <p>Weekly</p>
          </div>

          <div className="reservationStats__container__select__option">
            <p>Monthly</p>
          </div>
        </div>
      </div>

      <div className="reservationStats__caption">
        <div className="reservationStats__caption__color"></div>
        <p>Check-ins</p>
      </div>

{
   <VictoryChart domainPadding={{ x: 50 }}>
        <VictoryGroup offset={20} style={{ data: { width: 10 } }}>
          <VictoryStack colorScale={"red"}>
            {getBarData().map((data, index) => {
              return (
                <VictoryBar
                  key={index}
                  data={data}
                  style={{ data: { width: 15, cornerRadius: 8 } }}
                />
              );
            })}
          </VictoryStack>
        </VictoryGroup>
      </VictoryChart> 
}
    </div>
  );
};

export default BarChart;