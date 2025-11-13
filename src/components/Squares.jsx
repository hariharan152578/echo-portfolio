// import { useRef, useEffect } from 'react';

// const Squares = ({
//   direction = 'right',
//   speed = 1,
//   borderColor = '#999',
//   squareSize = 40,
//   hoverFillColor = '#222'
// }) => {
//   const canvasRef = useRef(null);
//   const requestRef = useRef(null);
//   const numSquaresX = useRef(0);
//   const numSquaresY = useRef(0);
//   const gridOffset = useRef({ x: 0, y: 0 });
//   const hoveredSquareRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');

//     const resizeCanvas = () => {
//       canvas.width = canvas.offsetWidth;
//       canvas.height = canvas.offsetHeight;
//       numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
//       numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
//     };

//     window.addEventListener('resize', resizeCanvas);
//     resizeCanvas();

//     const drawGrid = () => {
//       if (!ctx) return;

//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
//       const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

//       for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
//         for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
//           const squareX = x - (gridOffset.current.x % squareSize);
//           const squareY = y - (gridOffset.current.y % squareSize);

//           if (
//             hoveredSquareRef.current &&
//             Math.floor((x - startX) / squareSize) === hoveredSquareRef.current.x &&
//             Math.floor((y - startY) / squareSize) === hoveredSquareRef.current.y
//           ) {
//             ctx.fillStyle = hoverFillColor;
//             ctx.fillRect(squareX, squareY, squareSize, squareSize);
//           }

//           ctx.strokeStyle = borderColor;
//           ctx.strokeRect(squareX, squareY, squareSize, squareSize);
//         }
//       }

//       const gradient = ctx.createRadialGradient(
//         canvas.width / 2,
//         canvas.height / 2,
//         0,
//         canvas.width / 2,
//         canvas.height / 2,
//         Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
//       );
//     //   gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
//     //   gradient.addColorStop(1, '#fff');

//       ctx.fillStyle = gradient;
//       ctx.fillRect(0, 0, canvas.width, canvas.height);
//     };

//     const updateAnimation = () => {
//       const effectiveSpeed = Math.max(speed, 0.1);
//       switch (direction) {
//         case 'right':
//           gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
//           break;
//         case 'left':
//           gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
//           break;
//         case 'up':
//           gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
//           break;
//         case 'down':
//           gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
//           break;
//         case 'diagonal':
//           gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
//           gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
//           break;
//         default:
//           break;
//       }

//       drawGrid();
//       requestRef.current = requestAnimationFrame(updateAnimation);
//     };

//     const handleMouseMove = event => {
//       const rect = canvas.getBoundingClientRect();
//       const mouseX = event.clientX - rect.left;
//       const mouseY = event.clientY - rect.top;

//       const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
//       const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

//       const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x - startX) / squareSize);
//       const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y - startY) / squareSize);

//       if (
//         !hoveredSquareRef.current ||
//         hoveredSquareRef.current.x !== hoveredSquareX ||
//         hoveredSquareRef.current.y !== hoveredSquareY
//       ) {
//         hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };
//       }
//     };

//     const handleMouseLeave = () => {
//       hoveredSquareRef.current = null;
//     };

//     canvas.addEventListener('mousemove', handleMouseMove);
//     canvas.addEventListener('mouseleave', handleMouseLeave);
//     requestRef.current = requestAnimationFrame(updateAnimation);

//     return () => {
//       window.removeEventListener('resize', resizeCanvas);
//       if (requestRef.current) cancelAnimationFrame(requestRef.current);
//       canvas.removeEventListener('mousemove', handleMouseMove);
//       canvas.removeEventListener('mouseleave', handleMouseLeave);
//     };
//   }, [direction, speed, borderColor, hoverFillColor, squareSize]);

//   return <canvas ref={canvasRef} className="w-full h-full border-none block"></canvas>;
// };

// export default Squares;
import { useRef, useEffect } from 'react';

