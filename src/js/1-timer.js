import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("#datetime-picker"); 
const startBtn = document.querySelector("button");

let userSelectedDate = null;

const options = {   
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);

      if(selectedDates[0].getTime() < Date.now()) { 
        startBtn.classList.add("disable-btn"); 
        startBtn.disabled = true;
        return iziToast.show({
          title: "",
          message: "Please choose a date in the future"
      }); 
      }
      userSelectedDate = selectedDates[0]; 
      startBtn.classList.remove("disable-btn"); 
      startBtn.disabled = false;
    }
}

const handleClick = () => {

    const intervalId = setInterval(convertMs, 1000);



    function convertMs() {

        const ms = userSelectedDate.getTime() - Date.now();

  
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
      
        
        const days = Math.floor(ms / day);
       
        const hours = Math.floor((ms % day) / hour);
        
        const minutes = Math.floor(((ms % day) % hour) / minute);
        
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);

        const updatedTimeValue = (dataAttribute, newValue) => {  

          const timeValue = document.querySelector(`.value[data-${dataAttribute}]`);

          if(timeValue) {
            timeValue.textContent = newValue;
          }
        }

        updatedTimeValue('days', days.toString().padStart(2, '0'));
        updatedTimeValue('hours', hours.toString().padStart(2, '0'));
        updatedTimeValue('minutes', minutes.toString().padStart(2, '0'));
        updatedTimeValue('seconds', seconds.toString().padStart(2, '0'));

        if(ms < 1000) {
          clearInterval(intervalId);

          startBtn.disabled = false;
          startBtn.classList.remove("disable-btn");
          input.disabled = false;
          input.classList.remove("disabled-input");
        }

        return { days, hours, minutes, seconds };
      }

      startBtn.disabled = true;
      startBtn.classList.add("disable-btn");
      input.disabled = true;
      input.classList.add("disabled-input");
}

const fp = flatpickr("#datetime-picker", options); 

startBtn.addEventListener("click", handleClick);