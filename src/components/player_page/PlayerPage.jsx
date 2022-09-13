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
            <div className="player-page-container">
              <div>
                <h1>{player.fullName}</h1>
              </div>
              <div className="player-page-container-row">
                <div className="player-page-container-col">
                  <div>
                    <h5>Idade:{player.age}</h5>
                  </div>
                  <div>
                    <h5>Nascimento:{player.birth}</h5>
                  </div>
                  <div>
                    <h5>Cidade:{player.city}</h5>
                  </div>
                  <div>
                    <h5>Altura:{player.height}</h5>
                  </div>
                  <div>
                    <h5>Perna:{player.leg}</h5>
                  </div>
                </div>
                <div className="poster">
                  <img src={player.poster} />
                </div>
                <div className="player-page-container-col">
                  <div><h5>Ex-Clubes:{player.formerTeams?.join(',')}</h5></div>
                  <div><h5>Chegou no clube em: {player.arrival}</h5></div>
                  <div><h5>Contrato até: {player.contract}</h5></div>
                </div>
              </div>
              <div>
                <h2>Valor:€{player.valueEuros}</h2>
              </div>
            </div>
          );
        })}
      </>
    </section>
  );
}
export { PlayerPage };
