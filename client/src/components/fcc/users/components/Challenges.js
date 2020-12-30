import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Users.css';

function Challenges({ progresses }) {

    const [sort, setSort] = useState(progresses);
    console.log(sort)

    const setOption = (option) => {

    }
    return ( 
        <>
        <div className="prog">
            <div className="progressDate progressDiv title" onClick={() => setOption('date')}>Date:</div>
            <div className="progressDiv progressSuperBlockName title" onClick={() => setSort(progresses.sort(progress => progress.superBlock))}>Super Block:</div>
            <div className="progressDiv progressBlockName title" onClick={() => setSort(progresses.sort(progress => progress.blockName))}>Block:</div>
            <div className="progressDiv progressName title" onClick={() => setSort(progresses.sort(progress => progress.name))}>Challenge:</div>
        </div>
        {sort.map(progress => ( 
            <div className="prog">
                <div className="progressDate progressDiv">
                    {new Date(progress.completedDate).toLocaleString()}
                </div>
                <div className="progressDiv progressSuperBlockName">
                    <Link to={`/challenges/${(progress.superBlock).toLowerCase().replaceAll(" ", "-")}`} >
                        <div className="SuperBlockName">{progress.superBlock}</div>
                    </Link>
                </div>
                <div className="progressDiv progressBlockName">
                    <Link to={`/challenges/${(progress.superBlock).toLowerCase().replaceAll(" ", "-")}/${progress.block}`} >
                        <div className="BlockName">{progress.blockName}</div>
                    </Link>
                </div>
                <div className="progressDiv progressName">
                    <Link to={`/challenges/${(progress.superBlock).toLowerCase().replaceAll(" ", "-")}/${progress.block}/${progress.name}`}>
                        <span className="Name">{progress.name.replaceAll("-", " ").split(" ").map(letter => letter.charAt(0).toUpperCase() + letter.slice(1)).join(" ")}</span>
                    </Link>
                </div>
            </div>
        )
        )}
        </>
    )
}

export default Challenges
