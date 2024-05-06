const firebaseConfig = {
    apiKey: "AIzaSyDHfFzweiqjwr5qwFthqobSFKJen4g4ar0",
    authDomain: "cead-e8191.firebaseapp.com",
    databaseURL: "https://cead-e8191-default-rtdb.firebaseio.com",
    projectId: "cead-e8191",
    storageBucket: "cead-e8191.appspot.com",
    messagingSenderId: "990569601735",
    appId: "1:990569601735:web:e623b14de49ac319737ce2",
    measurementId: "G-LP81N4E274"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();


function renderSensorData(sensorId, sensorData) {
    const dashboard = document.getElementById('dashboard');
    const card = document.createElement('div');
    const phdiv = document.getElementById("ph-level");
    const phbar = document.getElementById("ph-bar");
    const tempdiv = document.getElementById("temperature-level");
    const tempbar = document.getElementById("temp-bar");
    const waterdiv = document.getElementById("water-detected");

    phdiv.innerHTML = `${sensorData.ph} ph`;
    const phPercentage = (sensorData.ph / 14) * 100;
    phbar.style.width = `${phPercentage}%`;

    tempdiv.innerHTML = `${sensorData.temperature}°C`;
    tempbar.style.width = `${sensorData.temperature}%`;

    waterdiv.innerHTML = sensorData.water_level === "high" ? 'Yes' : 'No';

    // card.classList.add('col-xl-4', 'col-md-6', 'mb-4', 'card');
    // card.innerHTML = `
    //     <h2>Sensor ID: ${sensorId}</h2>
    //     <p>pH: ${sensorData.ph}</p>
    //     <p>Temperature: ${sensorData.temperature}°C</p>
    //     <p>Water Detected: ${sensorData.water_detected ? 'Yes' : 'No'}</p>
    // `;
    // dashboard.appendChild(card);
}

function listenForSensorData() {
    database.ref('sensor_data').on('value', (snapshot) => {
        const sensorData = snapshot.val();
        document.getElementById('dashboard').innerHTML = '';
        const latestSensorId = Object.keys(sensorData)[Object.keys(sensorData).length - 1];
        renderSensorData(latestSensorId, sensorData[latestSensorId]);
        var temperatureData = [];
        var phData = [];
        for (const sensorId in sensorData) {
            temperatureData.push(sensorData[sensorId].temperature);
            phData.push(sensorData[sensorId].ph);
        }
        drawPHData(phData.slice(0, 50)); // Change here if lesser values is needed
        drawPHPie(phData.slice(0, 50)); // Change here if lesser values is needed
        drawTemperatureData(temperatureData.slice(0, 50)); // Change here if lesser values is needed
        drawTempPie(temperatureData.slice(0, 50)); // Change here if lesser values is needed

    });
}

listenForSensorData();

function drawTemperatureData(temperatureData) {
    var temperatureCtx = document.getElementById("myTempChart");
    var temperatureChart = new Chart(temperatureCtx, {
        type: 'line',
        data: {
            labels: temperatureData.map((value, index) => index + 1), // Use index as labels
            datasets: [{
                label: "Temperature (°C)",
                lineTension: 0.2,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "#e74a3b",
                pointRadius: 3,
                pointBackgroundColor: "#000",
                pointBorderColor: "#000",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: temperatureData,
            }],
        },
        options: {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10,
                    right: 25,
                    top: 25,
                    bottom: 0
                }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        maxTicksLimit: 10 // Adjust as needed
                    }
                }],
                yAxes: [{
                    ticks: {
                        maxTicksLimit: 5,
                        padding: 10,
                    },
                    gridLines: {
                        color: "rgb(234, 236, 244)",
                        zeroLineColor: "rgb(234, 236, 244)",
                        drawBorder: false,
                        borderDash: [2],
                        zeroLineBorderDash: [2]
                    }
                }],
            },
            legend: {
                display: false
            },
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                titleMarginBottom: 10,
                titleFontColor: '#6e707e',
                titleFontSize: 14,
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                intersect: false,
                mode: 'index',
                caretPadding: 10,
                callbacks: {
                    label: function (tooltipItem, chart) {
                        var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                        return datasetLabel + ': ' + tooltipItem.yLabel + '°C';
                    }
                }
            }
        }
    });
}

function drawPHData(phData) {
    var temperatureCtx = document.getElementById("mypHChart");
    var temperatureChart = new Chart(temperatureCtx, {
        type: 'line',
        data: {
            labels: phData.map((value, index) => index + 1),
            datasets: [{
                label: "pH",
                lineTension: 0.2,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "#f6c23e",
                pointRadius: 3,
                pointBackgroundColor: "#5a5c69",
                pointBorderColor: "#5a5c69",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: phData,
            }],
        },
        options: {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10,
                    right: 25,
                    top: 25,
                    bottom: 0
                }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        maxTicksLimit: 10 // Adjust as needed
                    }
                }],
                yAxes: [{
                    ticks: {
                        maxTicksLimit: 5,
                        padding: 10,
                    },
                    gridLines: {
                        color: "rgb(234, 236, 244)",
                        zeroLineColor: "rgb(234, 236, 244)",
                        drawBorder: false,
                        borderDash: [2],
                        zeroLineBorderDash: [2]
                    }
                }],
            },
            legend: {
                display: false
            },
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                titleMarginBottom: 10,
                titleFontColor: '#6e707e',
                titleFontSize: 14,
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                intersect: false,
                mode: 'index',
                caretPadding: 10,
                callbacks: {
                    label: function (tooltipItem, chart) {
                        var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                        return datasetLabel + ': ' + tooltipItem.yLabel + ' pH';
                    }
                }
            }
        }
    });
}


function drawPHPie(phData) {
    // Set new default font family and font color to mimic Bootstrap's default styling
    Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#858796';

    const phRange = phData.reduce((acc, phValue) => {
        if (phValue < 7) {
            acc[0]++;
        } else if (phValue === 7) {
            acc[1]++;
        } else {
            acc[2]++;
        }
        return acc;
    }, [0, 0, 0]);

    // Pie Chart Example
    var ctx = document.getElementById("phPieChart");
    var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Acidic", "Neutral", "Alkaline"],
            datasets: [{
                data: phRange,
                backgroundColor: ['#36b9cc', '#1cc88a', '#4e73df'],
                hoverBackgroundColor: ['#2c9faf', '#17a673', '#2e59d9'],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
            },
            legend: {
                display: false
            },
            cutoutPercentage: 80,
        },
    });

}

function drawTempPie(phData) {
    // Set new default font family and font color to mimic Bootstrap's default styling
    Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#858796';

    const phRange = phData.reduce((acc, phValue) => {
        if (phValue >= 0 && phValue < 38) {
            acc[0]++;
        } else if (phValue >= 38 && phValue <= 75) {
            acc[1]++;
        } else {
            acc[2]++;
        }
        return acc;
    }, [0, 0, 0]);

    // Pie Chart Example
    var ctx = document.getElementById("tempPieChart");
    var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["0 - 37", "38 - 75", "75 - 100"],
            datasets: [{
                data: phRange,
                backgroundColor: ['#4e73df', '#f6c23e', '#e74a3b'],
                hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
            },
            legend: {
                display: false
            },
            cutoutPercentage: 80,
        },
    });

}