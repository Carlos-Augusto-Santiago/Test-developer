import { useRef, useEffect } from "react";
import "./sass/Tabla.scss";

export default function Table() {
    const element = useRef(null);
    const contenido = document.getElementById("content");

    useEffect(() => {
        const contenido = element.current;
    }, []);

    fetch("https://api.datos.gob.mx/v1/condiciones-atmosfericas")
        .then((response) => {
            return response.json();
        })
        .then((consulta) => {
            const fila = document.createElement("tr");
            for (let i = 0; i < 10; i++) {
                const fila = document.createElement("tr");
                const id = document.createElement("td");
                id.innerHTML = consulta.results[i]._id;
                fila.appendChild(id);

                const city_id = document.createElement("td");
                city_id.innerHTML = consulta.results[i].cityid;
                fila.appendChild(city_id);

                const name_ = document.createElement("td");
                name_.innerHTML = consulta.results[i].name;
                fila.appendChild(name_);

                const precip = document.createElement("td");
                precip.innerHTML = consulta.results[i].probabilityofprecip;
                const value_precip = consulta.results[i].probabilityofprecip;
                fila.appendChild(precip);

                const humidity = document.createElement("td");
                humidity.innerHTML = consulta.results[i].relativehumidity;
                const value_humidity = consulta.results[i].relativehumidity;
                fila.appendChild(humidity);

                const report = document.createElement("td");
                report.innerHTML = consulta.results[i].lastreporttime;
                fila.appendChild(report);

                const rain = document.createElement("td");
                if (value_precip > 60 && value_humidity > 50) {
                    rain.innerHTML = "LLUEVE";
                } else {
                    rain.innerHTML = "NO LLUEVE";
                }
                fila.appendChild(rain);
                contenido?.appendChild(fila);
            }
        });

    return (
        <div className="table-content">
            <table>
                <tbody ref={element} id="content">                    
                    <tr>
                        <th>_id</th>
                        <th>cityid</th>
                        <th>name</th>
                        <th>probabilityofprecip</th>
                        <th>relativehumidity</th>
                        <th>Lastreporttimeformato(YYYY/MM/DD)</th>
                        <th>
                            LLUEVESI se cumple=probabilityofprecip {">"}60
                            ||relativehumidity {">"} 50
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
