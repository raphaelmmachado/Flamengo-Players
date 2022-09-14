import CurrencyFormat from "react-currency-format";
import LuggageIcon from '@mui/icons-material/Luggage';
import CottageIcon from '@mui/icons-material/Cottage';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CakeIcon from '@mui/icons-material/Cake';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import HeightIcon from '@mui/icons-material/Height';
import Badge from '@mui/icons-material/Badge';
import DirectionsRun from '@mui/icons-material/DirectionsRun';
import EuroIcon from '@mui/icons-material/Euro';
import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { squad } from "../../data/players";

function PlayerPage() {
  const { number } = useParams();
  const memo = useMemo(
    () => squad.filter((player) => player.number == number),
    [squad]
  );
  const [data, setData] = useState(memo);

  return (
    <section>
      <>
        {data.map((player) => {
          return (
            <div className="player-page-container" key={player.number}>
              <div>
                <h1>{player.fullName}</h1>
              </div>
              <div className="player-page-container-row">
                <div className="player-page-container-col">
                  <div className="d-flex align-middle mb-2">
                    <CakeIcon htmlColor="white"/><h5> <span>Idade:</span>{player.age}</h5>
                  </div>
                  <div className="d-flex align-middle mb-2">
                    <ChildFriendlyIcon htmlColor="white"/><h5> <span>Nascimento:</span> {player.birth}</h5>
                  </div>
                  <div className="d-flex align-middle mb-2">
                    <CottageIcon htmlColor="white"/><h5> <span>Cidade:</span>{player.city}</h5>
                  </div>
                  <div className="d-flex align-middle mb-2">
                    <HeightIcon htmlColor="white"/><h5> <span>Altura:</span>{player.height}m</h5>
                  </div>
                  <div className="d-flex align-middle mb-2">
                  <DirectionsRun htmlColor="white"/>  <h5> <span>Perna:</span>{player.leg}</h5>
                  </div>
                  <div className="d-flex align-middle mb-2" >
                   <Badge htmlColor="white"/> <h5> <span>Ex-Clubes:</span> {player.formerTeams?.join(",")}</h5>
                  </div>
                  <div className="d-flex align-middle mb-2">
                    <LuggageIcon htmlColor="white"/><h5> <span>Chegou em:</span> {player.arrival}</h5>
                  </div>
                  <div className="d-flex align-middle mb-2">
                    <AssignmentIcon htmlColor="white"/><h5> <span>Contrato até:</span> {player.contract}</h5>
                  </div>
                </div>
                <div className="poster">
                  <img src={player.poster} />
                </div>
                <div className="player-page-container-col"></div>
              </div>
              <div >
                <h2>
                  <span id="player-value"> Valor de Mercado:</span>
                  {
                    <CurrencyFormat
                      thousandSeparator="."
                      decimalSeparator=","
                      thousandSpacing="3"
                      prefix="€ "
                      value={player.valueEuros}
                      displayType="text"
                    />
                  }
                </h2>
              </div>
            </div>
          );
        })}
      </>
    </section>
  );
}
export { PlayerPage };
