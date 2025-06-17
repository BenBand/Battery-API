// Selecting class fields
const batteryLevel = document.querySelector(".batteryLevel");
const batteryCharging = document.querySelector(".batteryCharging");
const batteryChargingTime = document.querySelector(".batteryChargingTime");
const batteryDisChargingTime = document.querySelector(
  ".batteryDisChargingTime"
);

// Battery API logic
const battery = () => {
  // Checking if the getBattery is available inside the navigator
  if('getBattery' in navigator) {
    // Handling the promise using the .then()
    navigator.getBattery().then((battery) => {
      // creating a function to update all battery info (GLOBAL FUNCTION)
      function updateAllBatteryInfo(){
        isChargingInfo();
        updateLevelChange();
        updateDischargingTimeInfo();
        updateChargingTimeChangeInfo();
        updateBatteryStatusInfo();
      }
      updateAllBatteryInfo()



      // Handling battery event listeners
      //1. Battery charging change
      battery.addEventListener('chargingchange', ()=> {
        isChargingInfo();
        
      });
      // A function to keep track of the charging status
      function isChargingInfo() {
        const isCharging = battery.charging ? "Yes" : "No";
        batteryCharging.innerHTML = isCharging; 
      }


      //2. Battery charging change
      battery.addEventListener('chargingtimechange', ()=> {
        updateChargingTimeChangeInfo();
        
      });
      // Update charging change info
      function updateChargingTimeChangeInfo() {
        batteryChargingTime.innerHTML = battery.chargingTime + " Seconds";
        
      }


      //3. Battery discharging time
      battery.addEventListener('dischargingtimechange', ()=> {
        updateDischargingTimeInfo();
      });
      // Update discharging time info
      function updateDischargingTimeInfo() {
        batteryDisChargingTime.innerHTML = battery.dischargingTime + " Seconds";
      }


      //4. Battery status
      battery.addEventListener('', ()=> {
        updateBatteryStatusInfo();
        
      })
      // Update battery status info
      function updateBatteryStatusInfo() {
        if(battery.level >= 80){
          console.log('Charged');
          
        } else if(battery.level >= 50) {
          console.log('Low');
        } else {
          console.log('Worse');
          
        }
        
      }


      // 5. Battery level change
      battery.addEventListener('levelchange', ()=> {
        updateLevelChange();
      });
      // function to handle level change
      function updateLevelChange (){
        // multiplying to get the converted battery percentage
        const batteryChangeLevel = battery.level * 100 + '%';
        batteryLevel.innerHTML = batteryChangeLevel;
      }
      
    })
  }
}
battery();