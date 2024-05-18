import React, { useState, useRef, useEffect } from 'react';
import { SketchPicker } from 'react-color';

const ColorPicker = ({ selectedColor, onColorChange }) => {
  const [colors, setColors] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);
  const buttonRef = useRef(null);

  /* The `useEffect` hook in the provided code snippet is responsible for handling the logic related to
  showing and hiding the color picker component based on user interactions. Here's a breakdown of
  what it does: */

useEffect(() => {
    function handleClickOutside(event) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowPicker(false);
      }
    }

    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPicker]);

/**
 * The function `handleColorPick` takes a color as input and calls the `onColorChange` function with
 * the hexadecimal value of the color.
 */
  const handleColorPick = (color) => {
    onColorChange(color.hex);
  };

/**
 * The function `handlePickerAccept` updates the color state and adds the new color to the list if it
 * is not already included.
 */
  const handlePickerAccept = (color) => {
    const newColor = color.hex;
    onColorChange(newColor);
    if (!colors.includes(newColor)) {
      setColors([newColor, ...colors.slice(0, 4)]);
    }
  };

/**
 * The function `calculatePickerPosition` determines the position of a picker element relative to a
 * button based on available space in the viewport.
 * @returns The `calculatePickerPosition` function returns either 'calc(100% + 10px)' or
 * `-${pickerHeight + 50}px` based on the conditions specified in the function.
 */
  const calculatePickerPosition = () => {
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const pickerHeight = 248;
    const spaceAboveButton = buttonRect.top;
    const spaceBelowButton = window.innerHeight - buttonRect.bottom;

    if (spaceBelowButton >= pickerHeight || spaceBelowButton >= spaceAboveButton) {
      return 'calc(100% + 10px)';
    } else {
      return `-${pickerHeight + 50}px`;
    }
  };

  return (
    <div className="relative" ref={pickerRef}>
      <p className='text-xs text-gray-400 mb-2'>Choose your color</p>
      <div className="flex items-center">
        {colors.map((color, index) => (
          <div
            key={index}
            className="w-8 h-8 rounded-full mr-2 cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => onColorChange(color)}
          />
        ))}
        <button
          ref={buttonRef}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer"
          onClick={() => setShowPicker(!showPicker)}
        >
          +
        </button>
      </div>
      {showPicker && (
        <div className="absolute mt-2" style={{ top: calculatePickerPosition() }}>
          <SketchPicker
            color={selectedColor}
            onChange={handleColorPick}
            onChangeComplete={handlePickerAccept}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;