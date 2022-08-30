const commutesPerYear = 260 * 2;
const litresPerKM = 10 / 100; //litres/100->perkm
const gasLitreCost = 1.5;
const litreCostKM = litresPerKM * gasLitreCost; //how much for 1km?
const secondsPerDay = 60 * 60 * 24; //seconds per day


const Distance = ({leg}) => {
    if(!leg.distance || !leg.duration) return null;
    
    const days = Math.floor(
        (commutesPerYear  * leg.duration.value) / secondsPerDay
    );

    const cost = Math.floor(
        (leg.distance.value / 1000) * litreCostKM * commutesPerYear
    )

    return <div><p>
        This home is <span className="highlight">{leg.distance.text}</span>  away from your office. 
        That would take {" "} <span className="highlight">{leg.distance.text}</span> each direction.</p></div>
}

export default Distance