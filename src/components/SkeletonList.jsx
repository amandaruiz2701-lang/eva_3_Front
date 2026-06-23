function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img skeleton-pulse" />
      <div className="skeleton-body">
        <div className="skeleton-line skeleton-pulse" style={{ width: '60%' }} />
        <div className="skeleton-line skeleton-pulse" style={{ width: '40%' }} />
        <div className="skeleton-line skeleton-pulse" style={{ width: '50%' }} />
        <div className="skeleton-btn skeleton-pulse" />
      </div>
    </div>
  )
}

function SkeletonList() {
  return (
    <div className="row g-4">
      {[1, 2, 3, 4].map((i) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={i}>
          <SkeletonCard />
        </div>
      ))}
    </div>
  )
}

export default SkeletonList