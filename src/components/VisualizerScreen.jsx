import React, { useEffect, useRef } from 'react';
import Header from './Header';
import './VisualizerScreen.css';

const getHSLColor = (x, y, width, height, audioLevel) => {
  // Base hue on x position (0-360)
  const hue = (x / width) * 360;
  // Saturation based on y position (50-100%)
  const saturation = 50 + (y / height) * 50;
  // Lightness based on audio level (30-70%)
  const lightness = 30 + (audioLevel * 40);
  return `hsla(${hue}, ${saturation}%, ${lightness}%, ${0.3 + audioLevel * 0.7})`;
};

const VisualizerScreen = ({ playing, audioPlayer }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Initialize particles
    const createParticles = () => {
      particlesRef.current = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        baseSpeed: Math.random() * 1 + 0.5,
        angle: Math.random() * Math.PI * 2,
        hueOffset: Math.random() * 360
      }));
    };

    // Initialize audio context and analyzer
    if (audioPlayer && !audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        
        // Set analyzer properties before creating the data array
        analyserRef.current.fftSize = 256;
        dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);

        // Only create new audio source if not already connected
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
      ctx.fillStyle = 'rgba(13, 13, 13, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let audioLevel = 0;
      if (analyserRef.current && playing) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        // Get average audio level
        audioLevel = dataArrayRef.current.reduce((acc, val) => acc + val, 0) / 
                    dataArrayRef.current.length / 255;
      }

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Move particle
        const speed = particle.baseSpeed * (1 + (audioLevel * 3));
        particle.x += Math.cos(particle.angle) * speed;
        particle.y += Math.sin(particle.angle) * speed;

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.angle = Math.PI - particle.angle;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.angle = -particle.angle;
        }

        // Draw particle
        const size = particle.size * (1 + (audioLevel * 2));
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        
        // Use dynamic color based on position and audio level
        ctx.fillStyle = playing 
          ? getHSLColor(
              particle.x, 
              particle.y, 
              canvas.width, 
              canvas.height, 
              audioLevel
            )
          : 'rgba(102, 102, 102, 0.3)';
        
        ctx.fill();

        // Optional: Add glow effect
        if (playing && audioLevel > 0.5) {
          ctx.shadowBlur = 10 * audioLevel;
          ctx.shadowColor = ctx.fillStyle;
        } else {
          ctx.shadowBlur = 0;
        }
      });

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
  }, [playing, audioPlayer]);

  return (
    <div className="visualizer-screen">
      <Header playing={playing} />
      <div className="screen-content">
        <canvas ref={canvasRef} className="visualizer-canvas" />
        <div className="visualizer-info">
          {playing ? 'Visualizing...' : 'Waiting for audio...'}
        </div>
      </div>
    </div>
  );
};

export default VisualizerScreen; 