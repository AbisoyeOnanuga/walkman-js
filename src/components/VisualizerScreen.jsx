import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';
import VisualizerSelector from './VisualizerSelector';
import './VisualizerScreen.css';

const getHSLColor = (x, y, width, height, audioLevel) => {
  const hue = (x / width) * 360;
  const saturation = 50 + (y / height) * 50;
  const lightness = 30 + (audioLevel * 40);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const getGreyColor = () => 'rgba(102, 102, 102, 0.3)';

const VisualizerScreen = ({ playing, audioPlayer }) => {
  const [visualizerType, setVisualizerType] = useState('particles');
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const createParticles = () => {
      particlesRef.current = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        baseSpeed: Math.random() * 0.05 + 0.01,
        angle: Math.random() * Math.PI * 2,
        hueOffset: Math.random() * 360
      }));
    };

    if (audioPlayer && !audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
        dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);

        if (!audioPlayer.visualizerConnected) {
          const source = audioContextRef.current.createMediaElementSource(audioPlayer);
          source.connect(analyserRef.current);
          analyserRef.current.connect(audioContextRef.current.destination);
          audioPlayer.visualizerConnected = true;
        }
      } catch (error) {
        console.error('Error setting up audio analysis:', error);
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (analyserRef.current && playing) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      }

      switch (visualizerType) {
        case 'particles':
          animateParticles(ctx, dataArrayRef.current, playing, canvas);
          break;
        case 'frequencyBars':
          animateFrequencyBars(ctx, dataArrayRef.current, canvas, playing);
          break;
        case 'waveform':
          animateWaveform(ctx, dataArrayRef.current, canvas, playing);
          break;
        default:
          animateParticles(ctx, dataArrayRef.current, playing, canvas);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    createParticles();
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [playing, audioPlayer, visualizerType]);

  const animateParticles = (ctx, dataArray, playing, canvas) => {
    ctx.fillStyle = 'rgba(13, 13, 13, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let audioLevel = 0;
    if (dataArray && dataArray.length && playing) {
      audioLevel = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length / 255;
    }

    particlesRef.current.forEach(particle => {
      const speed = playing ? particle.baseSpeed * (1 + (audioLevel * 3)) : particle.baseSpeed;
      particle.x += Math.cos(particle.angle) * speed;
      particle.y += Math.sin(particle.angle) * speed;

      if (particle.x < 0 || particle.x > canvas.width) {
        particle.angle = Math.PI - particle.angle;
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.angle = -particle.angle;
      }

      const size = particle.size * (1 + (audioLevel * 2));
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
      ctx.fillStyle = playing ? getHSLColor(particle.x, particle.y, canvas.width, canvas.height, audioLevel) : getGreyColor();
      ctx.fill();

      ctx.shadowBlur = 20;
      ctx.shadowColor = ctx.fillStyle;
    });
  };

  const animateFrequencyBars = (ctx, dataArray, canvas, playing) => {
    ctx.fillStyle = 'rgba(13, 13, 13, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = canvas.width / 50;
    const barHeightMultiplier = playing ? 3 : 1;

    for (let i = 0; i < 50; i++) {
      const value = (dataArray && dataArray.length && playing) ? dataArray[i % dataArray.length] : 128;
      const randomHeight = Math.random() * (playing ? canvas.height * 0.2 : canvas.height * 0.05);
      const barHeight = playing ? (value / 255) * canvas.height * barHeightMultiplier + randomHeight : canvas.height * 0.05;
      const x = barWidth * i;
      ctx.fillStyle = playing ? `hsl(${(i / 50) * 360}, 100%, 50%)` : getGreyColor();
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

      ctx.shadowBlur = 10;
      ctx.shadowColor = ctx.fillStyle;
    }
  };

  const animateWaveform = (ctx, dataArray, canvas, playing) => {
    ctx.fillStyle = 'rgba(13, 13, 13, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 4;
    const sliceWidth = (Math.PI * 2) / 50;
    const audioLevel = (dataArray && dataArray.length && playing) ? dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length / 255 : 0.2;

    ctx.lineWidth = 2;
    ctx.strokeStyle = playing ? 'rgba(0, 255, 0, 1)' : getGreyColor();
    ctx.beginPath();

    for (let i = 0; i < 50; i++) {
      const value = (dataArray && dataArray.length && playing) ? dataArray[i % dataArray.length] / 255 : 0.5;
      const randomRadius = Math.random() * (playing ? radius * 0.1 : radius * 0.02);
      const angle = i * sliceWidth;
      const x = centerX + (radius + value * radius * audioLevel + randomRadius) * Math.cos(angle);
      const y = centerY + (radius + value * radius * audioLevel + randomRadius) * Math.sin(angle);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.closePath();
    ctx.stroke();
    ctx.shadowBlur = 20;
    ctx.shadowColor = ctx.strokeStyle;
  };

  return (
    <div className="visualizer-screen">
      <Header playing={playing} />
      <div className="screen-content">
        <div className="visualizer-info">
          {playing ? 'Visualizing...' : 'Waiting for audio...'}
        </div>
        <canvas ref={canvasRef} className="visualizer-canvas" />
        <VisualizerSelector onSelectVisualizer={setVisualizerType} />
      </div>
    </div>
  );
};

export default VisualizerScreen;
