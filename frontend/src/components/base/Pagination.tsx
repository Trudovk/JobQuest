type Props = {
  currentPage: number;
  totalPages: number;
  onSwitch: (page: number) => void;
};

export const Pagination: React.FC<Props> = (props) => {
  return (
    <div className="btn-group">
      {props.currentPage > 2 && (
        <>
          <button className="btn" onClick={() => props.onSwitch(1)}>
            1
          </button>
          <button className="btn btn-disabled">...</button>
        </>
      )}
      {props.currentPage !== 1 && (
        <button
          className="btn"
          onClick={() => props.onSwitch(props.currentPage - 1)}
        >
          {props.currentPage - 1}
        </button>
      )}
      <button className="btn btn-active underline">{props.currentPage}</button>
      {props.currentPage <= props.totalPages - 1 && (
        <button
          className="btn"
          onClick={() => props.onSwitch(props.currentPage + 1)}
        >
          {props.currentPage + 1}
        </button>
      )}
      {props.currentPage < props.totalPages - 1 && (
        <>
          <button className="btn btn-disabled">...</button>
          <button
            className="btn"
            onClick={() => props.onSwitch(props.totalPages)}
          >
            {props.totalPages}
          </button>
        </>
      )}
    </div>
  );
};
