import React, {useContext } from 'react';
import {useObj} from '../playgroundObjectHooks/useObj'

export function Gelenk(props) {

    
    const obj=useObj(props);
    const radius=obj.size.radius;
    const scaleFactor=obj.size.radius/obj.size.originalRadius;
    
    const angle=-obj.angle; // the visual svg angle is the opposite of the mathematical angle
    const x=obj.x;
    const y=obj.y;  
    const originalStroke=obj.size.originalStrokeWidth;
    return (
      

        <g id="Gelenk"  transform={"scale(1 1) translate("+x+","+y+") scale("+scaleFactor+")" } 
        onMouseDown={(e)=>props.handleDragStart(e,props.name)}>

       
        <circle id="mass" cx="0" cy="0" r={radius} fill="white" stroke="black" strokeWidth={originalStroke/2*scaleFactor} />
        <circle id="center" cx="0" cy="0" r={3} fill="red" strokeWidth={originalStroke/2*scaleFactor}/>
        </g>
    )
  }