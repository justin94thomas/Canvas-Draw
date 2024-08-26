import React, { useRef, useState, useEffect } from 'react';
import { FaFileExport } from 'react-icons/fa';
import '../App.css';

interface CanvasProps {
    imageURL: string
}
interface Point {
    x: number;
    y: number;
}

const Canvas: React.FC<CanvasProps> = ({ imageURL }) => {
    const drawRef = useRef<HTMLCanvasElement>(null);
    const exportCanvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastPoint, setLastPoint] = useState<Point | null>(null);


    useEffect(() => {
        if (drawRef.current) {
            const canvas = drawRef.current;
            const context = canvas.getContext("2d");
            if (context) {
                const image = new Image();
                image.src = imageURL;
                image.onload = () => {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(image, 0, 0, canvas.width, canvas.height);
                }
            }
        }
    }, [imageURL])

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        setIsDrawing(true);
        const { offsetX, offsetY } = e.nativeEvent;
        setLastPoint({ x: offsetX, y: offsetY });
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (!isDrawing || !lastPoint) return;
        const { offsetX, offsetY } = e.nativeEvent;
        const canvas = drawRef.current;
        const context = canvas?.getContext('2d');

        if (context) {
            context.strokeStyle = 'red';
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(lastPoint.x, lastPoint.y);
            context.lineTo(offsetX, offsetY);
            context.stroke();
            setLastPoint({ x: offsetX, y: offsetY });
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        setLastPoint(null);
    };


    const exportImage = () => {
        if (!drawRef.current || !exportCanvasRef.current) return;
        const drawingCanvas = drawRef.current;
        const exportCanvas = exportCanvasRef.current;
        const exportContext = exportCanvas.getContext('2d');

        if (exportContext) {
            const img = new Image();
            img.src = imageURL;
            img.onload = () => {
                exportContext.clearRect(0, 0, exportCanvas.width, exportCanvas.height);
                exportContext.drawImage(img, 0, 0, exportCanvas.width, exportCanvas.height);
                exportContext.drawImage(drawingCanvas, 0, 0);
                const link = document.createElement('a');
                link.href = exportCanvas.toDataURL('image/png');
                link.download = 'drawing.png';
                link.click();
            };
        }
    };


    return (
        <div style={{ position: 'relative', margin: "20px", width: '100%', height: '95%', overflow: 'hidden' }}>
            <canvas
                ref={drawRef}
                width={window.innerWidth}
                height={window.innerHeight}
                style={{ position: 'absolute', top: 0, left: 0 }}
                className='canvas-main'
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />

            <button className="export-button" onClick={exportImage} style={{ position: 'absolute', top: 8, right: 8 }}>
                <FaFileExport className="export-icon" />
            </button>
            <canvas
                ref={exportCanvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
                className='canvas-main'
                style={{ display: 'none', width: '100%', height: '95%', overflow: 'hidden' }} />
        </div>
    )
}

export default Canvas;