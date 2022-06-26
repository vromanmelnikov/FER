import { memo, useEffect } from "react";

const RangeSlider = ({ 
    classes, 
    label, 
    onChange, 
    onMouseUp, 
    value, 
    ...sliderProps 
  }) => {
      useEffect(() => {
        // if you dont set your inital state in your parent component 
        // this effect will only run once when component did mount and 
        // passes the initial value back to the parent component.
        onChange(value); 
      }, []);
      
      return (
        <div className="range-slider">
          <p>{label}</p>
          <h3>value: { value }</h3>
          <input
            {...sliderProps}
            type="range"
            value={value}
            className={`slider ${classes}`}
            id="myRange"
            onChange={onChange}
            onMouseUp={onMouseUp} // only if such effect is desired
          />
        </div>
      );
  };
  export default memo(RangeSlider);