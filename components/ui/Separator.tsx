export default function Separator(props: {
  gutter?: number;
  padding?: boolean;
}) {
  return (
    <>
      {props.padding ? (
        <div
          className="separator"
          style={{ padding: `${props.gutter}rem 0` }}
        ></div>
      ) : (
        <div
          className="separator"
          style={{ margin: `${props.gutter}rem 0` }}
        ></div>
      )}
    </>
  );
}
