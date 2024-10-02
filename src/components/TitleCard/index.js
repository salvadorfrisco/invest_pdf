import Subtitle from "../Typography/Subtitle";

export default function TitleCard({
  className,
  title,
  children,
  topMargin,
  TopSideButtons,
}) {
  return (
    <div
      className={
        `card w-full px-6 bg-base-100 ${className} ` + (topMargin || "mt-6")
      }
    >
      {/* Title for Card */}
      <Subtitle styleClass={TopSideButtons ? "inline-block" : ""}>
        {title}

        {/* Top side button, show only if present */}
        {/* {TopSideButtons && (
          <div className="inline-block float-right">{TopSideButtons}</div>
        )} */}
      </Subtitle>

      <div className="divider mt-2"></div>

      {/** Card Body */}
      <div className="h-full w-full" style={{ marginTop: "24px" }}>
        {children}
      </div>
    </div>
  );
}
