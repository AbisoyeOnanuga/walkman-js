import React, { useEffect, useRef } from 'react';
import './VisualizerSelector.css';

const visualizerOptions = ['particles', 'frequencyBars', 'waveform'];

const VisualizerSelector = ({ onSelectVisualizer }) => {
  const currentIndex = useRef(0);

  useEffect(() => {
    onSelectVisualizer(visualizerOptions[currentIndex.current]);
  }, [onSelectVisualizer]);

  const handleWheel = (event) => {
    if (event.deltaY < 0) {
      currentIndex.current = (currentIndex.current - 1 + visualizerOptions.length) % visualizerOptions.length;
    } else {
      currentIndex.current = (currentIndex.current + 1) % visualizerOptions.length;
    }
    onSelectVisualizer(visualizerOptions[currentIndex.current]);
  };

  return (
    <div className="visualizer-selector" onWheel={handleWheel} tabIndex="0">
      <span>{visualizerOptions[currentIndex.current]}</span>
    </div>
  );
};

export default VisualizerSelector;
