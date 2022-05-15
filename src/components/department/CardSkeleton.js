import Skeleton from "react-loading-skeleton";

const CardSkeleton = () => {
  return (
    <div className="col-12">
      <div className="card border border-primary">
        <div className="card-body text-primary row">
          <div className="col-12 col-md-6 col-lg-8">
            <h4 className="card-title text-primary">
              <Skeleton />
            </h4>
          </div>
          <div className="col-12 col-md-6 col-lg-4 align-self-center text-center">
            <Skeleton />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardSkeleton;
