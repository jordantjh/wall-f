import React from "react";
import "./score-display-renderer.css";

// constant CSS class names
const COUNT_WITH_ANIM = "sweets-count updown-anim";

interface IScoreDisplayRendererProps {
  lollipopCount: number;
  candyCount: number;
  dangoCount: number;
}

export const ScoreDisplayRenderer: React.FunctionComponent<IScoreDisplayRendererProps> = React.memo(({
  lollipopCount, candyCount, dangoCount
}) => {
  const [lollipopClassName, setLollipopClassName] = React.useState("COUNT_WITH_ANIM");
  const [candyClassName, setCandyClassName] = React.useState("COUNT_WITH_ANIM");
  const [dangoClassName, setDangoClassName] = React.useState("COUNT_WITH_ANIM");

  // counter refs
  const prevLollipopCountRef = React.useRef<number>();
  const prevCandyCountRef = React.useRef<number>();
  const prevDangoCountRef = React.useRef<number>();

  const lollipopUpdated = prevLollipopCountRef.current !== lollipopCount;
  const candyUpdated = prevCandyCountRef.current !== candyCount;
  const dangoUpdated = prevDangoCountRef.current !== dangoCount;

  React.useEffect(() => {
    prevLollipopCountRef.current = lollipopCount;
    prevCandyCountRef.current = candyCount;
    prevDangoCountRef.current = dangoCount;
  });

  // update refs and force css rerenders
  if (lollipopUpdated) {
    prevLollipopCountRef.current = lollipopCount;
    setLollipopClassName(COUNT_WITH_ANIM);
  } else if (candyUpdated) {
    prevCandyCountRef.current = candyCount;
    setCandyClassName(COUNT_WITH_ANIM);
  } else if (dangoUpdated) {
    prevDangoCountRef.current = dangoCount;
    setDangoClassName(COUNT_WITH_ANIM);
  }

  return (
    <div className="score-display-container">
      <div className="sweets-and-count">
        🍭 <div key={`l${lollipopCount}`} className={lollipopClassName}>{lollipopCount}</div>
      </div>
      <div className="sweets-and-count">
        🍬 <div key={`c${candyCount}`} className={candyClassName}>{candyCount}</div>
      </div>
      <div className="sweets-and-count">
        🍡 <div key={`d${dangoCount}`} className={dangoClassName}>{dangoCount}</div>
      </div>
    </div>
  )
});