function Test() {
    return (
        <>
            <svg width="400" height="400" className="border-2" viewBox="-550 -550 1600 1600">
                <circle cx="200" cy="200" r="100" fill="url(#radialGradient)" stroke="red" strokeWidth="5px"/>

                <defs>
                    <radialGradient id="radialGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fff"/>
                        <stop offset="100%" stopColor="#000"></stop>
                    </radialGradient>
                </defs>

                <rect width="200" height="200" x="400" y="200" fill="#004346"
                      className="transform transition-transform duration-300 hover:rotate-90"/>
            </svg>

            <svg width="600" height="600" className="border-2" viewBox="0 0 200 200">

                <path d="M 50, 100 L 150, 100"/>

            </svg>
        </>
    );
}

export default Test;