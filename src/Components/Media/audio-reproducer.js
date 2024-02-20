import React from "react";
import Aux from '../../Hoc/Aux2/Aux_';

const AudioReproducer = ( props ) => {

return (<Aux>
      <div style={{ height: "38px", display:"flex", marginTop:"10px", marginBottom:"10px" }}>
        {" "}
        <audio src={props.mediaBlobUrl} controls loop />
      </div>
</Aux>)

}
export default AudioReproducer;
