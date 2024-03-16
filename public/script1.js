const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: 'DOB' },
  { minDegree: 31, maxDegree: 90, value: '10%' },
  { minDegree: 91, maxDegree: 150, value: '30%' },
  { minDegree: 151, maxDegree: 210, value: '25' },
  { minDegree: 211, maxDegree: 270, value: '20' },
  { minDegree: 271, maxDegree: 330, value: '15' },
  { minDegree: 331, maxDegree: 360, value: 'DOB' },
];
//Size of each piece
const data = [16, 16, 16, 16, 16, 16];
//background color for each piece
var pieColors = [
  "#8EE4AF",
  "#5CDB95",
  "#8EE4AF",
  "#5CDB95",
  "#8EE4AF",
  "#5CDB95",
];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: ['10%', 'DOB', '15%', '20%', '25%', '30%'],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
//display value based on the randomAngle
// const valueGenerator = (angleValue) => {
//   for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    // if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
    //   const discountAmount = i.value;
    //   const popup = document.createElement("div");
    //   popup.classList.add("popup");
    //   popup.innerHTML = `<p>Congratulations Your Discount Amount is : ${discountAmount}</p>`;
    //   document.body.appendChild(popup);
    //   setTimeout(() => {
    //     popup.remove();
    //   }, 3000); 
      // Adjust duration of popup display as needed
//       spinBtn.disabled = false;
//       break;
//     }
//   }
// };

//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      const discountAmount = i.value;
      const popup = document.createElement("div");
      popup.classList.add("popup");
      popup.innerHTML = `
        <div class="popup-content">
          <p>Congratulations Your Discount Amount is : ${discountAmount}</p>
          <p>Note: PlZ ensure to capture a SS and send it to our RM.</p>
          <button class="popup-button">OK</button>  
        </div>`;
      document.body.appendChild(popup);
      // Add event listener to remove popup when OK button is clicked
      popup.querySelector('.popup-button').addEventListener('click', () => {
        popup.remove();
        spinBtn.disabled = false;
        window.location.replace('https://wa.link/y7ovdb');
        
      });
      break;
    }
  }
};


//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});