const Squares = ({
  direction = 'right',
  speed = 1,
  borderColor = '#999',
  squareSize = 40,
  hoverFillColor = '#222'
}) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const numSquaresX = useRef(0);
  const numSquaresY = useRef(0);
  
  // 1. This offset will now accumulate forever, not loop.
  const gridOffset = useRef({ x: 0, y: 0 }); 
  
  const hoveredSquareRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      // Add extra squares to draw off-screen, hiding the "wrap"
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 3;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 3;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // 2. The draw function now takes the offset as an argument
    const drawGrid = (currentOffsetX, currentOffsetY) => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // The 'loopWidth' is 2x squareSize because of the brick pattern
      const loopWidth = squareSize * 2;

      for (let y = 0; y < numSquaresY.current; y++) {
        const isEvenRow = y % 2 === 0;
        const rowDirection = isEvenRow ? 1 : -1;
        const brickOffsetX = isEvenRow ? 0 : squareSize / 2;

        let rowOffsetX = 0;
        let rowOffsetY = 0;

        // 3. Set row-specific offsets based on the continuous base offset
        if (direction === 'right' || direction === 'left' || direction === 'diagonal') {
          rowOffsetX = (currentOffsetX * rowDirection) + brickOffsetX;
        }
        if (direction === 'up' || direction === 'down' || direction === 'diagonal') {
          rowOffsetY = currentOffsetY * rowDirection;
        }

        // 4. Use modulo *here* to find the current visual position
        // We add loopWidth before modulo to handle negative numbers correctly
        const xOffset = ((rowOffsetX % loopWidth) + loopWidth) % loopWidth;
        const yOffset = ((rowOffsetY % loopWidth) + loopWidth) % loopWidth;
        
        for (let x = 0; x < numSquaresX.current; x++) {
          
          // 5. Draw starting from -1 to ensure we cover the edge
          const squareX = Math.floor((x - 1) * squareSize + xOffset);
          const squareY = Math.floor((y - 1) * squareSize + yOffset);

          // Hover check
          if (
            hoveredSquareRef.current &&
            hoveredSquareRef.current.x === x &&
            hoveredSquareRef.current.y === y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }

          // Draw the square
          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      
      // 6. The offset now accumulates infinitely. No modulo here!
      switch (direction) {
        case 'right':
          gridOffset.current.x += effectiveSpeed;
          break;
        case 'left':
          gridOffset.current.x -= effectiveSpeed;
          break;
        case 'up':
          gridOffset.current.y -= effectiveSpeed;
          break;
        case 'down':
          gridOffset.current.y += effectiveSpeed;
          break;
        case 'diagonal':
          gridOffset.current.x += effectiveSpeed; // You can change signs
          gridOffset.current.y += effectiveSpeed; // to change diagonal angle
          break;
        default:
          break;
      }

      // 7. Pass the continuous offset to the draw function
      drawGrid(gridOffset.current.x, gridOffset.current.y);
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = event => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      
      const loopWidth = squareSize * 2;
      const currentOffsetX = gridOffset.current.x;
      const currentOffsetY = gridOffset.current.y;

      // 8. Find the logical row index (y) from the mouse position
      const yRow = Math.floor((mouseY / squareSize) + 1);

      // 9. Re-calculate this specific row's offsets
      const isEvenRow = yRow % 2 === 0;
      const rowDirection = isEvenRow ? 1 : -1;
      const brickOffsetX = isEvenRow ? 0 : squareSize / 2;
      
      let rowOffsetX = 0;
      let rowOffsetY = 0;
      
      if (direction === 'right' || direction === 'left' || direction === 'diagonal') {
        rowOffsetX = (currentOffsetX * rowDirection) + brickOffsetX;
      }
      if (direction === 'up' || direction === 'down' || direction === 'diagonal') {
        rowOffsetY = currentOffsetY * rowDirection;
      }

      const xOffset = ((rowOffsetX % loopWidth) + loopWidth) % loopWidth;
      const yOffset = ((rowOffsetY % loopWidth) + loopWidth) % loopWidth;

      // 10. "Un-translate" the mouse coordinates to find the logical column (x)
      const gridMouseX = mouseX - xOffset + squareSize;
      const gridMouseY = mouseY - yOffset + squareSize;

      const xCol = Math.floor(gridMouseX / squareSize);
      const yCol = Math.floor(gridMouseY / squareSize); // This should match yRow

      if (
        !hoveredSquareRef.current ||
        hoveredSquareRef.current.x !== xCol ||
        hoveredSquareRef.current.y !== yCol
      ) {
        hoveredSquareRef.current = { x: xCol, y: yCol };
      }
    };

    const handleMouseLeave = () => {
      hoveredSquareRef.current = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);

  return <canvas ref={canvasRef} className="w-full h-full border-none block"></canvas>;
};

export default Squares;