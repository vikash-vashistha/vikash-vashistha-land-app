

export const PlotDetails = ({  plotsDetails }) => {
  return (
    <div style={{ marginLeft: "70%" }}>
      {plotsDetails &&
        plotsDetails.map((e) => {
          return (
            <ol key={e._id}>
              <li>
                <p>facing - {e.face}</p>
                <p>road - {e.road}</p>
                <p>water - {e.water}</p>
                <p>electricity - {e.electricity}</p>
                <p>rate - {e.price} per sq ft</p>
              </li>
            </ol>
          );
        })}
    </div>
  );
};
