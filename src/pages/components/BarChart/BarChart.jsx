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

// import {AgChartsReact} from 'ag-charts-react';
// import "./__barChart.scss";

// const getData = () => [
//   { year: "2016", visitors: 46636720 },
//   { year: "2017", visitors: 48772922 },
//   { year: "2018", visitors: 50800193 },
//   { year: "2019", visitors: 48023342 },
//   { year: "2020", visitors: 47271912 },
//   { year: "2021", visitors: 47155093 },
//   { year: "2022", visitors: 49441678 },
//   { year: "2023", visitors: 50368190 },
// ];

// const formatNumber = (value) => {
//   value /= 1000000;
//   return `${Math.floor(value)}M`;
// };

// const options = {
//   data: getData(),
//   title: {
//     text: "Total Visitors to Museums and Galleries",
//   },
//   footnote: {
//     text: "Source: Department for Digital, Culture, Media & Sport",
//   },
//   series: [
//     {
//       type: "bar",
//       xKey: "year",
//       yKey: "visitors",
//       label: {
//         formatter: ({ value }) => formatNumber(value),
//       },
//       tooltip: {
//         renderer: ({ datum, xKey, yKey }) => {
//           return { title: datum[xKey], content: formatNumber(datum[yKey]) };
//         },
//       },
//     },
//   ],
//   axes: [
//     {
//       type: "category",
//       position: "bottom",
//       title: {
//         text: "Year",
//       },
//     },
//     {
//       type: "number",
//       position: "left",
//       title: {
//         text: "Total Visitors",
//       },
//       label: {
//         formatter: ({ value }) => formatNumber(value),
//       },
//       crosshair: {
//         label: {
//           renderer: ({ value }) =>
//             `<div style="padding: 0 7px; border-radius: 2px; line-height: 1.7em; background-color: rgb(71,71,71); color: rgb(255, 255, 255);">${formatNumber(value)}</div>`,
//         },
//       },
//     },
//   ],
// };

// const VisitorBarChart = () => {
//   return (
//     <div style={{ height: '500px', width: '100%' }}>
//       <AgChartsReact options={options} />
//     </div>
//   );
// };

// export default VisitorBarChart;