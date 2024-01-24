function StarsList({ className, rate }) {
    const starList = (fullStars, halfStar, emptyStars) => (
        <ul className={`${className} d-flex align-items-center gap-1 me-2`} >
            {
                fullStars.map((_, index) => (
                    <li key={index}><i className="fa-solid fa-star star"></i></li>
                ))
            }
            {halfStar && <li><i className="fa-solid fa-star-half-stroke star"></i></li>}
            {emptyStars.map((_, index) => (
                <li key={index}><i className="fa-regular fa-star star"></i></li>
            ))}
        </ul >
    );

    if (rate > 7.5) {
        return starList([1, 2, 3, 4, 5], null, []);
    } else if (rate > 5 && rate < 7.5) {
        return starList([1, 2, 3], null, [1, 2]);
    } else if (rate > 2.5 && rate < 5) {
        return starList([1, 2], null, [1, 2, 3]);
    } else if (rate > 0 && rate < 2.5) {
        return starList([1], null, [1, 2, 3, 4]);
    } else if (rate === 5) {
        return starList([1, 2, 3], true, [1, 2]);
    } else {
        return null;
    }
}

export default StarsList;