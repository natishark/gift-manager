import './RatingSetter.css';
import RightArrowIcon from '../../../resources/icons/arrow.svg';

import { generateColorSequence } from '../../../utils/color/colorRatingSystem';

import { useEffect, useRef, useState } from 'react';
import { useSettingsContext } from '../../../context/SettingsContext/SettingsContext';

// const matchTheme = {
//   bestOptionColor: new RgbColor(0, 250, 42),
//   worstOptionColor: new RgbColor(250, 0, 0)
// }

// const matchTheme = {
//   bestOptionColor: new RgbColor(255, 0, 123),
//   worstOptionColor: new RgbColor(96, 16, 125)
// }



const shiftStep = 0.8 + 1.2;

const animationSettings = {
  duration: 300,
  iterations: 1,
  fill: "forwards",
};

const activeRateSettings = {
  transform: getPropertyString('scale', 1.5, 1.5),
  opacity: 1,
};

const defaultRateSettings = {
  transform: getPropertyString('scale', 1, 1),
  opacity: 0.7,
};

export function RatingSetter({
  activeRate = 0,
  onChoose,
  className,
}) {
  const { ratingTheme, ratingNumber } = useSettingsContext();

  const sliderRef = useRef(null);
  const [currentRate, setCurrentRate] = useState(activeRate);

  const colorSequence = generateColorSequence(ratingTheme, ratingNumber);

  useEffect(() => {
    sliderRef.current.style.transform = getTranslateXPropertyString(- currentRate * shiftStep);
    sliderRef.current.children[currentRate].style.transform = activeRateSettings.transform;
    sliderRef.current.children[currentRate].style.opacity = activeRateSettings.opacity;
  }, []);

  function rateUp() {
    if (currentRate >= ratingNumber - 1) {
      return;
    }

    changeRate(1);
  }

  function rateDown() {
    if (currentRate <= 0) {
      return;
    }

    changeRate(-1);
  }

  function changeRate(direction) {
    sliderRef.current.animate([
      { transform: getTranslateXPropertyString(- currentRate * shiftStep) },
      { transform: getTranslateXPropertyString(- (currentRate + direction) * shiftStep) }
    ], animationSettings);

    sliderRef.current.children[currentRate].animate([
      activeRateSettings,
      defaultRateSettings
    ], animationSettings);

    sliderRef.current.children[currentRate + direction].animate([
      defaultRateSettings,
      activeRateSettings
    ], animationSettings);

    setCurrentRate(currentRate + direction);
  }

  function getOnClickFunction(index) {
    if (index === currentRate) {
      return () => onChoose(index);
    } else if (index === currentRate - 1) {
      return () => rateDown();
    } else if (index === currentRate + 1) {
      return () => rateUp();
    }

    return undefined;
  }

  return (
    <div className={`match-rating-box ${className}`}>
      <div className="match-rating">
        <div ref={sliderRef} className="match-rating-palitra">
          {colorSequence.map((color, i) => (
            <div 
              onClick={getOnClickFunction(i)}
              tabIndex={0}
              className="match-rating-option" 
              style={{backgroundColor: color.toString()}}>
            </div>
          ))}
        </div>
      </div>
      <button className={`slider-btn left ${getDisabledOrEmpty(currentRate === 0)}`} onClick={rateDown}>
        <img className='btn-img' src={RightArrowIcon}></img>
      </button>
      <button className={`slider-btn right ${getDisabledOrEmpty(currentRate === ratingNumber - 1)}`} onClick={rateUp}>
        <img className='btn-img' src={RightArrowIcon}></img>
      </button>
    </div>
  )
}

function getPropertyString(property, ...args) {
  return `${property}(${args.join(",")})`
}

function getTranslateXPropertyString(shift) {
  return getPropertyString('translateX', `${shift}em`)
}

function getDisabledOrEmpty(condition) {
  return condition ? "disabled" : "";
}
